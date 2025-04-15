import "./login.css";
import React from "react";
import Logo from "../../components/ui/logo/logo";
import Input from "../../components/ui/input/input";

const Login = () => {
  return (
    <div className="container-login">
      <div className="container-form">
        <Logo />
        <h1>Bienvenido de Nuevo</h1>
        <p>Planea tus viajes de manera fácil y rápida</p>
        <form action="">
          <div className="input-group">
            <label htmlFor="email" id="email">
              Email
            </label>
            <Input placeholder={"ej: luchotessa@gmail.com"} id={"email"} />
            <p className="input-description">
              Ingrese un email que este en uso
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="password" id="password">
              Contraseña
            </label>
            <Input placeholder={"*************"} id={"password"} />
            <div className="input-group-password">
              <p className="input-description">
                Debe contener al menos 8 caracteres
              </p>
              <a className="a-a" href="">
                Olvide mi contraseña
              </a>
            </div>
          </div>

          <button type="submit" className="button">
            Iniciar sesión
          </button>
          <p className="p-description">
            No tenés una cuenta?{" "}
            <a className="a-a" href="">
              Registrarse
            </a>
          </p>
        </form>
      </div>
      <img className="img-login" src="/img-login.png" alt="" />
    </div>
  );
};

export default Login;
