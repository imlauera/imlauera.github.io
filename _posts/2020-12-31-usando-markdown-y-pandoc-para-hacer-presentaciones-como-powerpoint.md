---
layout: post
title: Usando Markdown y Pandoc para hacer presentaciones como PowerPoint
date: 2020-12-31 10:39 -0300
---

Markdown es un lenguaje de marcado cuya funcionalidad es darle estilo a un texto.

Abrimos un archivo llamado: hello.md y escribimos
{% highlight markdown %}
# Hello World.

Esto es una prueba.

* Esto es un ítem.
* De una lista.
* Prueba

## Este es un título más pequeño
{% endhighlight %}
Más información: [Markdown Cheat Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)  
También se puede usar etiquetas HTML en Markdown.

Ahora generamos la presentación:
>  pandoc hello.md -t beamer -o hello.pdf

#### Cambiando diseño, agregando título, autor en la presentación usando metadata:
En el archivo hello.md agregamos al comienzo:
{% highlight markdown %}
---
title:
- Hola Mundo.
author:
- Andrés Imlauer
theme:
- Copenhagen
---
{% endhighlight %}

Se puede también usar beamer themes, agregando en la sección de metadata, lo siguiente:

{% highlight markdown %}
colortheme:
- albatross
{% endhighlight %}

Podés bajar otros buscando por beamer themes.

Cada vez que modificás el documento markdown tenés que volver a generarlo usando pandoc.

Fuente: [The Easiest Way to Make Presentations! (Pandoc + Markdown)](https://www.youtube.com/watch?v=dum7q6UXiCE)
