import {
  CaretRight,
  UsersThree,
  AirplaneTakeoff,
  BellRinging,
  GlobeHemisphereWest,
  BookBookmark,
} from "phosphor-react";
import { Link } from "react-router";
import styles from "./home.module.css";
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
    <div className={`overflow-hidden ${styles["home-container"]}`}>
      <div className={styles["gradient-1"]}></div>
      <div className={styles["gradient-1"]}></div>
      <section className={`${styles["hero-container"]} container`}>
        <SlideIn className={styles["left-body-container"]}>
          <h1> Tu próxima aventura te espera</h1>
          <p className={styles["hero-description"]}>
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
          <p className={styles["avatar-text"]}>
            +1069 personas organizaron su viaje
          </p>
        </SlideIn>
        <SlideIn className={styles["image-slide-in"]} side="right">
          <img
            className={styles["hero-img"]}
            src="/img-hero.png"
            alt="hero-img"
          />
        </SlideIn>
      </section>
      {/* Sección 1 */}
      <section className={`container ${styles["steps-section"]}`}>
        <SlideIn className={styles["title-container"]}>
          <h1>¿Cómo funciona?</h1>
          <p>
            En cuatro simples pasos estarás organizando tus viajes como un
            profesional
          </p>
        </SlideIn>
        <div className={styles["grid-container"]}>
          {GRID_CARD_ITEMS.map((item, index) => (
            <React.Fragment key={index}>
              <SlideIn delay={index * 0.2} className={styles["grid-card"]}>
                <h1>{`0${index + 1}`}</h1>
                <p className={styles["grid-title"]}>{item.title}</p>
                <p>{item.description}</p>
              </SlideIn>
              {index < GRID_CARD_ITEMS.length - 1 && (
                <CaretRight className={styles["caretRight"]} size={60} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={styles["container-button"]}>
          <Link className="link-button" to="/register">
            <button className="button button-primary">Comenzar ahora</button>
          </Link>
        </div>
      </section>
      {/* Sección 2 */}
      <section className={`container ${styles["trip-cards"]}`}>
        <SlideIn
          className={`${styles["card-home"]} ${styles["orange-card"]} shadow`}
        >
          <h1>Invitá a todos tus amigos</h1>
          <p className={styles["card-text"]}>
            Cada integrante puede agregar o modificar actividades, ajustando el
            viaje según sus preferencias
          </p>
          <UsersThree size={72} className={styles["icon"]} />
        </SlideIn>
        <div className={styles["right-column"]}>
          <SlideIn
            delay={0.1}
            className={`${styles["card-home"]} ${styles["gray-card"]} full shadow`}
          >
            <h1>Organizá todo desde un solo lugar</h1>
            <p className={styles["card-text"]}>
              Definí fechas, destinos, actividades y alojamiento. Todo el grupo
              puede ver y proponer cambios al instante
            </p>
            <BookBookmark size={32} className={styles["icon"]} color="orange" />
          </SlideIn>
          <div className={styles["half-grid"]}>
            <SlideIn
              delay={0.2}
              className={`${styles["card-home"]} ${styles["gray-card"]} shadow`}
            >
              <h1>Explorá y agregá destinos</h1>
              <p className={styles["card-text"]}>
                Planifiquen sus paradas, lugares turísticos o ciudades favoritas
                directamente en el itinerario
              </p>
              <GlobeHemisphereWest
                size={32}
                className={styles["icon"]}
                color="orange"
              />
            </SlideIn>
            <SlideIn
              delay={0.3}
              className={`${styles["card-home"]} ${styles["gray-card"]} shadow`}
            >
              <h1>Recibí notificaciones</h1>
              <p className={styles["card-text"]}>
                Mantenete al tanto de cambios, nuevas propuestas o comentarios
                del grupo, todo en tiempo real
              </p>
              <BellRinging
                size={32}
                className={styles["icon"]}
                color="orange"
              />
            </SlideIn>
          </div>
        </div>
      </section>
      {/* Sección 3 */}
      <section className={`container ${styles.comments}`}>
        <div className={styles["title-container"]}>
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
      <section className={`${styles["divider-section"]} container`}>
        <SlideIn className={styles["divider-content"]}>
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
          <h1 className={styles["title-form"]}> Formulario de contacto</h1>
          <FormHome />
        </SlideIn>
      </section>
    </div>
  );
};

export default Home;
