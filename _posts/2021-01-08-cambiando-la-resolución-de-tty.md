---
layout: post
title: Cambiando la resolución de TTY
date: 2021-01-08 15:06 -0300
---


Sólo podés usar modos que tu tarjeta gráfica soporta vía VBE; podés verlos ejecutando el comando `vbeinfo` en el grub o también podés detectar las resoluciones usando el comando:
```bash
sudo hwinfo --framebuffer
```
Luego el resultado lo usé en `"gfxpayload="` en /etc/default/grub demostrado más abajo, en mi caso la máxima resolución admitida era 1920x1080.

### Editando /etc/default/grub

En muchos sitios decían de usar la opción vga en la variable GRUB_CMDLINE_LINUX pero no funcionó para mi, está obsoleta. Es decir, en vez de usar `GRUB_CMDLINE_LINUX="vga=nnn"` usé `GRUB_CMDLINE_LINUX="gfxpayload=1920x1080"`

Éstas son las opciones que agregué y modifiqué al archivo /etc/default/grub:
```bash
# Modifiqué estas dos variables:
GRUB_CMDLINE_LINUX="gfxpayload=1920x1080"
GRUB_GFXMODE=1920x1080

# Y agregué estas otras dos variables:
# Hack to force higher framebuffer resolution
GRUB_GFXPAYLOAD_LINUX=1920x1080
# Hace falta poner esto para que funcione el Hack para forzar la resolución
GRUB_GFXPAYLOAD_LINUX=keep
```
Luego de eso, ejecutar
```bash
sudo update-grub
```
Y listo!


Por último si querés cambiar la letra de la TTY, lo podés hacer ejecutando:
```bash
sudo dpkg-reconfigure console-setup
```

