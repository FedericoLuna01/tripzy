import React from "react";
import Input from "../../components/ui/input/input";
import { USERS_AVATARS } from "../../data/data";
import { DotsThree } from "phosphor-react";
import "./admin.css";
import Avatar from "../../components/avatar/avatar";
const Admin = () => {
  return (
    <div className="container">
      <div className="container-title">
        <h1>Lista de Usuarios</h1>
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
            {USERS_AVATARS.map((user) => (
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
  );
};

export default Admin;
