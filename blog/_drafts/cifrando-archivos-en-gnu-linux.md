---
layout: post
title: Cifrando archivos en GNU/Linux
---

Para cifrar:
```bash
gpg -c archivo_privado
cat privado
```
Luego de cifrar borrá el archvio original

Para descifrar:
```
gpg archivo_privado.gpg
```
