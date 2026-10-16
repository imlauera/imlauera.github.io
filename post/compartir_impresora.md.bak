---
title: "Compartir impresora en Windows"
date: 2024-09-11T11:07:44-03:00
tags: ['impresora']
---
#### YouTube
https://www.youtube.com/watch?v=2HyhMo4Qtw8

#### Invidious
https://redirect.invidious.us/watch?v=2HyhMo4Qtw8


(Crea un usuario impresora no hace falta) https://www.youtube.com/watch?v=t_8iZ1pxURU

#### Creá un usuario llamado impresora (no hace falta si el usuario que ya usas tiene contraseña o si le querés agregar una contraseña al usuario que ya tenes):
Esta solucion es sólo si no querés agregarle una contraseña al usuario que estás usando

Configuración > otros usuarios > agregar cuenta > no tengo los datos de inicio de session de esta persona > agregar un usuario sin cuenta microsoft > Impresora > contraseña y preguntas de seguridad.



Inicio > impresoras y escaners  
Seleccioná impresora a compartir y dale a propiedades de impresora > compartir(pestaña) > compartir esta impresora  
Seguridad (pestaña) > Agregar > Escriba los nombres de objeto que desea seleccionar > impresora(usuario creado) > Comprobar nombres > Aceptar > Ahora dale todos los permisos al usuario > Imprimir, Administrar esta impresora, Administrar documentos.  


### Lo que me funcionó (no necesité crear el usuario como en el paso anterior sólo agregar una contraseña)

Primero tenés que compartir la impresora como fue mencionado anteriormente.

Botón derecho ícono WiFi o monitor en la barra de tareas > centro de redes y recursos compartidos > cambiar configuración de uso compartido avanzado > ahí bajo las opciones de (privada, publica y todas las redes): seleccioná la primera en opcion en todas las solapas, y en la última opción de todas las redes, seleccioná compartir por contraseña.

En la computadora servidor que tiene la impresora conectada:

Inicio > Panel de control > buscá: centro de redes > cambiar configuración de uso avanzado > todas las redes > activar el uso compartido por protección por contraseña y en las demás secciones (privada pública) debe estar seleccionada las primeras opciones.

Inicio > Panel de control > cuentas de usuario > cambiar el tipo de cuenta > crear contraseña > 


Ahora en la computadora cliente debés hacer exactamente los mismos pasos menos el último (cambiar la contraseña).

Este paso sólo en el equipo cliente, le damos las credenciales de la computadora a la que nos queremos conectar:

Inicio > administrador de credenciales > credenciales de windows > abajo: agregar credenciales de windows > ingresá los datos del equipo que hace de servidor (IP) nombre de usuario y contraseña.


Ahora desde la máquina cliente ingresá `\\IP_COMPUTADORA_SERVIDORA` e instalá la impresora compartida dándole doble click.

Si no funciona así tenés que descargar el driver, pero es raro en la mayoría de los casos funciona así y vas a tener que agregar la impresora manualmente.
