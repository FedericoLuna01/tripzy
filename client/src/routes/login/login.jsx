import "./login.css";
import React, { useContext, useState } from "react";
import Logo from "../../components/ui/logo/logo";
import Input from "../../components/ui/input/input";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/user-context/user-context";
import Spinner from "../../components/ui/spinner/spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(UserContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if (!email || !emailRegex.test(email)) {
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

    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
          return;
        }
        handleUserLogin(data.token);
        toast.success("Se inicio sesión correctamente");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al iniciar sesión");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container-login">
      <div className="container-form">
        <Logo />
        <h1 className="login-title">Bienvenido de Nuevo</h1>
        <p>Planeá tus viajes de manera fácil y rápida</p>
        <form onSubmit={handleSubmit} action="">
          <div className="input-group">
            <label className="input-group-label" htmlFor="email">
              Email
            </label>
            <Input
              value={email}
              placeholder={"ej: alvaroreynoso@gmail.com"}
              id={"email"}
              onChange={handleEmailChange}
              className={`${errors.email ? "error" : ""}`}
              disabled={isLoading}
            />
            <p className="input-description">
              Ingrese un email que este en uso
            </p>
            {errors.email && (
              <p className="error-message">
                Por favor, ingrese un email válido
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <Input
              value={password}
              placeholder={"*************"}
              type="password"
              id={"password"}
              onChange={handlePasswordChange}
              className={`${errors.password ? "error" : ""}`}
              disabled={isLoading}
            />
            <div className="input-group-password">
              <p className="input-description">
                Debe contener al menos 8 caracteres
              </p>
              <a className="a-a" href="">
                Olvidé mi contraseña
              </a>
            </div>
            {errors.password && (
              <p className="error-message">Por favor, ingrese una contraseña</p>
            )}
          </div>

          <button
            type="submit"
            className="button button-primary"
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
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
