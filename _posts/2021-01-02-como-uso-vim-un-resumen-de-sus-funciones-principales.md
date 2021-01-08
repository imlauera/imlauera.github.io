---
layout: post
title: Como uso VIM, guía definitiva.
date: 2021-01-02 22:40 -0300
---

### Entrando y saliendo de VIM.
vim nombre\_del\_archivo para abrir vim   
:w: guarda el archivo.   
:q  sale, :q! para forzar la salida.
:wq guarda y sale.  
:x sale y guarda, equivalente a wq.  

Se puede salir usando también Shift+zq (salir sin guardar :q) o Shift+zz (guardar y salir que es equivalente a :wq o :x) 

Si abrís vim sin el nombre del archivo. O sea sólo escribiendo vim, cuando guardás vas
a tener que asignar el nombre del archivo haciendo :w \<nombre del archivo\>
#### Navegación.
<img src="{{site.baseurl}}/assets/img/vim_keys_hjkl.jpeg"/>
> La tecla h está a la izquierda y mueve a la izquierda.   
  La tecla l está a la derecha y mueve a la derecha.   
  La tecla j parece una flecha que apunta hacia abajo.   

<span style="color:green;">No deberías usar las flechas</span>, si usás las flechas no entendiste VIM al 100% todavía.
Acostumbrarse a usar h, j, k, l fue una de las cosas que más me costaron, por la
memoria muscular que tenía de usar las flechas, tenés que practicarlos hasta que no tengas
que pensar cuando los estás usando.

escape: entrás a normal mode. Por defecto VIM abre en Normal Mode. En normal mode VIM va a interpretar como un comando cualquier tecla que presiones, por ejemplo apretá Escape y después w, vas a moverte palabra por palabra en el archivo que tenés abierto.
Con i: entrás a insert mode (cuando estás en insert mode podés empezar a escribir texto) por ejemplo si estando en Insert Mode apretás ahora w te lo va a tomar como una entrada de texto, no como un comando.

Siempre vas a estar variando entre estos dos, para moverte y editar el código.


w: mueve hacia adelante por palabras desde el cursor hasta el final de la palabra, incluyendo el espacio.  
b: mueve hacia atrás desde el cursor hasta el comienzo de la palabra, incluyendo el espacio.  
y: copia. Todos los comandos de Vim se pueden usar con combos, pero esto es algo que lo veremos más adelante, por eso acá se usa yy para copiar una línea solamente pero puede usar combos para copiar múltiples líneas, como por ejemplo: yt. (copia desde donde está el cursor hasta que encuentra un .), o yj (copia dos lineas desde el cursor para abajo, habiamos visto que j sería para bajar), o yk (copia dos lineas para arriba).   
yy: copia una línea dentro de Vim, ojo no lo copia al clipboard.  
p: pega lo copiado con y.  
d: borra y lo copia. Pasa lo mismo que con y, se puede utilizar con combos, d por si sólo no hace nada. Pero si lo combinas como por ejemplo: dd (borra una linea entera), dj (borra dos lineas hacia abajo), dk (borra dos líneas hacia arriba), d$ (borra desde el cursor hasta el final de la linea), dw(borra una palabra hacia adelante), db(borra una palabra hacia atrás)  
v: selección visual, se usa al igual que los otros combinandolos con otras instrucciones, como por ejemplo: vw, vb, v$, vk, vj. Una vez que estás en visual mode podés seleccionar el texto hacia adelante presionando w infinitas veces, salís de este modo con Escape.  
V: selección visual, pero a diferencia de v, selecciona la línea completa.  
:w: guarda el archivo.  
:q sale.  

:wq guarda y sale.  

:x sale y guarda, equivalente a wq.  

Se puede salir de VIM usando también Shift+zq (salir sin guardar :q) o Shift+zz (guardar y salir que es equivalente a :wq o :x) 
 

o: agrega una nueva línea abajo, mueve el cursor abajo y te deja en insert mode, si estás situado en el comienzo de la definición de una función de programación te ubicará adentro de la misma en insert mode.  
shift+o: lo mismo pero hacia atrás.  
shift+p: lo mismo que p pero pega atrás del cursor.  
a: te deja en insert mode al igual que i, sólo que en vez de insertar atrás del cursor lo hace adelante del cursor, muy útil cuando querés insertar texto y al final de una línea.  
shift+i, and shift+a: mueve el cursor y te pone en insert mode al principio de la linea y el otro lo mismo pero al final de la linea.  
/,  n, and shift+n. busca hacia delante del cursor, con n recorrés las ocurrencias, con shift+n las recorrés hacia atrás.  
?: busca hacia atrás del cursor.  
\* and #, busca las palabras en todo el texto de la palabra en donde tu cursor está situado (busca hacia adelante).  
\#: hace lo mismo pero hacia atrás  

