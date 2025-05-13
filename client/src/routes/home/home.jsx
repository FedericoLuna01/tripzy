import {
  CaretRight,
  UsersThree,
  AirplaneTakeoff,
  BellRinging,
  GlobeHemisphereWest,
  BookBookmark,
  ChatTeardropDots,
} from "phosphor-react";
import { Link } from "react-router";
import "./home.css";

import EmblaCarousel from "../../components/carousel/carousel";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="gradient-1"></div>
      <div className="gradient-1"></div>
      <section className="hero-container container ">
        <SlideIn className="left-body-container">
          <h1> Tu proxima aventura te espera</h1>
          <p>
            Planea y organizá todo tu viaje con tus amigos de la mejor manera
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
        <SlideIn side="right">
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
            <>
              <SlideIn delay={index * 0.2} className="grid-card" key={index}>
                <h1>{`0${index + 1}`}</h1>
                <p className="grid-title">{item.title}</p>
                <p>{item.description}</p>
              </SlideIn>
              {index < GRID_CARD_ITEMS.length - 1 && <CaretRight size={60} />}
            </>
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
        <SlideIn className="card-home orange-card">
          <h1>Invitá a todos tus amigos</h1>
          <p className="card-text">
            Cada integrante puede agregar o modificar actividades, ajustando el
            viaje según sus preferencias
          </p>
          <UsersThree size={72} className="icon" />
        </SlideIn>
        <div className="right-column">
          <SlideIn delay={0.1} className="card-home gray-card full">
            <h1>Organizá todo desde un solo lugar</h1>
            <p className="card-text">
              Definí fechas, destinos, actividades y alojamiento. Todo el grupo
              puede ver y proponer cambios al instante
            </p>
            <BookBookmark size={32} className="icon" color="orange" />
          </SlideIn>

          <div className="half-grid">
            <SlideIn delay={0.2} className="card-home gray-card">
              <h1>Explorá y agregá destinos</h1>
              <p className="card-text">
                Planifiquen sus paradas, lugares turísticos o ciudades favoritas
                directamente en el itinerario
              </p>
              <GlobeHemisphereWest size={32} className="icon" color="orange" />
            </SlideIn>
            <SlideIn delay={0.3} className="card-home gray-card">
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
        <div className="grid-container ">
          <EmblaCarousel />
        </div>
      </section>

      <section className="divider-section container">
        <img
          src="./trip.jpeg"
          alt="Persona mirando el paisaje"
          className="divider-image"
        />
        <SlideIn className="divider-content">
          <h2>¿Listo para empezar el viaje de tus sueños?</h2>
          <Link className="link-button" to="/register">
            <button className="button button-primary">
              Empezar <AirplaneTakeoff size={20} />
            </button>
          </Link>
        </SlideIn>
      </section>
    </div>
  );
};

export default Home;
