---
layout: post
title: Usando Markdown y Pandoc para hacer presentaciones como PowerPoint
date: 2020-12-31 10:39 -0300
---

Markdown es un lenguaje de marcado cuya funcionalidad es darle estilo a un texto.

Abrimos un archivo llamado: hello.md y escribimos
```
# Hello World.

Esto es una prueba.

* Esto es un ítem.
* De una lista.
* Prueba

## Este es un título más pequeño
```
Más información: [Markdown Cheat Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)  
También se puede usar etiquetas HTML en Markdown.

Ahora generamos el documento PDF:
>  pandoc hello.md -t beamer -o hello.pdf

#### Cambiando diseño, agregando título, autor, usando metadata.
En el archivo hello.md agregamos al comienzo:
```
---
title:
- Hola Mundo.
author:
- Andrés Imlauer
theme:
- Copenhagen
colortheme:
- albatross
---
```

Se puede también usar beamer themes, agregando en la sección de metadata, lo siguiente:
```
colortheme:
- albatross
```

Podés bajar otros buscando por beamer themes.

Cada vez que cambiás modificás el documento markdown tenés que volver a generarlo usando el comando escrito más arriba.

