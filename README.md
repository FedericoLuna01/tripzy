# Tripzy

Este proyecto es un planeador de viajes para el trabajo prctico número uno de la materia Programación III

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

- [ ] Agregar modal para borrar viaje en el menu en las cards de los viajes en profile
- [ ] Mostrar distinta info dependiendo del rol en el menu de los viajes en el profile (o directamente no mostrar el menu)
- [ ] Separar los fetch de los componentes
- [ ] Hacer funciones generales para validar formularios
- [ ] Validar email en login
- [ ] Agregar una advertencia la hacer owner a alguien
- [ ] La asignación de N° de día es consecutivo, no se puede elegir otro número de día. Ejemplo, estás en día 4 de junio, agregás un día y se pone día 5 junio. No se puede elegir día 6 de junio. Quizá el día 5 no haces nada(?).
- [ x ] Cuando agregás a un amigo, volvés a trip y después volvés a amigo, el amigo agregado desaparece. Para que aparezca tenés que actualizar la página.
- [ x ] Cuando agrego una actividad, y sin recargar la página voy a amigas y vuelvo de vuelta a trips, la ultima actividad desaparece, a menos que recargues la página. Problema similar a amigos.

## Autores

- [@federicoluna](https://www.github.com/federicoluna01)
- [@lucianotessa](https://www.github.com/LucianoTessa)
- [@alvaroreynoso](https://www.github.com/AlvaroReynoso)
