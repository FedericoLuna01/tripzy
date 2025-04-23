import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import "./register.css";
import Logo from "../../components/ui/logo/logo";
import Input from "../../components/ui/input/input";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errors, setErrors] = useState({
    validName: false,
    validEmail: false,
    repeatedEmail: false,
    passwordRepeat: false,
    validPassword: false,
    samePassword: false,
  });
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputPasswordRepeatRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      validName: false,
    }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      validEmail: false,
      repeatedEmail: false,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      validPassword: false,
    }));
  };

  const handlePasswordRepeatChange = (event) => {
    setPasswordRepeat(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordRepeat: false,
      samePassword: false,
    }));
  };

  const isValidName = (name) => {
    return name.length > 4;
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isSamePassword = (password, passwordRepeat) => {
    return password === passwordRepeat;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({
      validName: false,
      validEmail: false,
      repeatedEmail: false,
      passwordRepeat: false,
      validPassword: false,
      samePassword: false,
    });
    let hasError = false;
    if (!isValidName(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, validName: true }));
      if (!hasError) inputNameRef.current.focus();
      hasError = true;
    }

    if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, validEmail: true }));
      if (!hasError) inputEmailRef.current.focus();
      hasError = true;
    }

    if (!isValidPassword(password)) {
      setErrors((prevErrors) => ({ ...prevErrors, validPassword: true }));
      if (!hasError) inputPasswordRef.current.focus();
      hasError = true;
    }

    if (!isSamePassword(password, passwordRepeat)) {
      setErrors((prevErrors) => ({ ...prevErrors, samePassword: true }));
      if (!hasError) inputPasswordRepeatRef.current.focus();
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("Registrado correctamente!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-register">
      <div className="container-form">
        <Logo />
        <h1 className="register-title">Crea tu cuenta</h1>
        <p>Planea tus viajes de manera fácil y rápida</p>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <Input
              ref={inputNameRef}
              placeholder={"ej: John Doe"}
              id={"name"}
              onChange={handleNameChange}
              value={name}
              className={`${errors.name || errors.validName ? "error" : ""}`}
            />
            <p className="name-description">
              Este nombre es publico en la pagina
            </p>
            {errors.validName && (
              <p className="error-message">
                {" "}
                El nombre debe tener al menos 4 caracteres
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <Input
              ref={inputEmailRef}
              placeholder={"ej: alvaroreynoso@gmail.com"}
              onChange={handleEmailChange}
              value={email}
              id={"email"}
              className={`${errors.validEmail ? "error" : ""}`}
            />
            <p className="input-description">
              Ingrese un email que no este en uso
            </p>
            {errors.validEmail && (
              <p className="error-message">
                Por favor, ingrese un email valido
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <Input
              ref={inputPasswordRef}
              placeholder={"*************"}
              type={"password"}
              id={"password"}
              onChange={handlePasswordChange}
              value={password}
              className={`${errors.validPassword ? "error" : ""}`}
            />
            <div className="input-group">
              <p className="input-description">
                Debe contener al menos 8 caracteres
              </p>
              {errors.validPassword && (
                <p className="error-message">
                  La contraseña debe tener al menos 8 caracteres
                </p>
              )}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="repeatPassword">Repetir contraseña</label>
            <Input
              ref={inputPasswordRepeatRef}
              placeholder={"*************"}
              type={"password"}
              onChange={handlePasswordRepeatChange}
              value={passwordRepeat}
              id={"repeatPassword"}
              className={`${
                errors.validPassword || errors.samePassword ? "error" : ""
              }`}
            />
            <p className="input-description">
              Ingrese nuevamente su contraseña
            </p>
            {errors.passwordRepeat && (
              <p className="error-message">Repita su contraseña</p>
            )}
            {errors.samePassword && (
              <p className="error-message">Las contraseñas deben coincidir</p>
            )}
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