```
"f\*" busca y salta al primer caracter encontrado en la línea en donde está el cursor. Ejemplo: fa 
"t\*" busca y salta atrás del primer caracter encontrado en la línea donde está el cursor. Ejemplo: ta 
"F\*" y "T\*" saltan hacia atrás en los resultados encontrados 
```

Pero esto se puede hacer más fácil usando:   
```
";" salta hacia adelante y "," salta hacia atrás son iguales que F\* y T\*  
"x" eliminar un caracter, "s" eliminar un caracter y ponerte en inser mode (muy útil)  
"cw" (or "ce") borrar una palabra y entrar a insert mode   
combos: "dt)", "vf)", "vt)",  "yt)", "ct)", etc.   
Shift+d ("D") borra el resto de línea desde donde está el cursor hacia adelante y te deja en normal mode.  
Shift+c("C") hace lo mismo que Shift+d pero te deja en insert mode.   
Shift+s ("S") borra una línea **entera** y te deja en insert mode  
"gg" salta al comienzo del archivo y "G" salta al final.  
":100" o "100G" saltan a la línea 100  
"12j" salta hacia abajo 12 líneas, "12k" salta hacia arriba (se puede combinar también con "w" o con "b" pero no es tan usado).  
```
  

**Usá relative numbers agregando "set relativenumber" in .vimrc**
Te sirve para saber cuantas lineas hay hacia arriba y abajo desde la línea en donde está tu cursor.
Esto es útil para saber cuantas líneas tenés que saltar usando por (numero)j o (numero)k.

"{" y "}" sirven para moverse hacia atrás o adelante entre parrafos es decir salta entre líneas vacías.
"Ctrl + u" y "Ctrl + d" es equivalente a Page Up y Page Down, sirven para mover mitad de página hacia arriba o hacia abajo en el archivo.
"%" si te ubicás al final de una llave, corchete, o paréntesis y apretás %, te lleva hacia donde se abrió o se cerró, no funciona con comillas.

"\*i{" sirve para ejecutar un comando * dentro de unas llaves. Por ejemplo: "di{", "d2i{", "ci{"  
Si usamos d2i, afectaremos las llaves externas.

"\*ip" sirve para ejecutar un comando * sobre un párrafo. Por ejemplo: "cip", "vip"  
"\*a[" sirve para ejecutar un comando * dentro de unos corchetes incluyendo el corchete.   
Por ejemplo: "da{"

"diw" para eliminar una palabra si tu cursor está en el medio de una.   

":e \<carpeta/nombre\_del\_archivo\>" para abrir un archivo y se usa tab para autocompletar.
Si el archivo está en el directorio actual simplemente ponés el nombre del archivo :e home.html
Ejemplo de uso: :e css/styl y luego uso \<tab\> para autocompletar el nombre del archivo.

<span style="color: red; font-weight: bold;">"Ctrl + p" to open plug-in finder (fzf recommended)</span>   

Si abriste archivos con :e se usa Ctrl+6 o Ctrl+^ para moverte entre los dos últimos archivos abiertos.

Tip: Have a main file that serves as hub, <Ctrl + p> to file you want to go to (spoke), and then <Ctrl + ^> back to hub (avoid hopping around in a triangle between more than 2 files)     

"Ctrl + o" and "Ctrl + i" to jump backwards and forwards through history (can be inefficient if you have to jump back a lot)      
"mh" para establecer una marca local a la que podés saltar usando 'h (podés usar cualquier letra) pero...      
> Observación 1: Tené sólo de 3-4 marcas con "h" de las cosas más importantes y "l" de las menos importantes  

> Observación 2: Usar el comando para buscar descripto más arriba puede ser más eficiente que usar marcas locales. 

"mH" para establecer una marca global a la que podés saltar usando 'H (podés usar cualquier letra)     


Algunos usan divisiones y no pestañas.

`<Ctrl + w>` + "o" para cerrar todos los búferes a excepción del actual buffer   
`<Ctrl + w>` + "v" para separar verticalmente, <Ctrl + w> + "s" (or "n") para separar horizontalmente.  
`":resize 10"` to set split to 10 rows tall, ":vertical resize 20" to set split to 20 columns wide     
`<Ctrl + w> + "="` para dividir por igual los splits, si es que antes lo cambiaste con resize.  
` Can remap to quickly open explorer / file tree in narrow vsplit       
`<Ctrl + w> + "r"` sirve para rotar los bufers, <Ctrl + w> + "H" para cambiar la división de horizontal a vertical   

`":h \*"` sirve para abrir el manual de ayuda. Como por ejemplo :h f (con el espacio)
Se recomienda usar gruvbox como colour scheme por defecto.

Se puede seleccionar líneas enteras (Shift+v luego pulsar k o j repetidamente para seleccionar las líneas) y luego escribir :norm I o :norm A para agregar texto atrás o adelante respectivametne.

Si usás ZSH podés usar el modo vimode para usar las intrucciones de vim en zsh.
Sólo tenés que agregar ```bindkey -v``` en el .zshrc
