import { ArrowLeft, FloppyDisk } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import "./admin-edit.css";
import Input from "../../components/ui/input/input";

const AdminEdit = () => {
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputRoleRef = useRef(null);
  const inputStateRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({
    invalidName: false,
    invalidEmail: false,
    role: false,
    status: false,
  });
  const [user, setUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const putUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          email,
          role,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success("Usuario editado correctamente");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
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

    if (hasError) return;

    putUser(user.id);
  };

  return (
    <section className="background">
      <div className="container">
        <div className="heading">
          <Link to={`/admin`}>
            <button className="button button-outline">
              Volver <ArrowLeft size={20} />
            </button>
          </Link>
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
                <div className="input-group">
                  <label htmlFor="name">Nombre</label>
                  <Input
                    placeholder="John Doe"
                    ref={inputNameRef}
                    onChange={handleName}
                    value={name}
                    id="name"
                    className={errors.invalidName ? "error" : ""}
                  />
                  <p className="input-description">Nombre del usuario</p>
                  {errors.invalidName && (
                    <p className="error-message">
                      El nombre debe tener al menos 4 caracteres
                    </p>
                  )}
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    placeholder="johndoe@gmail.com"
                    ref={inputEmailRef}
                    onChange={handleEmail}
                    value={email}
                    id="email"
                    className={errors.invalidEmail ? "error" : ""}
                  />
                  <p className="input-description">Email del usuario</p>
                  {errors.invalidEmail && (
                    <p className="error-message">El email debe ser valido</p>
                  )}
                </div>
                <div className="container-rol-status input-group">
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
                    <option value="user">Usuario</option>
                  </select>
                  <p className="input-description">
                    El rol que quieras que tenga el usuario
                  </p>
                  {errors.role && (
                    <p className="error-message">Debe elegir un rol</p>
                  )}
                </div>
                <div className="container-rol-status input-group">
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

                  <p className="input-description">Estado del usuario</p>
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
            <p>No se encontró el usuario </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminEdit;
