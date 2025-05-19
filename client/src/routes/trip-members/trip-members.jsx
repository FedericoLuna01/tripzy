import { USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import { Plus, Trash } from "phosphor-react";
import "./trip-members.css";
import React, { useState } from "react";
import Modal from "../../components/modal/modal";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";

const TripMembers = () => {
  const [users, setUsers] = useState(USERS_AVATARS);
  const [selectedUser, setSelectedUser] = useState(null);
  const { handleClose, handleOpen, isOpen } = useModal();

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    handleOpen();
    toast.success("Usuario eliminado del viaje");
  };

  return (
    <>
      <div className="card members-container">
        <h3>Gestioná tus amigos</h3>
        <form action="">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="container-input">
              <Input id="email" />
              <button className="button button-secondary">
                Invitar <Plus size={20} />{" "}
              </button>
            </div>
            <p className="input-description">
              Ingresá el email de la persona que quieras invitar
            </p>
          </div>
        </form>
        <div className="card-container">
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <Modal
                entity={`el usuario ${selectedUser?.name || ""}`}
                onSubmit={() => handleDeleteUser(selectedUser?.id)}
                isOpen={isOpen}
                handleClose={() => {
                  handleClose();
                  setSelectedUser(null);
                }}
              />
              <div className="card user-card no-shadow column">
                <div className="info-user">
                  <Avatar user={user} />
                  <div>
                    <p className="name">{user.name}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </div>
                <form action="">
                  <label htmlFor="">Rol</label>
                  <select name="" id="" className="select">
                    <option value="owner">Dueño</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                  <button
                    type="button"
                    className="button button-destructive"
                    onClick={() => {
                      setSelectedUser(user);
                      handleOpen();
                    }}
                  >
                    Eliminar <Trash size={20} />
                  </button>
                </form>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripMembers;
