---
layout: post
title: Como uso VIM, un resumen de sus funciones principales
date: 2020-12-31 11:08 -0300
---

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
#: lo mismo pero hacia atrás  


"f*" jumps to character  
"t*" jumps to behind character  
"F*" and "T*" jump backwards through results   
";" to jump forward and "," to jump backwards through results  
"x" to delete a character, "s" to delete character and enter insert mode  
"cw" (or "ce") to delete word and enter insert mode  
combos: "dt)", "vf)", "vt)",  "yt)", "ct)", etc.  
"D" delete rest of line, "C" delete rest of line and enter insert mode  
"S" delete entire line and enter insert mode  
vimbegood exercises (plugin for neovim)   



"gg" to jump to the top and "G" to jump to the bottom  
":100" or "100G" to jump to line 100  
"12j" to jump down 12 lines, "12k" to jump back up (can also combine with "w" and "b" but used less often)  
Relative numbers "set relativenumber" in .vimrc  
"{" and "}" to hop to back and forth between empty lines  
"Ctrl + u" and "Ctrl + d" to jump half-page up and half-page down  
"%" to jump to matching pair of curly braces, brackets, parentheses; but DOESN'T work on quotes  
"*i{" to do command * on insides of curly brace  e.g. "di{", "d2i{", "ci{"  
"*ip" to do command * on paragraph e.g. "cip", "vip"  
"*a[" to do command * on inside of braces INCLUDING braces e.g. "da{",  
"diw" to delete word if you're in the middle of word   





$ vim <enter>  to open vim  
":e <folder>" to open finder (":e ." for current dir) and use tab for auto-complete  
"Ctrl + p" to open plug-in finder (fzf recommended)  
"Ctrl + ^" to jump between last two files (remember to press shift otherwise it's "Ctrl + 6")  
Tip: Have a main file that serves as hub, <Ctrl + p> to file you want to go to (spoke), and then <Ctrl + ^> back to hub (avoid hopping around in a triangle between more than 2 files)  
"Ctrl + o" and "Ctrl + i" to jump backwards and forwards through history (can be inefficient if you have to jump back a lot)   
"mh" to set local mark that you can jump to with 'h (can use any letter) but...   
Tip: Have only 3-4 marks with "h" being most important and "l" being least important  
Tip: Simple find command might be more efficient than local marks  
"mH" to set a global mark that you can jump to with 'H (can use any letter)  
File tree can be helpful for ramping up on a new project but less helpful once you know where you want to go   
ThePrimeagen uses splits not tabs, and tends not to have splits open for very long  
<Ctrl + w> then "o" to close all but current buffer  
<Ctrl + w> then "v" to split vertically, <Ctrl + w> then "s" (or "n") to split horizontally  
":resize 10" to set split to 10 rows tall, ":vertical resize 20" to set split to 20 columns wide  
<Ctrl + w> then "=" to equally spread splits  
 Can remap to quickly open explorer / file tree in narrow vsplit  
<Ctrl + w> then "r" to rotate buffers, <Ctrl + w> then "H" to switch from horizontal to vertical split  

Tip: Rarely uses these commands; prefers to quickly open and close any splits to focus on one buffer   




#### Último video.
Learning and getting good at vim is one the best investments  
Work might never make you happy but there is satisfaction is trying to be good at something  
":h *" to open help manual page for *  
Tip: Use gruvbox colour scheme  




Comentar sobre ZSH vi mode puede ayudar mucho a forzar a escribir con las intrucciones de vim.
