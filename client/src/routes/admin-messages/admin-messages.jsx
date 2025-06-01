import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../../components/ui/input/input";
import { formatFullDate } from "../../utils/utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "../../components/ui/menu/menu";
import { DotsThree, Trash, Eye } from "phosphor-react";
import { Link } from "react-router";
import useModal from "../../hooks/useModal";
import {
  Modal,
  ModalDescription,
  ModalTitle,
} from "../../components/modal/modal";
import Skeleton from "../../components/ui/skeleton/skeleton";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleOpen, handleClose, isOpen } = useModal();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const messagesFiltered = messages.filter((message) =>
      message.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMessages(messagesFiltered);
  };

  const handleDeleteMessage = async (id) => {
    const message = await fetch(
      `${import.meta.env.VITE_BASE_SERVER_URL}/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!message.ok) {
      return toast.error("Error al eliminar el mensaje");
    }

    setMessages((prev) => prev.filter((message) => message.id !== id));
    setFilteredMessages((prev) => prev.filter((message) => message.id !== id));
    handleClose();
    toast.success("Mensaje eliminado");
  };

  const getMessages = () => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setFilteredMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        toast.error("Error al cargar los mensajes");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section>
      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setSelectedMessage(null);
          handleClose();
        }}
        onSubmit={() => handleDeleteMessage(selectedMessage.id)}
      >
        <ModalTitle>Eliminar mensaje de {selectedMessage?.email}</ModalTitle>
        <ModalDescription>
          ¿Estás seguro de que deseas eliminar este mensaje? Esta acción no se
          puede deshacer.
        </ModalDescription>
      </Modal>
      <div className="container-title">
        <h1 className="title">Lista de mensajes</h1>
        <p>Aquí puedes ver todos los mensajes enviados por los usuarios.</p>
      </div>
      <div className="input-container">
        <Input
          placeholder="Buscar email..."
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
              <th>Mensaje</th>
              <th>Fecha de envió</th>
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
                    <Skeleton width="250px" height="20px" />
                  </td>
                  <td>
                    <Skeleton width="150px" height="20px" />
                  </td>
                  <td>
                    <Skeleton width="50px" height="20px" />
                  </td>
                </tr>
              ))
            ) : filteredMessages.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-trips">
                  No hay mensajes que mostrar
                </td>
              </tr>
            ) : (
              filteredMessages.map((message) => (
                <tr key={message.id}>
                  <td>
                    {message.senderId ? (
                      <Link
                        className="menu-item-link"
                        to={`/user/${message.senderId}`}
                      >
                        {message.name}
                      </Link>
                    ) : (
                      message.name
                    )}
                  </td>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                  <td>{formatFullDate(message.timestamp)}</td>
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
                          <span
                            className="menu-item-link destructive"
                            onClick={() => {
                              setSelectedMessage(message);
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
    </section>
  );
};

export default AdminMessages;
