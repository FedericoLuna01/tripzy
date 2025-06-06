import {
  CaretRight,
  UsersThree,
  AirplaneTakeoff,
  BellRinging,
  GlobeHemisphereWest,
  BookBookmark,
} from "phosphor-react";
import { Link } from "react-router";
import "./home.css";
import SlideIn from "../../components/ui/slide-in/slide-in";
import Carousel from "../../components/carousel/carousel";
import React from "react";
import FormHome from "../../components/form-home/form-home";

const Home = () => {
  const GRID_CARD_ITEMS = [
    {
      title: "Creá tu cuenta",
      description:
        "Registrate de forma gratuita y accede a todas las funcionalidades de la plataforma",
    },
    {
      title: "Planificá tu viaje",
      description:
        "Crea un nuevo viaje, definí fechas y añadí los destinos que visitarás",
    },
    {
      title: "Organizá actividades",
      description:
        "Para cada día, añade las actividades que realizarás incluyendo horarios y ubicaciones",
    },
    {
      title: "Comparte y colabora",
      description:
        "Invita a otras personas a ver o a editar tu itinerario según los permisos que asignes",
    },
  ];

  return (
    <div className="overflow-hidden home-container">
      <div className="gradient-1"></div>
      <div className="gradient-1"></div>
      <section className="hero-container container">
        <SlideIn className="left-body-container">
          <h1> Tu próxima aventura te espera</h1>
          <p>
            Planeá y organizá todo tu viaje con tus amigos de la mejor manera
          </p>
          <Link className="link-button" to="/register">
            <button className="button button-primary">
              Empezar <AirplaneTakeoff size={22} />
            </button>
          </Link>
          <div className="avatars-container">
            {new Array(6).fill(0).map((_, index) => (
              <div className="avatar" key={index}>
                <img src={`./avatares/avatar${index + 1}.png`} alt="" />
              </div>
            ))}
          </div>
          <p className="avatar-text">+1069 personas organizaron su viaje</p>
        </SlideIn>
        <SlideIn className="image-slide-in" side="right">
          <img className="hero-img" src="/img-hero.png" alt="hero-img" />
        </SlideIn>
      </section>
      {/* Sección 1 */}
      <section className="container steps-section">
        <SlideIn className="title-container">
          <h1>¿Cómo funciona?</h1>
          <p>
            En cuatro simples pasos estarás organizando tus viajes como un
            profesional
          </p>
        </SlideIn>
        <div className="grid-container">
          {GRID_CARD_ITEMS.map((item, index) => (
            <React.Fragment key={index}>
              <SlideIn delay={index * 0.2} className="grid-card">
                <h1>{`0${index + 1}`}</h1>
                <p className="grid-title">{item.title}</p>
                <p>{item.description}</p>
              </SlideIn>
              {index < GRID_CARD_ITEMS.length - 1 && (
                <CaretRight className="caretRight" size={60} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="container-button">
          <Link className="link-button" to="/register">
            <button className="button button-primary">Comenzar ahora</button>
          </Link>
        </div>
      </section>
      {/* Sección 2 */}
      <section className="container trip-cards">
        <SlideIn className="card-home orange-card shadow">
          <h1>Invitá a todos tus amigos</h1>
          <p className="card-text">
            Cada integrante puede agregar o modificar actividades, ajustando el
            viaje según sus preferencias
          </p>
          <UsersThree size={72} className="icon" />
        </SlideIn>
        <div className="right-column">
          <SlideIn delay={0.1} className="card-home gray-card full shadow">
            <h1>Organizá todo desde un solo lugar</h1>
            <p className="card-text">
              Definí fechas, destinos, actividades y alojamiento. Todo el grupo
              puede ver y proponer cambios al instante
            </p>
            <BookBookmark size={32} className="icon" color="orange" />
          </SlideIn>
          <div className="half-grid">
            <SlideIn delay={0.2} className="card-home gray-card shadow">
              <h1>Explorá y agregá destinos</h1>
              <p className="card-text">
                Planifiquen sus paradas, lugares turísticos o ciudades favoritas
                directamente en el itinerario
              </p>
              <GlobeHemisphereWest size={32} className="icon" color="orange" />
            </SlideIn>
            <SlideIn delay={0.3} className="card-home gray-card shadow">
              <h1>Recibí notificaciones</h1>
              <p className="card-text">
                Mantenete al tanto de cambios, nuevas propuestas o comentarios
                del grupo, todo en tiempo real
              </p>
              <BellRinging size={32} className="icon" color="orange" />
            </SlideIn>
          </div>
        </div>
      </section>
      {/* Sección 3 */}
      <section className="container comments">
        <div className="title-container">
          <h1>Lo que nuestros usuarios opinan</h1>
          <p>
            Miles de viajeros ya están disfrutando de una mejor manera de
            planificar sus aventuras.
          </p>
        </div>
        <div className="">
          <Carousel />
        </div>
      </section>
      {/* Divider section */}
      <section className="divider-section container">
        <SlideIn className="divider-content">
          <h2>¿Listo para empezar el viaje de tus sueños?</h2>
          <Link className="link-button" to="/register">
            <button className="button button-primary">
              Empezar <AirplaneTakeoff size={20} />
            </button>
          </Link>
        </SlideIn>
      </section>
      {/* Sección 4 */}
      <section className="container">
        <SlideIn>
          <h1 className="title-form"> Formulario de contacto</h1>
          <FormHome />
        </SlideIn>
      </section>
    </div>
  );
};

export default Home;
