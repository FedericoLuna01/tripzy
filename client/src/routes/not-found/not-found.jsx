import React from "react";
import { ArrowLeft, Compass } from "phosphor-react";
import "./not-found.css";

const NotFound = () => {
  const handleBackButton = () => {
    window.history.back();
  };
  return (
    <div>
      <div className="container-pageNotFound">
        <img src="./img-notFound.png" alt="" />
        <div className="container-notFound">
          <div className="notFound-title">
            <h1>4</h1>
            <Compass size={150} className="notFound-icon" />
            <h1>4</h1>
          </div>
          <div className="notFound-subTitle">
            <h2>Pagina no encontrada</h2>
            <p>Parece que estas perdido...deberias volver</p>
            <button
              onClick={handleBackButton}
              className="button button-secondary button-not-found"
            >
              Volver <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
