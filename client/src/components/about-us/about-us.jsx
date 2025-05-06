import React from "react";
import "./about-us.css";
import Logo from "../ui/logo/logo";

const AboutUs = () => {
  return (
    <div className="container-aboutUs">
      <div className="content-aboutUs">
        <p>
          Somos un grupo de desarrolladores apasionados por la tecnología y la
          creación de aplicaciones web. Nuestro objetivo es facilitar la
          planificación de viajes y ayudar a las personas a descubrir nuevos
          destinos. Creemos que viajar es una de las mejores formas de aprender
          y crecer como personas. Nos encanta explorar nuevos lugares, conocer
          nuevas culturas y hacer amigos en el camino.
        </p>
        <p>
          En nuestro equipo, cada miembro aporta su propia experiencia y
          perspectiva, lo que nos permite crear una plataforma única y
          enriquecedora para nuestros usuarios. Estamos comprometidos con la
          calidad y la innovación, y siempre estamos buscando formas de mejorar
          nuestra aplicación y hacerla más útil para nuestros usuarios.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
