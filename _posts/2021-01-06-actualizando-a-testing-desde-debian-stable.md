---
layout: post
title: Actualizando a Testing desde Debian Stable
date: 2021-01-06 20:49 -0300
---

### Cómo funciona Debian de pruebas, Testing

Los paquetes desde Debian inestable entran automáticamente en la siguiente distribución estable de pruebas, cuando una lista de requerimientos se completa: 

* El paquete ha estado en "inestable" por lo menos 2-10 días (dependiendo de la urgencia de la subida).
* Se ha construido el paquete para todas las arquitecturas para las que la presente versión de pruebas fue construida.
* Instalar el paquete en pruebas no hará la distribución menos instalable.
* El paquete no introduce nuevos bugs de publicación críticos. 

1. Edite el fichero /etc/apt/sources.list, cambiando 'stable' (o el actual nombre clave para stable) a 'testing' (o el actual nombre clave para la siguiente publicación estable).

2. Elimine o comente las líneas de actualizaciones de seguridad de stable (cualquier cosa con security.debian.org en ella).
3. Elimine o comente otras líneas específicas de stable, como *-backports o *-updates. 

El nombre clave para la siguiente publicación estable, p.ej: "bullseye", seguirá el trazo de "bullseye" a través de su transición a "stable" y mas tarde a oldstable, mientras que "testing" permanecerá rotando tras la nueva publicacion stable. Si usted prefiriese seguir la publicación stretch segun se vuelve stable, actualice el /etc/apt/sources.list reemplazando "stable" o "testing" con "bullseye". 

Si usted esta siguiendo testing o el nombre clave de la siguiente estable, siempre debería tener la correspondiente línea deb http://security.debian.org <"testing" or codename>/updates main en /etc/apt/sources.list.
