import { FloppyDisk } from "phosphor-react";
import Input from "../../components/ui/input/input";
import "./admin-edit.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const AdminEdit = () => {
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputRoleRef = useRef(null);
  const inputStateRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");
  const [state, setState] = useState("active");
  const [errors, setErrors] = useState({
    invalidName: false,
    invalidEmail: false,
    invalidPassword: false,
    role: false,
    state: false,
  });
  const [user, setUser] = useState(null);
  const params = useParams();

  const getUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setRole(data.role);
        setState(data.status);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser(params.id);
  }, [params.id]);

  const invalidName = (name) => {
    return name.length >= 4;
  };

  const invalidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const invalidPassword = (password) => {
    return password.length >= 8;
  };

  const handleName = (e) => {
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      invalidName: false,
    }));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      invalidEmail: false,
    }));
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      invalidPassword: false,
    }));
  };

  const handleRole = (e) => {
    setRole(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      role: false,
    }));
  };

  const handleState = (e) => {
    setState(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      state: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      invalidName: false,
      invalidEmail: false,
      invalidPassword: false,
      role: false,
      state: false,
    });
    let hasError = false;

    if (invalidName(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, invalidName: true }));
      if (!hasError) inputNameRef.current.focus();
      hasError = true;
    }

    if (invalidEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, invalidEmail: true }));
      if (!hasError) inputEmailRef.current.focus();
      hasError = true;
    }

    if (invalidPassword(password)) {
      setErrors((prevErrors) => ({ ...prevErrors, invalidPassword: true }));
      if (!hasError) inputNameRef.current.focus();
      hasError = true;
    }

    if (!role) {
      setErrors((prevErrors) => ({ ...prevErrors, invalidNane: true }));
      if (!hasError) inputRoleRef.current.focus();
      hasError = true;
    }

    if (!state) {
      setErrors((prevErrors) => ({ ...prevErrors, state: true }));
      if (!hasError) inputRoleRef.current.focus();
      hasError = true;
    }
  };

  return (
    <section className="background">
      <div className="container">
        <div className="heading">
          <h1 className="title">Editar usuario</h1>
          <p>
            Aquí puedes editar la información del usuario. Puedes cambiar su
            nombre, email, rol y estado.
          </p>
        </div>
        <div className="card">
          <h2>Usuario</h2>
          {user?.name ? (
            <form action="" onSubmit={handleSubmit}>
              <div className="container-inputs">
                <div>
                  <label htmlFor="name">Nombre</label>
                  <Input
                    placeholder="John Doe"
                    ref={inputNameRef}
                    onChange={handleName}
                    value={name}
                    id="name"
                    className={errors.invalidName ? "error" : ""}
                  />
                  <p>Nombre del usuario</p>
                  {errors.invalidName && (
                    <p className="error-message">
                      El nombre debe tener al menos 4 caracteres
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Input
                    placeholder="johndoe@gmail.com"
                    ref={inputEmailRef}
                    onChange={handleEmail}
                    value={email}
                    id="email"
                    className={errors.invalidEmail ? "error" : ""}
                  />
                  <p>Email del usuario</p>
                  {errors.invalidEmail && (
                    <p className="error-message">El email debe ser valido</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Contraseña</label>
                  <Input
                    placeholder="************"
                    ref={inputPasswordRef}
                    onChange={handlePassword}
                    value={password}
                    id="password"
                    type="password"
                    className={errors.invalidPassword ? "error" : ""}
                  />
                  <p>Email del usuario</p>
                  {errors.invalidPassword && (
                    <p className="error-message">
                      La contraseña debe tener al menos 8 caracteres
                    </p>
                  )}
                </div>
                <div className="container-rol-status">
                  <label htmlFor="role">Rol</label>
                  <select
                    ref={inputRoleRef}
                    placeholder="Ingrese un rol"
                    id="role"
                    onChange={handleRole}
                    value={role}
                    className={`${errors.role ? "error select" : "select"}`}
                  >
                    <option value="owner">Dueño</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                  <p>El rol que quieras que tenga el usuario</p>
                  {errors.role && (
                    <p className="error-message">Debe elegir un rol</p>
                  )}
                </div>
                <div className="container-rol-status">
                  <label htmlFor="">Estado</label>
                  <select
                    ref={inputStateRef}
                    placeholder="Ingrese un estado"
                    id="state"
                    onChange={handleState}
                    value={state}
                    className={`${errors.state ? "error select" : "select"}`}
                  >
                    <option value="active">Activo</option>
                    <option value="blocked">Bloqueado</option>
                  </select>

                  <p className="description">Estado del usuario</p>
                  {errors.state && (
                    <p className="error-message">
                      El nombre debe tener al menos 4 caracteres
                    </p>
                  )}
                </div>
              </div>
              <button className="button button-primary button-save">
                Guardar <FloppyDisk size={20} />
              </button>
            </form>
          ) : (
            <p>No se encontro el usuario </p>
          )}
        </div>
      </div>
    </section>
  );
};

// TODO LUCHO: CAMBIAR TODOS LOS STATE POR STATUS , SOLO LA PALABRA MENOS EN EL USESTATE OBVIO

export default AdminEdit;
