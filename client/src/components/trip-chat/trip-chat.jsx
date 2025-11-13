import { useContext, useEffect, useRef, useState } from "react";
import { ChatCircle, PaperPlaneTilt, Smiley, User } from "phosphor-react";
import { UserContext } from "../../contexts/user-context/user-context";
import { useSocket } from "../../hooks/useSocket";
import Avatar from "../avatar/avatar";
import { formatFullDate } from "../../utils/utils";
import toast from "react-hot-toast";
import styles from "./trip-chat.module.css";

const TripChat = ({ trip }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const [typingUser, setTypingUser] = useState(null);
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const token = localStorage.getItem("token");
  const socket = useSocket(import.meta.env.VITE_BASE_SERVER_URL, token);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const handleTextareaChange = (e) => {
    setNewMessage(e.target.value);

    // Auto resize textarea
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;

    // Emitir evento de escritura
    if (socket && e.target.value.trim()) {
      socket.emit("typing", { tripId: trip.id, userName: user.name });

      // Limpiar timeout anterior
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Detener escritura después de 2 segundos de inactividad
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stop-typing", { tripId: trip.id });
      }, 2000);
    } else if (socket) {
      socket.emit("stop-typing", { tripId: trip.id });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const messageToSend = newMessage.trim();
    const tempId = `temp-${Date.now()}-${Math.random()}`;

    // Crear mensaje temporal para mostrar inmediatamente (Optimistic UI)
    const tempMessage = {
      id: tempId,
      message: messageToSend,
      timestamp: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        imageUrl: user.imageUrl,
      },
      userId: user.id,
      tripId: trip.id,
    };

    // Mostrar mensaje inmediatamente
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Detener indicador de escritura
    if (socket) {
      socket.emit("stop-typing", { tripId: trip.id });
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/trips/${trip.id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            message: messageToSend,
          }),
        }
      );

      if (response.ok) {
        const newMessageData = await response.json();

        // Reemplazar mensaje temporal con el real
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? newMessageData : msg))
        );

        console.log("✅ Mensaje enviado:", newMessageData);
      } else {
        // Remover mensaje temporal si falla
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
        toast.error("Error al enviar el mensaje");
        setNewMessage(messageToSend);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      // Remover mensaje temporal si falla
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      toast.error("Error al enviar el mensaje");
      setNewMessage(messageToSend);
    } finally {
      setIsLoading(false);
    }
  };

  // Load chat messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_SERVER_URL}/trips/${trip.id}/messages`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const messagesData = await response.json();
          setMessages(messagesData);
        } else {
          toast.error("Error al cargar los mensajes del chat");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Error al cargar los mensajes del chat");
      } finally {
        setIsLoadingChat(false);
      }
    };

    fetchMessages();
  }, [trip.id]);

  // Socket.IO: Unirse a la sala del viaje y escuchar eventos
  useEffect(() => {
    if (!socket) {
      console.log("⏳ Esperando conexión de Socket.IO...");
      return;
    }

    console.log("🔌 Socket conectado, uniéndose al viaje:", trip.id);

    // Unirse a la sala del viaje
    socket.emit("join-trip", trip.id);

    // Escuchar nuevos mensajes
    const handleNewMessage = (message) => {
      console.log("📩 Nuevo mensaje recibido:", message);
      setMessages((prev) => {
        // Si el mensaje ya existe (puede ser temporal o ya recibido), actualizarlo o ignorarlo
        const existingIndex = prev.findIndex((m) => m.id === message.id);
        if (existingIndex !== -1) {
          const newMessages = [...prev];
          newMessages[existingIndex] = message;
          return newMessages;
        }

        // Si no existe, agregarlo (evitando duplicados por ID temporal)
        if (prev.some((m) => m.id === message.id)) {
          return prev;
        }
        return [...prev, message];
      });
    };

    // Escuchar mensajes eliminados
    const handleMessageDeleted = ({ messageId }) => {
      console.log("🗑️ Mensaje eliminado:", messageId);
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    };

    // Escuchar cuando alguien está escribiendo
    const handleUserTyping = ({ userName }) => {
      if (userName !== user.name) {
        console.log("✍️ Usuario escribiendo:", userName);
        setTypingUser(userName);
      }
    };

    // Escuchar cuando alguien deja de escribir
    const handleUserStopTyping = () => {
      console.log("✍️ Usuario dejó de escribir");
      setTypingUser(null);
    };

    socket.on("new-message", handleNewMessage);
    socket.on("message-deleted", handleMessageDeleted);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stop-typing", handleUserStopTyping);

    // Cleanup
    return () => {
      console.log("🔌 Limpiando eventos de Socket.IO");
      socket.emit("leave-trip", trip.id);
      socket.off("new-message", handleNewMessage);
      socket.off("message-deleted", handleMessageDeleted);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stop-typing", handleUserStopTyping);
    };
  }, [socket, trip.id, user.name]);

  const isMyMessage = (message) => message.user.id === user.id;

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return formatFullDate(timestamp);
  };

  return (
    <div className={`card ${styles["chat-container"]}`}>
      <div className={styles["chat-header"]}>
        <div className={styles["header-content"]}>
          <ChatCircle size={24} className="icon-svg" />
          <h3>Chat del viaje</h3>
        </div>
        <div className={styles["members-count"]}>
          {trip.tripUsers.length} miembros
        </div>
      </div>

      <div className={styles["messages-container"]}>
        {isLoadingChat ? (
          <div className={styles["loading-state"]}>
            <div className={styles["loading-spinner"]}></div>
            <p>Cargando mensajes...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className={styles["empty-state"]}>
            <Smiley size={48} className="icon-svg" />
            <p>No hay mensajes aún</p>
            <span>¡Sé el primero en escribir algo!</span>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const showAvatar =
                index === 0 || messages[index - 1].user.id !== message.user.id;

              const isLast =
                index === messages.length - 1 ||
                messages[index + 1]?.user.id !== message.user.id;

              return (
                <div
                  key={message.id}
                  className={`${styles["message-group"]} ${
                    isMyMessage(message)
                      ? styles["my-message"]
                      : styles["other-message"]
                  }`}
                >
                  {!isMyMessage(message) && showAvatar && (
                    <div className={styles["message-avatar"]}>
                      {message.user.imageUrl ? (
                        <Avatar user={message.user} />
                      ) : (
                        <div className={`avatar ${styles["default-avatar"]}`}>
                          <User size={20} />
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles["message-content"]}>
                    {!isMyMessage(message) && showAvatar && (
                      <div className={styles["sender-name"]}>
                        {message.user.name}
                      </div>
                    )}

                    <div
                      className={`${styles["message-bubble"]} ${
                        isMyMessage(message)
                          ? styles["my-bubble"]
                          : styles["other-bubble"]
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>

                    {isLast && (
                      <div
                        className={`${styles["message-time"]} ${
                          isMyMessage(message)
                            ? styles["time-right"]
                            : styles["time-left"]
                        }`}
                      >
                        {formatMessageTime(message.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}

        {/* Indicador de escritura */}
        {typingUser && (
          <div className={styles["typing-indicator"]}>
            <span>{typingUser} está escribiendo</span>
            <span className={styles["typing-dots"]}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
      </div>

      <div className={styles["message-input-container"]}>
        <div className={styles["input-wrapper"]}>
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className={`textarea ${styles["message-input"]}`}
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            className={`button ${styles["send-button"]} ${
              !newMessage.trim() || isLoading
                ? styles["send-disabled"]
                : "button-primary"
            }`}
            title="Enviar mensaje"
          >
            <PaperPlaneTilt size={17.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripChat;
