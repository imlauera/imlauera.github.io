---
layout: post
title: Usando Markdown, Beamer y Pandoc para hacer presentaciones como PowerPoint
date: 2020-12-31 10:39 -0300
---

Primero de todo tenés que tener el paquete LaTeX instalado. Si usás debian te recomiendo instalar el paquete 
texlive-full.
**Pandoc** es un conversor de documentos libre y de código abierto, mayormente usado como una herramienta de escritura (especialmente por académicos). 

**Markdown** es un lenguaje de marcado cuya funcionalidad es darle estilo a un texto.

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
```bash
pandoc hello.md -t beamer -o hello.pdf
```


<span style="color: red; font-weight:bold;">Observación</span>: Para crear la presentación estamos usando **Beamer**. 

> Beamer es una clase de LaTeX para la creación de presentaciones. Al estar basado en LaTeX, Beamer es especialmente útil para preparar presentaciones en las que es necesario mostrar gran cantidad de expresiones matemáticas, el fuerte de dicho sistema de maquetación. 

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

Se puede también usar otros beamer themes, agregando en la sección de metadata mostrada arriba, lo siguiente:

{% highlight markdown %}
colortheme:
- albatross
{% endhighlight %}

Podés usar y bajar otros buscando por beamer themes.

Cada vez que modificás el documento markdown tenés que volver a generarlo usando pandoc.

Fuentes: [The Easiest Way to Make Presentations! (Pandoc + Markdown)](https://www.youtube.com/watch?v=dum7q6UXiCE), [Pandoc](https://en.wikipedia.org/wiki/Pandoc), [Beamer](https://en.wikipedia.org/wiki/Beamer_(LaTeX)).
