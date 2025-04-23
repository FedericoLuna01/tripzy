import { FloppyDisk } from "phosphor-react";
import Input from "../../components/ui/input/input";
import "./admin-edit.css";

const AdminEdit = () => {
  return (
    <section className=" background">
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
            <div>
              <label htmlFor="name">Nombre</label>
              <Input id="name" />
              <p className="description">Nombre del usuario</p>
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
