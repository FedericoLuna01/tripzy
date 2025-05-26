import React, { createRef, useState } from "react";
import Input from "../ui/input/input";
import "./form-home.css";
import toast from "react-hot-toast";
const FormHome = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    validName: false,
    validEmail: false,
    validMessage: false,
  });
  const inputNameRef = createRef();
  const inputEmailRef = createRef();
  const textAreaRef = createRef();

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

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      validMessage: false,
    }));
  };

  const isValidName = (name) => {
    return name.length > 4;
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidMessage = (message) => {
    return message.length > 8;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({
      validName: false,
      validEmail: false,
      validMessage: false,
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

    if (!isValidMessage(message)) {
      setErrors((prevErrors) => ({ ...prevErrors, validMessage: true }));
      if (!hasError) textAreaRef.current.focus();
      hasError = true;
    }

    if (hasError) return;

    try {
      fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success("Mensaje enviado correctamente!");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }

    setName("");
    setEmail("");
    setMessage("");
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
              Este nombre lo verá un admininstrador
            </p>
            {errors.validName && (
              <p className="error-message">
                El nombre debe tener al menos 4 carácteres
              </p>
            )}
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
              Este email lo verá un admininstrador
            </p>
            {errors.validEmail && (
              <p className="error-message">Ingrese un email válido</p>
            )}
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
            placeholder="Ej: Esta página se ve increíble!"
            onChange={handleMessageChange}
            value={message}
            ref={textAreaRef}
          ></textarea>
          <p className="input-description">
            Este mensaje lo verá un admininstrador
          </p>
          {errors.validMessage && (
            <p className="error-message">
              Ingrese un mensaje de más de 8 caracteres
            </p>
          )}
        </div>
        <button className="button button-primary form-button">Enviar</button>
      </form>
    </div>
  );
};
export default FormHome;
