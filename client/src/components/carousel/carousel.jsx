import useEmblaCarousel from "embla-carousel-react";
import { ChatTeardropDots } from "phosphor-react";
import Autoplay from "embla-carousel-autoplay";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./carousel-arrow-button";
import "./carousel.css";

const Carousel = () => {
  const SLIDES = [
    {
      description:
        "Esta plataforma revolucionó la forma en que planifico mis viajes de negocios. Todo está optimizado para máxima eficiencia.",
      name: "Carlos Méndez",
      role: "Ejecutivo de Ventas",
    },
    {
      description:
        "Como mochilero, necesito flexibilidad. Esta herramienta me permite ajustar mis planes sobre la marcha sin perder el control.",
      name: "Daniela Ríos",
      role: "Viajera Mochilera",
    },
    {
      description:
        "Organizar nuestro viaje de graduación fue pan comido. Todos pudieron colaborar y ver los planes en tiempo real.",
      name: "Fernando Torres",
      role: "Estudiante Universitario",
    },
    {
      description:
        "Finalmente una solución que entiende las necesidades de los viajeros frecuentes. Integra perfectamente todos mis itinerarios.",
      name: "Mariana Costa",
      role: "Consultora Internacional",
    },
    {
      description:
        "La función de presupuesto compartido nos salvó de muchas discusiones en nuestro viaje de amigos. ¡Totalmente recomendado!",
      name: "Roberto Salinas",
      role: "Organizador de Grupos",
    },
    {
      description:
        "Como fotógrafo profesional, necesito planificar ubicaciones exactas. Esta plataforma me ayuda a coordinar mis sesiones de viaje.",
      name: "Lucía Valdivia",
      role: "Fotógrafa de Viajes",
    },
    {
      description:
        "Nunca había visto una herramienta tan completa para viajes en pareja. Nos mantiene sincronizados en todos los detalles.",
      name: "Alejandro y Camila",
      role: "Viajeros en Pareja",
    },
    {
      description:
        "La integración con mapas y transporte público hace que explorar ciudades nuevas sea mucho más accesible.",
      name: "Sofía Nakamura",
      role: "Turista Cultural",
    },
    {
      description:
        "Perfecto para familias numerosas. Todos pueden ver el itinerario y agregar sus preferencias fácilmente.",
      name: "Los García",
      role: "Familia Viajera",
    },
  ];

  const carouselOptions = {
    align: "start",
    loop: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((slide, index) => (
            <div className="grid-card2 embla__slide shadow" key={index}>
              <ChatTeardropDots size={32} color="orange" />
              <p>{slide.description}</p>
              <p className="grid-title">{slide.name}</p>
              <p className="profession">{slide.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
