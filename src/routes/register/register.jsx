import React from "react";
import "./register.css";
import Logo from "../../components/ui/logo/logo";
import Input from "../../components/ui/input/input";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="container-register">
      <div className="container-form">
        <Logo />
        <h1>Crea tu cuenta</h1>
        <p>Planea tus viajes de manera fácil y rápida</p>
        <form action="">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <Input placeholder={"ej: alvaroreynoso@gmail.com"} id={"email"} />
            <p className="input-description">
              Ingrese un email que este en uso
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <Input placeholder={"*************"} id={"password"} />
            <div className="input-group-password">
              <p className="input-description">
                Debe contener al menos 8 caracteres
              </p>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="repetircontrasenia">Repetir contraseña</label>
            <Input placeholder={"*************"} id={"repetircontrasenia"} />
            <p className="input-description">
              Ingrese nuevamente su contraseña
            </p>
          </div>

          <button type="submit" className="button button-primary">
            Registrarte
          </button>
          <p className="p-description">
            ¿Ya tenés una cuenta?{" "}
            <Link className="a-a" to="/login">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
      <img className="img-register" src="./img-register.png" alt="" />
    </div>
  );
};

export default Register;
