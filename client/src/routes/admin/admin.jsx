import React, { useState } from "react";
import { DotsThree } from "phosphor-react";
import "./admin.css";
import { USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";

const Admin = () => {
  const [users, setUsers] = useState(USERS_AVATARS);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredUsers = USERS_AVATARS.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
  };

  return (
    <section className="admin-section">
      <div className="container">
        <div className="container-title">
          <h1 className="title">Lista de Usuarios</h1>
          <p>
            Aquí puedes ver la lista de usuarios registrados en la aplicación.
          </p>
        </div>
        <div className="input-container">
          <Input
            placeholder="Buscar nombre..."
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <Avatar user={user} />
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="options-button">
                      <DotsThree size={24} color="#000" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;
