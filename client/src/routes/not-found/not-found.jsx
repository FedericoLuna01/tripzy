import { ArrowLeft, Compass } from "phosphor-react";
import { Link } from "react-router";
import "./not-found.css";

const NotFound = () => {
  return (
    <div>
      <div className="container-pageNotFound">
        <img src="/img-notFound.png" alt="" />
        <div className="container-notFound">
          <div className="notFound-title">
            <h1>4</h1>
            <Compass size={150} className="notFound-icon" />
            <h1>4</h1>
          </div>
          <div className="notFound-subTitle">
            <h2>Pagina no encontrada</h2>
            <p>Parece que estas perdido... deberías volver</p>
            <Link to="/">
              <button className="button button-secondary button-not-found">
                Volver <ArrowLeft size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
