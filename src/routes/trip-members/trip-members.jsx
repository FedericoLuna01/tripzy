import { USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import { Plus, Trash } from "phosphor-react";
import "./trip-members.css";

export const TripMembers = () => {
  return (
    <div className="card members-container">
      <h3>Gestioná tus amigos</h3>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <div className="container-input">
            <Input id="email" />
            <button className="button button-secondary">
              Invitar <Plus size={20} />{" "}
            </button>
          </div>

          <p>Ingresá el email de la persona que quieras invitar</p>
        </div>
      </form>
      <div className="card-container">
        {new Array(4).fill(0).map((_, index) => (
          <div className="card user-card no-shadow column" key={index}>
            <div className="info-user">
              <Avatar user={USERS_AVATARS[0]} />
              <div>
                <p className="name">Alvaro Reynoso</p>
                <p className="email">alvaroreynoso69@gmail.com</p>
              </div>
            </div>
            <form action="">
              <label htmlFor="">Rol</label>
              <select name="" id="" className="select">
                <option value="owner">Dueño</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
              <button className="button button-destructive">
                Eliminar <Trash size={20} />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};
