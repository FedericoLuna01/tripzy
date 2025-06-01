import { DotsThree, Lock, LockOpen, PencilSimple, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Skeleton from "../../components/ui/skeleton/skeleton";
import Input from "../../components/ui/input/input";
import Avatar from "../../components/avatar/avatar";
import useModal from "../../hooks/useModal";
import {
  Modal,
  ModalDescription,
  ModalTitle,
} from "../../components/modal/modal";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "../../components/ui/menu/menu";
import "./admin-users.css";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { handleClose, handleOpen, isOpen } = useModal();

  const getUsers = () => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Error al cargar los usuarios");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (selectedUser) => {
    if (!selectedUser) {
      return toast.error("No se ha seleccionado ningún usuario");
    }

    if (selectedUser.role === "superadmin") {
      return toast.error("No puedes eliminar a un usuario administrador");
    }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_SERVER_URL}/users/${selectedUser.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      return toast.error("Error al eliminar el usuario");
    }

    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
    setFilteredUsers((prev) =>
      prev.filter((user) => user.id !== selectedUser.id)
    );
    handleClose();
    toast.success("Usuario eliminado");
  };

  const handleBlockUser = (user) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...user,
        status: user.status === "active" ? "blocked" : "active",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }

        setUsers((prev) =>
          prev.map((u) =>
            u.id === data.id ? { ...u, status: data.status } : u
          )
        );

        setFilteredUsers((prev) =>
          prev.map((u) =>
            u.id === data.id ? { ...u, status: data.status } : u
          )
        );

        toast.success(
          `Usuario ${data.name} ${
            data.status === "active" ? "desbloqueado" : "bloqueado"
          }`
        );
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
        toast.error("Error al bloquear el usuario");
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const usersFiltered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(usersFiltered);
  };

  return (
    <section className="background">
      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setSelectedUser(null);
          handleClose();
        }}
        onSubmit={() => handleDeleteUser(selectedUser)}
      >
        <ModalTitle>Eliminar usuario {selectedUser?.name}</ModalTitle>
        <ModalDescription>
          ¿Estás seguro de que deseas eliminar al usuario {selectedUser?.name}?
          Esta acción no se puede deshacer.
        </ModalDescription>
      </Modal>
      <div>
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width="150px" height="20px" />
                    </td>
                    <td>
                      <Skeleton width="200px" height="20px" />
                    </td>
                    <td>
                      <Skeleton width="100px" height="20px" />
                    </td>
                    <td>
                      <Skeleton width="100px" height="20px" />
                    </td>
                    <td>
                      <Skeleton width="50px" height="20px" />
                    </td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
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
                          <DotsThree size={24} />
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
                              className={`menu-item-link ${
                                user.status === "active" ? "destructive" : ""
                              }`}
                              onClick={() => {
                                handleBlockUser(user);
                              }}
                            >
                              {user.status === "active" ? (
                                <>
                                  <Lock size={20} />
                                  Bloquear
                                </>
                              ) : (
                                <>
                                  <LockOpen size={20} />
                                  Desbloquear
                                </>
                              )}
                            </span>
                          </MenuItem>
                          <MenuItem>
                            <span
                              className="menu-item-link destructive"
                              onClick={() => {
                                setSelectedUser(user);
                                handleOpen();
                              }}
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

export default AdminUsers;
