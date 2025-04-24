import { FloppyDisk } from "phosphor-react";
import Input from "../../components/ui/input/input";
import "./admin-edit.css";
import { useRef, useState } from "react";

const AdminEdit = () => {
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputRoleRef = useRef(null);
  const inputStateRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    role: false,
    state: false,
  });

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    const Email = e.target.value;
    setEmail(Email);
    setErrors({ ...errors, email: Email.length < 10 });
  };

  const handlePassword = (e) => {
    const Password = e.target.value;
    setPassword(Password);
    setErrors({
      ...errors,
      tripStart: Password < new Date().toISOString().split("T")[0],
    });
  };

  const handleRole = (e) => {
    const Role = e.target.value;
    setRole(e.target.checked);
  };

  const handleState = (e) => {
    const State = e.target.value;
    setState(e.target.checked);
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
          <form action="">
            <div className="container-inputs">
              <div>
                <label htmlFor="name">Nombre</label>
                <Input
                  placeholder="John Doe"
                  ref={inputNameRef}
                  onChange={handleName}
                  value={name}
                  id="name"
                  className={errors.name ? "error" : ""}
                />
                <p>Nombre del usuario</p>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  placeholder="johndoe@gmail.com"
                  ref={inputEmailRef}
                  onChange={handleEmail}
                  value={email}
                  id="email"
                  className={errors.email ? "error" : ""}
                />
                <p>Email del usuario</p>
                {errors.email && (
                  <p className="error-message">
                    La descripción debe contener al menos 10 caracteres
                  </p>
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
                  className={errors.password ? "error" : ""}
                />
                <p>Email del usuario</p>
                {errors.password && (
                  <p className="error-message">
                    La descripción debe contener al menos 10 caracteres
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
                  className="select"
                >
                  <option value="owner">Dueño</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>

                <p>El rol que quieras que tenga el usuario</p>
              </div>

              <div className="container-rol-status">
                <label htmlFor="">Estado</label>
                <select
                  ref={inputStateRef}
                  placeholder="Ingrese un estado"
                  id="state"
                  onChange={handleState}
                  value={state}
                  className="select"
                >
                  <option value="active">Activo</option>
                  <option value="blocked">Bloqueado</option>
                </select>

                <p className="description">Estado del usuario</p>
              </div>
            </div>

            <button className="button button-primary button-save">
              Guardar <FloppyDisk size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminEdit;
