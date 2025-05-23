import React, { createRef, useState } from "react";
import Input from "../ui/input/input";
import "./form-home.css";
const FormHome = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    validName: false,
    validEmail: false,
    repeatedEmail: false,
    passwordRepeat: false,
    validPassword: false,
    samePassword: false,
  });
  const inputNameRef = createRef();
  const inputEmailRef = createRef();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({
      validName: isValidName(name),
      validEmail: isValidEmail(email),
    });
  };

  return (
    <div className="home-form-container">
      <form action="" className="card form-container" onSubmit={handleSubmit}>
        <div className="form-first-section">
          <div className="input-group full">
            <label className="input-group-label" htmlFor="nombre">
              Nombre
            </label>
            <Input
              ref={inputNameRef}
              placerholder={"ej: John Doe"}
              id={"nombre"}
              onChange={handleNameChange}
              value={name}
              className={`input-form-section ${
                errors.name || errors.validName ? "error" : ""
              }`}
            />
            <p className="input-description">
              Este nombre lo vera un admininstrador
            </p>
          </div>
          <div className="input-group full">
            <label className="input-group-label" htmlFor="nombre">
              Email
            </label>
            <Input
              ref={inputEmailRef}
              placerholder={"ej: John Doe"}
              id={"nombre"}
              onChange={handleEmailChange}
              value={email}
              className={`input-form-section ${
                errors.name || errors.validName ? "error" : ""
              }`}
            />
            <p className="input-description">
              Este email lo vera un admininstrador
            </p>
          </div>
        </div>
        <div className="input-group">
          <label className="input-group-label" htmlFor="mensaje">
            Ingrese su mensaje
          </label>
          <textarea
            rows={6}
            className="textarea"
            name="mensaje"
            id="mensaje"
            placeholder=""
          ></textarea>
        </div>
        <button className="button button-primary form-button">Enviar</button>
      </form>
    </div>
  );
};
export default FormHome;
