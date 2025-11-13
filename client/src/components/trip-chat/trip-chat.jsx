import { useContext, useEffect, useRef, useState } from "react";
import { ChatCircle, PaperPlaneTilt, Smiley, User } from "phosphor-react";
import { UserContext } from "../../contexts/user-context/user-context";
import Avatar from "../avatar/avatar";
import { formatFullDate } from "../../utils/utils";
import toast from "react-hot-toast";
import styles from "./trip-chat.module.css";

const TripChat = ({ trip }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

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
    setNewMessage("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
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
        setMessages((prev) => [...prev, newMessageData]);
      } else {
        toast.error("Error al enviar el mensaje");
        setNewMessage(messageToSend);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error al enviar el mensaje");
      // Restore message if failed
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
