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

- [ x ] Después de editar perfil guardar el jwt en localStorage
- [ x ] En members agregar el back y funcionalidad para invitar
- [ ] Proteger ruta de trip si el usuario no esta invitado
- [ x ] Mostrar los viajes que pertenecen al usuario en profile (los admin deberían ver todos)
- [ ] Hacer una vista de admin para mostrar todos los viajes
- [ x ] Hacer un custom hook para el modal (y cambiar donde se usa actualmente)
- [ ] Proteger api por rol
- [ ] Agregar un boton en TripLayout para poder bloquear el viaje si sos admin
- [ ] Agregar un modal cuando se agregue a un nuevo usuario al trip

## Autores

- [@federicoluna](https://www.github.com/federicoluna01)
- [@lucianotessa](https://www.github.com/LucianoTessa)
- [@alvaroreynoso](https://www.github.com/AlvaroReynoso)
- [@ingridgrolimund]
