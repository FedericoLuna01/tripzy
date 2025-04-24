import { FloppyDisk } from "phosphor-react";
import Input from "../../components/ui/input/input";
import "./admin-edit.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";

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
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({
    invalidName: false,
    invalidEmail: false,
    invalidPassword: false,
    role: false,
    status: false,
  });
  const [user, setUser] = useState(null);
  const params = useParams();

  const putUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success("Usuario editado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setRole(data.role);
        setStatus(data.status);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser(params.id);
  }, [params.id]);

  const invalidName = (name) => {
    return name.length < 4;
  };

  const invalidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email);
  };

  const invalidPassword = (password) => {
    return password.length < 8;
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
    setStatus(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      status: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      invalidName: false,
      invalidEmail: false,
      invalidPassword: false,
      role: false,
      status: false,
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
      setErrors((prevErrors) => ({ ...prevErrors, role: true }));
      if (!hasError) inputRoleRef.current.focus();
      hasError = true;
    }

    if (!status) {
      setErrors((prevErrors) => ({ ...prevErrors, status: true }));
      if (!hasError) inputRoleRef.current.focus();
      hasError = true;
    }

    console.log({ name, email, password, role, status });
    if (hasError) return;

    putUser(user.id);
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
                    <option value="superAdmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="usuario">Usuario</option>
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
                    value={status}
                    className={`${errors.status ? "error select" : "select"}`}
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

export default AdminEdit;
