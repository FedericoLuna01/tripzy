import React from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./carousel-arrow-button";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import { ChatTeardropDots } from "phosphor-react";

// ANDA ESA VERGA O QUE?

const EmblaCarousel = () => {
  const SLIDES = [
    {
      description:
        "Gracias a esta plataforma, organizar mis escapadas de fin de semana es rápido y sin estrés. Todo está en un solo lugar.",
      name: "Luciano Tessa",
      role: "Explorador Urbano",
    },
    {
      description:
        "Me encantó lo intuitiva que es la herramienta. Pude coordinar un viaje con amigos sin complicaciones ni malos entendidos.",
      name: "Álvaro Reynoso",
      role: "Aventurero Social",
    },
    {
      description:
        "Planear unas vacaciones familiares solía ser un caos. Ahora todo fluye de forma ordenada y hasta divertida.",
      name: "Ingrid Grolimund",
      role: "Mamá Viajera",
    },
    {
      description:
        "Nunca pensé que coordinar un viaje en grupo pudiera ser tan sencillo. Esta plataforma me ahorró horas de trabajo.",
      name: "Luciano Tessa",
      role: "Coordinador de Viajes",
    },
    {
      description:
        "Una solución genial para los que amamos viajar pero no tanto planificar. Todo claro, visual y fácil de seguir.",
      name: "Ingrid Grolimund",
      role: "Amante de la Aventura",
    },
    {
      description:
        "Planear unas vacaciones familiares solía ser un caos. Ahora todo fluye de forma ordenada y hasta divertida.",
      name: "Ingrid Grolimund",
      role: "Mamá Viajera",
    },
    {
      description:
        "Nunca pensé que coordinar un viaje en grupo pudiera ser tan sencillo. Esta plataforma me ahorró horas de trabajo.",
      name: "Luciano Tessa",
      role: "Coordinador de Viajes",
    },
    {
      description:
        "Una solución genial para los que amamos viajar pero no tanto planificar. Todo claro, visual y fácil de seguir.",
      name: "Ingrid Grolimund",
      role: "Amante de la Aventura",
    },
    {
      description:
        "Planear unas vacaciones familiares solía ser un caos. Ahora todo fluye de forma ordenada y hasta divertida.",
      name: "Ingrid Grolimund",
      role: "Mamá Viajera",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
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
            <div className="grid-card2 embla__slide" key={index}>
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

export default EmblaCarousel;
