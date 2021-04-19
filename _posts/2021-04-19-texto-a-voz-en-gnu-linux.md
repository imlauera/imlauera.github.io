---
layout: post
title: Texto a Voz en GNU/Linux
date: 2021-04-19 14:49 -0300
---
En esta publicación vamos a analizar como reproducir un texto a audio con Festival.  


Antes de empezar, estos son los paquetes de las voces que se necesitan instalar para que pueda
festival pueda leer algún texto: 

`festvox-kdlpc16k`: Voz masculina de inglés americano para Festival.    
`festvox-ellpc11k`: Voz masculiona de castellano español para Festival.

Si querés más voces podés buscarlas con el siguiente comando
`sudo apt search festvox-`.    
Por ejemplo para instalar una voz Italiano ejecutamos:
`sudo apt-get install festvox-itapc16k`
**Observación: Hay muchos tipos de voces de español.**

Ahora procedemos entonces a instalar festival junto con voces masculinas español e inglés descriptas
anteriormentes:
`sudo apt install festival festival-doc festvox-kdlpc16k festvox-ellpc11k`

Para establecer una voz por defecto en vez de tener que agregar
`--language spanish` cada vez que ejecutás festival, podés agregar:
en `~/.festivalrc` lo siguiente: 
`(set! voice_default voice_el_diphone)`. <span style="color:red">Incluir</span> los `()` (obviamente
tenés que tener el paquete de español instalado que lo indiqué más arriba)  
<span style="color: blue">Si el archivo ~/.festivalrc no existe, creálo.</span>

<span style="color: #791451">Si querés saber las voces que tenés instaladas en tu sistema 
podés entrar a la shell interactiva de festival ejecutando 
`festival` en la consola y escribí `(voice.list)` con los `()`.  

Para establecer una de estas voces estas por defecto en agregá en `~/.festivalrc`
`(set! voice_default voice_el_diphone)`. <span style="color:red">Incluir</span> los `()`. **OJO**: agregar el  prefijo `voice_` 
antes del nombre de la voz que te muestra el comando `(voice.list)`.

Para leer un texto sin guardar el audio: `festival --tts archivo` (va a usar la voz que 
pusiste por defecto en `~/.festivalrc` o podés usar la opcion `--language spanish` si no pusiste
ninguna.  

`--tts`: Significa text to speech (texto a voz)   

Pero <span style="color:red">para que lea los tíldes y las ñ tenés que cambiar la codificación de tu archivo usando iconv</span> de la siguiente manera:
Primero instalamos iconv: `sudo apt install iconv`.   
`iconv`: convertir texto de una codificación de caracteres a otra. Es necesario porque sino festival en español no te lee los tíldes ni las ñ. Más información ejecutá `man iconv`.

Luego para cambiar la codificación del archivo:    
`iconv -f utf-8 -t iso-8859-1 texto_prueba -o texto_prueba_iso`.   

Y ahora podés leerlo en español con las tíldes y la ñ con el comando `festival --tts texto_prueba_iso`

<hr/>


`text2wave`: Es un script que trabaja con Festival y forma parte del mismo, sirve para generar un archivo wav desde un archivo de texto.


```text2wave -o salida.wav -eval '(voice_el_diphone)' texto_prueba```    
Si ya tenés configurada la voz deseada por defecto en `~/.festivalrc` no necesitás poner el argumento `-eval`.

También se puede generar un archivo `mp3` de la siguiente forma:   
```text2wave text_file | lame - text.mp3```  
Tenés que tener el comando `lame` instalado, 
y se lo instala con: `sudo apt install lame`.

**OJO**: ¡¡Acordate que primero tenés que cambiar la codificación del archivo!! si querés que pueda leer las tíldes y las ñ en español, el comando para cambiar la codificación está descripto más arriba.   

Ahora si querés que lea el texto seleccionado gráficamente con el mouse. Podés usar
`sudo apt-get install xsel`.   


`xsel`: Te permite manipular con el texto seleccionado gráficamente, más adelante muestro un ejemplo de como funciona.
Más información ejecutá `man xsel` en la consola.   
Si seleccionás algún tipo de texto en cualquier aplicación 
y ejecutás el siguiente comando, te lo va a leer.

`xsel | iconv -c -f utf-8 -t iso-8859-1 | festival --language`

Si querés guardar el audio generado podés usar **text2wave** (un script de Festival)
de la siguiente manera

Y esto es todo.
Más información: <a href="https://wiki.archlinux.org/index.php/Festival" target="_blank">Festival (Arch Wiki)</a>
