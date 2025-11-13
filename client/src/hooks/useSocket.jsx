import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverUrl, token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!serverUrl) {
      console.error("❌ VITE_BASE_SERVER_URL no está configurado");
      return;
    }

    if (!token) {
      console.warn("⚠️ No hay token de autenticación, esperando login...");
      return;
    }

    console.log("🔌 Conectando a Socket.IO...");
    console.log("   📍 URL:", serverUrl);
    console.log("   🔑 Token:", token.substring(0, 20) + "...");

    // Crear conexión de socket
    const newSocket = io(serverUrl, {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    newSocket.on("connect", () => {
      console.log("✅ Conectado al servidor de Socket.IO");
      console.log("   🆔 Socket ID:", newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Error de conexión Socket.IO:", error.message);

      if (error.message.includes("Authentication")) {
        console.error("   🔐 Problema de autenticación:");
        console.error("   - Verifica que el token sea válido");
        console.error(
          "   - Verifica que JWT_SECRET esté configurado en el servidor"
        );
        console.error("   - Intenta cerrar sesión y volver a iniciar sesión");
      } else {
        console.error("   🔌 Problema de conexión:");
        console.error("   - Verifica que el servidor esté corriendo");
        console.error("   - Verifica VITE_BASE_SERVER_URL en .env");
      }
    });

    newSocket.on("disconnect", (reason) => {
      console.log("🔌 Desconectado del servidor de Socket.IO:", reason);
      setSocket(null);
    });

    newSocket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 Intento de reconexión #${attemptNumber}`);
    });

    newSocket.on("reconnect", (attemptNumber) => {
      console.log(`✅ Reconectado después de ${attemptNumber} intentos`);
    });

    // Cleanup al desmontar
    return () => {
      console.log("🔌 Cerrando conexión Socket.IO");
      newSocket.disconnect();
      setSocket(null);
    };
  }, [serverUrl, token]);

  return socket;
};
