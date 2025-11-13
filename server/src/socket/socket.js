import jwt from "jsonwebtoken";

export const setupSocketIO = (io) => {
  // Middleware para autenticación
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.error("❌ Socket.IO: No se proporcionó token");
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;

      if (!secret) {
        console.error("❌ Socket.IO: JWT_SECRET no está configurado en .env");
        return next(new Error("Server configuration error"));
      }

      const decoded = jwt.verify(token, secret);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;

      console.log(`✅ Token validado para usuario: ${decoded.id}`);
      next();
    } catch (error) {
      console.error("❌ Socket.IO: Error al verificar token:", error.message);
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.userId}`);

    // Unirse a la sala del viaje
    socket.on("join-trip", (tripId) => {
      socket.join(`trip-${tripId}`);
      console.log(`Usuario ${socket.userId} se unió al trip ${tripId}`);
    });

    // Salir de la sala del viaje
    socket.on("leave-trip", (tripId) => {
      socket.leave(`trip-${tripId}`);
      console.log(`Usuario ${socket.userId} salió del trip ${tripId}`);
    });

    // Usuario está escribiendo
    socket.on("typing", ({ tripId, userName }) => {
      socket.to(`trip-${tripId}`).emit("user-typing", { userName });
    });

    // Usuario dejó de escribir
    socket.on("stop-typing", ({ tripId }) => {
      socket.to(`trip-${tripId}`).emit("user-stop-typing");
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.userId}`);
    });
  });

  return io;
};

// Función auxiliar para emitir mensajes nuevos (excepto al emisor)
export const emitNewMessage = (io, tripId, message, excludeUserId = null) => {
  console.log(`📤 Emitiendo nuevo mensaje al trip-${tripId}:`, message.id);

  if (excludeUserId) {
    // Emitir a todos en la sala EXCEPTO al usuario que envió el mensaje
    io.sockets.sockets.forEach((socket) => {
      if (
        socket.userId !== excludeUserId &&
        socket.rooms.has(`trip-${tripId}`)
      ) {
        socket.emit("new-message", message);
      }
    });
    console.log(
      `✅ Mensaje emitido a la sala trip-${tripId} (excluyendo usuario ${excludeUserId})`
    );
  } else {
    // Emitir a todos en la sala
    io.to(`trip-${tripId}`).emit("new-message", message);
    console.log(`✅ Mensaje emitido a la sala trip-${tripId}`);
  }
};

// Función auxiliar para emitir mensaje eliminado
export const emitDeletedMessage = (io, tripId, messageId) => {
  console.log(`🗑️ Emitiendo mensaje eliminado al trip-${tripId}:`, messageId);
  io.to(`trip-${tripId}`).emit("message-deleted", { messageId });
  console.log(`✅ Evento de eliminación emitido a la sala trip-${tripId}`);
};
