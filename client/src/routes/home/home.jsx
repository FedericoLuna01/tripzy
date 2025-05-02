import React from "react";
import { USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import "./home.css";
import { CaretRight } from "phosphor-react";
import { UsersThree } from "phosphor-react";
import { AirplaneTakeoff } from "phosphor-react";
import { BellRinging } from "phosphor-react";
import { GlobeHemisphereWest } from "phosphor-react";
import { BookBookmark } from "phosphor-react";
import { ChatTeardropDots } from "phosphor-react";

const Home = () => {
  return (
    <div>
      <div className="hero-container container">
        <div className="gradient-1"></div>
        <div className="left-body-container">
          <h1> Tu proxima aventura te espera</h1>
          <p>
            Planea y organizá todo tu viaje con tus amigos de la mejor manera
          </p>
          <button className="button button-primary">
            Empezar <AirplaneTakeoff size={22} />
          </button>
          <div className="avatars-container">
            {new Array(6).fill(0).map((_, index) => (
              <div className="avatar" key={index}>
                <img src={`./avatares/avatar${index + 1}.png`} alt="" />
              </div>
            ))}
          </div>
          <p className="avatar-text">+1069 personas organizaron su viaje</p>
        </div>
        <div className="gradient-1"></div>
        <img className="hero-img" src="/img-hero.png" alt="hero-img" />
      </div>

      {/* Sección 1 */}
      <section className="container">
        <div className="title-container">
          <h1>¿Cómo funciona?</h1>
          <p>
            En cuatro simples pasos estarás organizando tus viajes como un
            profesional
          </p>
        </div>
        <div className="grid-container">
          <div className="grid-card">
            <h1>01</h1>
            <p className="grid-title">Creá tu cuenta</p>
            <p>
              Registrate de forma gratuita y accede a todas las funcionalidades
              de la plataforma
            </p>
          </div>
          <CaretRight size={60} />
          <div className="grid-card">
            <h1>02</h1>
            <p className="grid-title">Planificá tu viaje</p>
            <p>
              Crea un nuevo viaje, definile fechas y añadí los destinos que
              visitarás
            </p>
          </div>
          <CaretRight size={60} />
          <div className="grid-card">
            <h1>03</h1>
            <p className="grid-title">Organizá actividades</p>
            <p>
              Para cada día, añade las actividades que realizarás incluyendo
              horarios y ubicaciones
            </p>
          </div>
          <CaretRight size={60} />
          <div className="grid-card">
            <h1>04</h1>
            <p className="grid-title">Comparte y colabora</p>
            <p>
              Invita a otras personas a ver o a editar tu itinerario según los
              permisos que asignes
            </p>
          </div>
        </div>
        <div className="container-button">
          <button className="button">Comenzar ahora</button>
        </div>
      </section>

      {/* Sección 2 */}
      <section class="container trip-cards">
        <div class="card orange-card">
          <h1>Invitá a todos tus amigos</h1>
          <p>
            Cada integrante puede agregar o modificar actividades, ajustando el
            viaje según sus preferencias
          </p>
          <UsersThree size={72} className="UsersThree" />
        </div>
        <div class="right-column">
          <div class="card gray-card full">
            <h1>Organizá todo desde un solo lugar</h1>
            <p>
              Definí fechas, destinos, actividades y alojamiento. Todo el grupo
              puede ver y proponer cambios al instante
            </p>
            <BookBookmark size={32} className="BookBookmark" color="orange" />
          </div>

          <div class="half-grid">
            <div class="card gray-card">
              <h1>Explorá y agregá destinos</h1>
              <p>
                Planifiquen sus paradas, lugares turísticos o ciudades favoritas
                directamente en el itinerario
              </p>
              <GlobeHemisphereWest
                size={32}
                className="GlobeHemisphereWest"
                color="orange"
              />
            </div>
            <div class="card gray-card">
              <h1>Recibí notificaciones</h1>
              <p>
                Mantenete al tanto de cambios, nuevas propuestas o comentarios
                del grupo, todo en tiempo real
              </p>
              <BellRinging size={32} className="BellRinging" color="orange" />
            </div>
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
        <div className="grid-container">
          <div className="grid-card2">
            <ChatTeardropDots size={32} color="orange" />
            <p>
              Esta plataforma ha hecho que planificar nuestro viaje familiar sea
              muy sencillo. No más hojas de cálculo confusas o mensajes
              perdidos.
            </p>
            <p className="grid-title">Federico Luna</p>
            <p className="profession">Viajero Frecuente</p>
          </div>

          <div className="grid-card2">
            <ChatTeardropDots size={32} color="orange" />
            <p>
              Como mochilero, necesito flexibilidad. Esta app me permite
              modificar mis planes sobre la marcha y mantener a mis amigos
              informados.
            </p>
            <p className="grid-title">Álvaro Reynoso</p>
            <p className="profession">Aventurero</p>
          </div>

          <div className="grid-card2">
            <ChatTeardropDots size={32} color="orange" />
            <p>
              Uso Tripzy para todos mis viajes de negocios. Es muy cómodo, pero
              la capacidad de poder compartir itinerarios con mis colegas es
              invaluable.
            </p>
            <p className="grid-title">Luciano Tessa</p>
            <p className="profession">Ejecutivo</p>
          </div>
        </div>
      </section>

      <section className="hero-section container">
        <img
          src="/public/trip.jpeg"
          alt="Persona mirando el paisaje"
          className="hero-image"
        />
        <div className="hero-content">
          <h2>¿Listo para empezar el viaje de tus sueños?</h2>
          <button className="button">
            Empezar <AirplaneTakeoff size={22}> </AirplaneTakeoff>{" "}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
