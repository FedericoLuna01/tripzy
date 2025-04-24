import { DotsThree, PencilSimple, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Input from "../../components/ui/input/input";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "../../components/ui/menu/menu";
import "./admin.css";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Error al cargar los usuarios");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    const user = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    if (!user.ok) {
      return toast.error("Error al eliminar el usuario");
    }

    setUsers((prev) => prev.filter((user) => user.id !== id));
    setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
    setIsOpen(false);
    toast.success("Usuario eliminado");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const usersFiltered = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setFilteredUsers(usersFiltered);
  };

  return (
    <section className="background">
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        onSubmit={() => handleDeleteUser(selectedUser.id)}
        entity={`usuario ${selectedUser?.name}`}
      />
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-users">
                    No hay usuarios que mostrar
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
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
                      <Menu>
                        <MenuButton className="options-button">
                          <DotsThree size={24} color="#000" />
                        </MenuButton>
                        <MenuItems
                          anchor="bottom end"
                          className="menu-items-admin"
                        >
                          <MenuItem>
                            <Link
                              className="menu-item-link"
                              to={`/admin/edit/${user.id}`}
                            >
                              <PencilSimple size={20} /> Editar
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <span
                              className="menu-item-link destructive"
                              onClick={() => handleOpen(user)}
                            >
                              <Trash size={20} /> Eliminar
                            </span>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;
