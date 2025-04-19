import "./login.css";
import React, { useState } from "react";
import Logo from "../../components/ui/logo/logo";
import Input from "../../components/ui/input/input";
import { Link } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({ email: false, password: false });
    let hasError = false;
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: true,
      }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: true,
      }));
      hasError = true;
    }
    if (hasError) {
      return;
    }
    toast.success("inicio de sesión correcto");
  };
  return (
    <div className="container-login">
      <div className="container-form">
        <Logo />
        <h1>Bienvenido de Nuevo</h1>
        <p>Planea tus viajes de manera fácil y rápida</p>
        <form onSubmit={handleSubmit} action="">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <Input
              value={email}
              placeholder={"ej: alvaroreynoso@gmail.com"}
              id={"email"}
              onChange={handleEmailChange}
              className={`${errors.email ? "error" : ""}`}
            />
            <p className="input-description">
              Ingrese un email que este en uso
            </p>
            {errors.email && (
              <p className="error-message">Por favor, ingrese un email</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <Input
              value={password}
              placeholder={"*************"}
              id={"password"}
              onChange={handlePasswordChange}
              className={`${errors.password ? "error" : ""}`}
            />
            <div className="input-group-password">
              <p className="input-description">
                Debe contener al menos 8 caracteres
              </p>
              <a className="a-a" href="">
                Olvide mi contraseña
              </a>
            </div>
            {errors.password && (
              <p className="error-message">Por favor, ingrese una contraseña</p>
            )}
          </div>

          <button type="submit" className="button button-primary">
            Iniciar sesión
          </button>
          <p className="p-description">
            No tenés una cuenta?{" "}
            <Link className="a-a" to="/register">
              Registrarse
            </Link>
          </p>
        </form>
      </div>
      <img className="img-login" src="/img-login.png" alt="" />
    </div>
  );
};

export default Login;
