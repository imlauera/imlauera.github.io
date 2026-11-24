(() => {
  const root = document.querySelector('[data-tts-reader]');
  if (!root || !('speechSynthesis' in window)) {
    if (root) root.hidden = true;
    return;
  }

  const content = document.querySelector('.post .content');
  const playBtn = root.querySelector('[data-tts-play]');
  const pauseBtn = root.querySelector('[data-tts-pause]');
  const stopBtn = root.querySelector('[data-tts-stop]');
  const rateInput = root.querySelector('[data-tts-rate]');
  const rateValue = root.querySelector('[data-tts-rate-value]');
  const voiceSelect = root.querySelector('[data-tts-voice]');
  const status = root.querySelector('[data-tts-status]');
  if (!content || !playBtn || !pauseBtn || !stopBtn || !rateInput || !voiceSelect || !status) return;

  const synth = window.speechSynthesis;
  let chunks = [];
  let index = 0;
  let active = false;
  let paused = false;

  const normalize = (text) => text.replace(/\s+/g, ' ').trim();

  const splitText = (text) => {
    const clean = normalize(text);
    if (!clean) return [];
    const parts = clean.match(/[^.!?¡¿]+[.!?…]+|[^.!?¡¿]+$/g) || [clean];
    const out = [];
    let buf = '';
    for (const part of parts) {
      const sentence = part.trim();
      if (!sentence) continue;
      if ((buf + ' ' + sentence).trim().length > 220 && buf) {
        out.push(buf.trim());
        buf = sentence;
      } else {
        buf = (buf ? buf + ' ' : '') + sentence;
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  };

  const setStatus = (msg) => { status.textContent = msg; };

  const populateVoices = () => {
    const voices = synth.getVoices().slice().sort((a, b) => {
      const al = (a.lang || '').toLowerCase();
      const bl = (b.lang || '').toLower();
      const as = al.startsWith('es') ? 0 : 1;
      const bs = bl.startsWith('es') ? 0 : 1;
      if (as !== bs) return as - bs;
      return (a.name || '').localeCompare(b.name || '');
    });
    const selected = voiceSelect.value;
    voiceSelect.innerHTML = '';
    const auto = document.createElement('option');
    auto.value = '';
    auto.textContent = 'Voz automática';
    voiceSelect.appendChild(auto);
    for (const voice of voices) {
      const opt = document.createElement('option');
      opt.value = voice.voiceURI;
      opt.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(opt);
    }
    if (selected && [...voiceSelect.options].some(o => o.value === selected)) {
      voiceSelect.value = selected;
    } else {
      const spanish = voices.find(v => (v.lang || '').toLowerCase().startsWith('es'));
      if (spanish) voiceSelect.value = spanish.voiceURI;
    }
  };

  const getVoice = () => {
    const uri = voiceSelect.value;
    const voices = synth.getVoices();
    if (uri) return voices.find(v => v.voiceURI === uri) || null;
    return voices.find(v => (v.lang || '').toLowerCase().startsWith('es')) || null;
  };

  const updateButtons = () => {
    playBtn.disabled = active && !paused;
    pauseBtn.disabled = !active || paused;
    stopBtn.disabled = !active;
  };

  const stop = (msg = 'Listo para leer.') => {
    synth.cancel();
    active = false;
    paused = false;
    index = 0;
    updateButtons();
    setStatus(msg);
  };

  const speakNext = () => {
    if (!active || paused) return;
    if (index >= chunks.length) {
      stop('Lectura finalizada.');
      return;
    }
    const utter = new SpeechSynthesisUtterance(chunks[index]);
    const voice = getVoice();
    if (voice) utter.voice = voice;
    utter.rate = parseFloat(rateInput.value) || 1;
    utter.onstart = () => { setStatus(`Leyendo ${index + 1}/${chunks.length}…`); };
    utter.onend = () => { if (!active) return; index += 1; speakNext(); };
    utter.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      stop('Error al leer con la voz del navegador.');
    };
    synth.speak(utter);
  };

  playBtn.addEventListener('click', () => {
    if (active && paused) {
      paused = false;
      synth.resume();
      updateButtons();
      setStatus(`Leyendo ${Math.min(index + 1, chunks.length)}/${chunks.length}…`);
      return;
    }
    if (active) return;
    chunks = splitText(content.innerText || content.textContent || '');
    if (!chunks.length) { setStatus('No hay texto para leer.'); return; }
    index = 0;
    active = true;
    paused = false;
    updateButtons();
    speakNext();
  });

  pauseBtn.addEventListener('click', () => {
    if (!active || paused) return;
    synth.pause();
    paused = true;
    updateButtons();
    setStatus('Pausado.');
  });

  stopBtn.addEventListener('click', () => stop('Lectura detenida.'));

  rateInput.addEventListener('input', () => {
    rateValue.textContent = `${parseFloat(rateInput.value).toFixed(2)}x`;
  });

  voiceSelect.addEventListener('change', () => {
    if (!active) return;
    const wasPaused = paused;
    synth.cancel();
    paused = false;
    updateButtons();
    if (wasPaused) {
      paused = true;
      updateButtons();
      setStatus('Voz cambiada. Presioná Reanudar.');
    } else {
      speakNext();
    }
  });

  populateVoices();
  if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = populateVoices;
  rateValue.textContent = `${parseFloat(rateInput.value).toFixed(2)}x`;
  updateButtons();
  window.addEventListener('beforeunload', () => synth.cancel());
})();
