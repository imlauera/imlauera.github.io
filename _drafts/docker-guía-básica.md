---
layout: post
title: 'Docker: Guía básica'
---
#### Docker vs VMs
- Las máquinas virtuales usan un sistema operativo completo con su propia gestión de memoria y la
sobrecarga de los drivers de los dispositivos virtuales. 
- Docker usa UAFS para ahorrar espacio. 
- Los containers son "procesos" limitados o enjaulados.  Es decir poseen una mejor complejidad.
- Los servicios son PROCESOS dentro del docker host. 

#### Diferencias de almacenamiento

- Los Containers están aislados pero comparten un mismo SO y, cuando pueden, bionarios y/o librerías.
Importante: Los contenedores Docker son ejecutados por el Docker engine(Aclaración: Instalar docker-engine
no "docker.io") en lugar de por un hypervisor.
- Los containers son más pequeños, se inician antes, y rinden mejor y comparten kernel.

#### Docker containers (DC) vs VM
- DC comparten kernel y librerías por lo tanto cargan menos menoria.
- Las VM tienen mejor aislamiento (Intel Vtd/Vtx). DC no tiene aislamiento hardware.
- En media, una aplicación puede llegar a ejecutarse dos veces más rápido que un VM.
Por lo tanto los Docker Containers son más eficientes que las máquinas virtuales.

Aunque existen escenarios de distribución de cargas de trabajo en los que es más apropiado utilizar máquinas virtuales.

Casos:
1. BD Oracle.
    - Oracle no ofrece soporte de su DB en contenedores.
    - Oracle sólo ofrece soporte de su DB en instalación baremetal o con su propio hypervisor.
2. Aplicaciones de terceros, con los que nuestros containers deben poder comunicarse.
3. Clusters de DB preexistentes o remotos.
4. Software PARA WINDOWS o PARA SPARC.

Puede utilizarse un escenario mixto con máquinas físicas y contenedores.

### Esquemas híbridos
- Los entornos productivos no se sostienen únicamente con VM y contenedores.
- La gestión de la capacidad, seguridad y rendimiento pueden requerir herramientas aún
no disponibles para entornos de contenedores, aunque están apareciendo.
- En esquemas híbridos, tendremos que habilitar modos de red "más complejos", en "OVERLAY".

```bash
docker network create -d overlay
```

```bash
docker run -itd --net=my-multi-host-network busybox
```

Una vez conectados cada contenedor tiene acceso a todos los demás contenedores en la rd
sin importar en cual host de Docker fue ejecutado.

Conclusión: 
- VM proporcionan alta flexibilidad.
- DC pone el foco en aplicaciones y sus dependencias.
- DC promete sencillez al traspasar pilas aplicación entre proveedores de cloud.
- Disponemos de herramientas y documentos suficientes para montar nuestro clúster Docker
y comenzar a trabjar en este modelo.



#### Orquestadores que trabajan con Docker.
## OpenStack:
Incorpora un "driver" de hypervisor para OpenStack Nova Compute:
## OpenNebula:
Docker Machine te permite crear Docker Hosts en nuestra computadora, en proveedores
de cloud y en nuestro propio DataCenter.
- La integración de OpenNebula y docker machine es muy simple.

OpenNebula Docker Driver y Datastore:
- ONEDock es un conjunto de extensiones para OpenNebula que permite usar contenedores
Docker como si fueran MV ligeras.
- Docker se configura para que actúe como un hipervisor, de manera que se comporta como
KVM por ejemplo.
- La idea subyacente es que cuando a OpenNebula se le pide una VM, desplegará un container
Docker en su lugar.

### Integración contínua
- Definición: La integración continua 



