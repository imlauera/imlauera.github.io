(() => {
  const root = document.querySelector('[data-tts-reader]');
  if (!root) return;
  const content = document.querySelector('.post .content');
  const playBtn = root.querySelector('[data-tts-play]');
  const pauseBtn = root.querySelector('[data-tts-pause]');
  const stopBtn = root.querySelector('[data-tts-stop]');
  const rateInput = root.querySelector('[data-tts-rate]');
  const rateValue = root.querySelector('[data-tts-rate-value]');
  const voiceSelect = root.querySelector('[data-tts-voice]');
  const status = root.querySelector('[data-tts-status]');
  if (!content || !playBtn || !pauseBtn || !stopBtn || !rateInput || !voiceSelect || !status) return;

  const noBrowserSpeech = /QtWebEngine|Falkon/i.test(navigator.userAgent || '');
  const hasSpeech = !noBrowserSpeech && ('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window);
  const synth = hasSpeech ? window.speechSynthesis : null;
  const audioEl = document.createElement('audio');
  audioEl.referrerPolicy = 'no-referrer';
  audioEl.preload = 'auto';
  root.appendChild(audioEl);

  let chunks = [];
  let index = 0;
  let active = false;
  let paused = false;
  let mode = hasSpeech ? 'speech' : 'online';
  let playToken = 0;

  const normalize = (text) => text.replace(/\s+/g, ' ').trim();
  const splitText = (text) => {
    const clean = normalize(text);
    if (!clean) return [];
    const max = mode === 'online' ? 180 : 220;
    const parts = clean.match(/[^.!?¡¿]+[.!?…]+|[^.!?¡¿]+$/g) || [clean];
    const out = [];
    const push = (piece) => {
      if (piece.length <= max) { out.push(piece); return; }
      let cur = '';
      for (const word of piece.split(' ')) {
        if (!cur) cur = word;
        else if ((cur + ' ' + word).length > max) { out.push(cur); cur = word; }
        else cur += ' ' + word;
      }
      if (cur) out.push(cur);
    };
    let buf = '';
    for (const part of parts) {
      const sentence = part.trim();
      if (!sentence) continue;
      if ((buf + ' ' + sentence).trim().length > max && buf) {
        push(buf.trim());
        buf = sentence;
      } else {
        buf = (buf ? buf + ' ' : '') + sentence;
      }
      if (buf.length > max) { push(buf.trim()); buf = ''; }
    }
    if (buf.trim()) push(buf.trim());
    return out;
  };

  const setStatus = (msg) => { status.textContent = msg; };
  const updateButtons = () => {
    playBtn.disabled = active && !paused;
    pauseBtn.disabled = !active || paused;
    stopBtn.disabled = !active;
  };

  const stopAudio = () => {
    audioEl.onended = audioEl.onerror = null;
    audioEl.pause();
    audioEl.removeAttribute('src');
    audioEl.load();
  };

  const stop = (msg = 'Listo para leer.') => {
    playToken += 1;
    if (synth) synth.cancel();
    stopAudio();
    active = false;
    paused = false;
    index = 0;
    updateButtons();
    setStatus(msg);
  };

  const populateVoices = () => {
    if (!synth) {
      voiceSelect.innerHTML = '<option value="">TTS online (Google)</option>';
      voiceSelect.disabled = true;
      return;
    }
    const voices = synth.getVoices().slice().sort((a, b) => {
      const al = (a.lang || '').toLowerCase(), bl = (b.lang || '').toLowerCase();
      const as = al.startsWith('es') ? 0 : 1, bs = bl.startsWith('es') ? 0 : 1;
      return as !== bs ? as - bs : (a.name || '').localeCompare(b.name || '');
    });
    const selected = voiceSelect.value;
    voiceSelect.innerHTML = '<option value="">Voz automática</option>';
    for (const voice of voices) {
      const opt = document.createElement('option');
      opt.value = voice.voiceURI;
      opt.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(opt);
    }
    if (selected && [...voiceSelect.options].some(o => o.value === selected)) voiceSelect.value = selected;
    else {
      const spanish = voices.find(v => (v.lang || '').toLowerCase().startsWith('es'));
      if (spanish) voiceSelect.value = spanish.voiceURI;
    }
  };

  const getVoice = () => {
    if (!synth) return null;
    const uri = voiceSelect.value;
    const voices = synth.getVoices();
    if (uri) return voices.find(v => v.voiceURI === uri) || null;
    return voices.find(v => (v.lang || '').toLowerCase().startsWith('es')) || null;
  };

  const useOnline = (msg) => {
    mode = 'online';
    populateVoices();
    chunks = splitText(content.innerText || content.textContent || '');
    index = 0;
    setStatus(msg);
    speakOnlineNext();
  };

  const speakOnlineNext = () => {
    if (!active || paused) return;
    if (index >= chunks.length) { stop('Lectura finalizada.'); return; }
    const token = playToken;
    const url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=es&q=' + encodeURIComponent(chunks[index]);
    stopAudio();
    audioEl.src = url;
    audioEl.playbackRate = parseFloat(rateInput.value) || 1;
    audioEl.onended = () => { if (token !== playToken || !active) return; index += 1; speakOnlineNext(); };
    let retries = 0;
    audioEl.onerror = () => {
      if (token !== playToken) return;
      const current = chunks[index];
      if (current && current.length > 80 && retries < 2) {
        retries += 1;
        const half = Math.ceil(current.length / 2);
        chunks.splice(index, 1, current.slice(0, half).trim(), current.slice(half).trim());
        speakOnlineNext();
        return;
      }
      stop('No se pudo cargar el audio online. Verificá conexión o usá el MP3.');
    };
    setStatus(`Leyendo ${index + 1}/${chunks.length} (online)…`);
    audioEl.play().catch(() => { if (token !== playToken) return; stop('El navegador bloqueó el audio. Tocá Leer de nuevo o usá el MP3.'); });
  };

  const speakSpeechNext = () => {
    if (!active || paused) return;
    if (index >= chunks.length) { stop('Lectura finalizada.'); return; }
    const utter = new SpeechSynthesisUtterance(chunks[index]);
    const voice = getVoice();
    if (voice) utter.voice = voice;
    utter.lang = voice?.lang || 'es-AR';
    utter.rate = parseFloat(rateInput.value) || 1;
    utter.onstart = () => { setStatus(`Leyendo ${index + 1}/${chunks.length}…`); };
    utter.onend = () => { if (!active) return; index += 1; speakSpeechNext(); };
    utter.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      if (!paused && active) { useOnline('Voz del navegador no disponible; usando TTS online…'); return; }
      stop(`Error al leer (${e.error || 'desconocido'}). Probá el MP3.`);
    };
    try { synth.resume(); synth.speak(utter); }
    catch (_) { if (active) useOnline('Voz del navegador no disponible; usando TTS online…'); }
  };

  const speakNext = () => (mode === 'online' ? speakOnlineNext() : speakSpeechNext());

  playBtn.addEventListener('click', () => {
    if (active && paused) {
      paused = false;
      if (mode === 'online') { audioEl.playbackRate = parseFloat(rateInput.value) || 1; audioEl.play().catch(() => stop('No se pudo reanudar.')); }
      else if (synth) synth.resume();
      updateButtons();
      setStatus(`Leyendo ${Math.min(index + 1, chunks.length)}/${chunks.length}…`);
      return;
    }
    if (active) return;
    chunks = splitText(content.innerText || content.textContent || '');
    if (!chunks.length) { setStatus('No hay texto para leer.'); return; }
    index = 0; active = true; paused = false;
    updateButtons();
    if (mode === 'speech' && !synth.getVoices().length) useOnline('Usando TTS online…');
    else speakNext();
  });

  pauseBtn.addEventListener('click', () => {
    if (!active || paused) return;
    paused = true;
    if (mode === 'online') audioEl.pause();
    else if (synth) synth.pause();
    updateButtons();
    setStatus('Pausado.');
  });

  stopBtn.addEventListener('click', () => stop('Lectura detenida.'));

  rateInput.addEventListener('input', () => {
    rateValue.textContent = `${parseFloat(rateInput.value).toFixed(2)}x`;
    if (audioEl.src) audioEl.playbackRate = parseFloat(rateInput.value) || 1;
  });

  voiceSelect.addEventListener('change', () => {
    if (!active || mode !== 'speech') return;
    const wasPaused = paused;
    synth.cancel();
    paused = false;
    updateButtons();
    if (wasPaused) { paused = true; updateButtons(); setStatus('Voz cambiada. Presioná Reanudar.'); }
    else speakNext();
  });

  populateVoices();
  if (synth && typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = populateVoices;
  if (mode === 'online') setStatus('Usando TTS online (el navegador no expone voces).');
  rateValue.textContent = `${parseFloat(rateInput.value).toFixed(2)}x`;
  updateButtons();
  window.addEventListener('beforeunload', () => { if (synth) synth.cancel(); stopAudio(); });
})();
