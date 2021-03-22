---
layout: post
title: Intercambiando canales de audio en PulseAudio
date: 2021-02-27 17:57 -0300
---

Editar el archivo: `/usr/share/pulseaudio/alsa-mixer/profile-sets/default.conf`

y en la línea:

```bash
[Mapping analog-stereo]
device-strings = front:%f hw:%f
channel-map = left,right
```

Cambiar channel-map a right,left.

Luego basta con reiniciar pulseaudio, con `pulseaudio -k`
