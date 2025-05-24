# Tripzy

Este proyecto es un planeador de viajes para el trabajo practico numero 1 de la materia Programación III

## Tech Stack

**Client:** React, headless UI, motion, react-hot-toast

**Server:** Express, JWT, bcrypt

## Instalación

Instalar con npm

```bash
  git clone https://github.com/FedericoLuna01/tripzy.git
  cd tripzy
```

### Client

```bash
  cd client
  npm i
  npm run dev
```

### Server

```bash
  cd server
  npm i
  npm run dev
```

## ToDo's
-  [ ] En home crear un formulario de dudas o contacto y que se comunique con la pestaña admin
- [ x ] Después de editar perfil guardar el jwt en localStorage
- [ x ] En members agregar el back y funcionalidad para invitar
- [ x ] Proteger ruta de trip si el usuario no esta invitado
- [ x ] Mostrar los viajes que pertenecen al usuario en profile (los admin deberían ver todos)
- [ x ] Hacer una vista de admin para mostrar todos los viajes
- [ x ] Hacer un custom hook para el modal (y cambiar donde se usa actualmente)
- [ x ] Proteger api por rol
- [ x ] Agregar un boton en TripLayout para poder bloquear el viaje si sos admin
- [ ] Agregar un modal cuando se agregue a un nuevo usuario al trip
- [ ] La asignación de N° de día es consecutivo, no se puede elegir otro número de día. Ejemplo, estás en día 4 de junio, agregás un día y se pone día 5 junio. No se puede elegir día 6 de junio. Quizá el día 5 no haces nada(?).

- [ x ] Posible error, querer pasar el rol de dueño a alguien, no lo permite y aparece el mensaje diciendo que puede haber un solo dueño. Cuando ya nadie tiene rol de dueño, ya nadie puede ser dueño de vuelta.
- [ ] Cuando agregás a un amigo, volvés a trip y después volvés a amigo, el amigo agregado desaparece. Para que aparezca tenés que actualizar la página.
- [ ] Cuando agrego una actividad, y sin recargar la página voy a amigas y vuelvo de vuelta a trips, la ultima actividad desaparece, a menos que recargues la página. Problema similar a amigos.
- [ x ] Cuando nadie se queda con el rol de dueño y actualizás la página, ya nadie puede ser dueño.
- [ x ] Cuando te querés cambiar de foto de perfil hay que actualizar la página para que aparezca.
- [ x ] Cuando eliminás un viaje, te lleva a error 404 y cuando apretás en volver te lleva a ups destino incierto. Creo que debería llevarte a donde están todas las imágenes de los viajes.
- [ x ] Me puedo eliminar de mi propio viaje? y me sigue apareciendo el viaje.
- [ x ] Si hiciste muchos pasos dentro de un viaje, como editar, agregar o borrar días, etc. Cuando apretás para volver atrás en la página y que te lleve a la vista general de viajes, no vuelve de una sino que cada apretada te lleva un paso atrás en lo que hiciste.
- [ x ] Cuando vas al botón de editar viaje, el segundo botón que aparece debería decir aceptar, no editar, ya que ya apretaste otro botón de editar antes.
- [ x ] Cuando pasás el dueño, te volvés editor, pero el botón de eliminar viaje sigue apareciendo. hay que borrar el botón de eliminar viaje para cuando pasás el dueño a otro miembro.

## Autores

- [@federicoluna](https://www.github.com/federicoluna01)
- [@lucianotessa](https://www.github.com/LucianoTessa)
- [@alvaroreynoso](https://www.github.com/AlvaroReynoso)
- [@ingridgrolimund]
