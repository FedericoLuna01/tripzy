import { TripChatMessages } from "../models/TripChatMessages.js";
import { Users } from "../models/Users.js";
import { Trips } from "../models/Trips.js";
import { UserTrip } from "../models/UserTrip.js";
import { checkTripPermissions } from "../utils/checkTripPermissions.js";

export const getTripChatMessages = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user?.id;

    // Add validation for userId
    if (!userId) {
      console.error("getTripChatMessages: userId is undefined", {
        user: req.user,
      });
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    // Check if user has access to this trip
    const hasAccess = await checkTripPermissions(userId, tripId, req.user.role);
    if (!hasAccess) {
      return res.status(403).json({
        message: "No tienes acceso a este chat",
      });
    }

    const messages = await TripChatMessages.findAll({
      where: { tripId },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "imageUrl"],
        },
      ],
      order: [["timestamp", "ASC"]],
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({
      message: "Error al obtener los mensajes del chat",
    });
  }
};

export const sendTripChatMessage = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { message } = req.body;
    const userId = req.user?.id;

    // Add validation for userId
    if (!userId) {
      console.error("sendTripChatMessage: userId is undefined", {
        user: req.user,
      });
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    // Add validation for tripId
    if (!tripId) {
      console.error("sendTripChatMessage: tripId is undefined", {
        params: req.params,
      });
      return res.status(400).json({
        message: "ID del viaje requerido",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "El mensaje no puede estar vacío",
      });
    }

    // Check if user has access to this trip
    const hasAccess = await checkTripPermissions(userId, tripId, req.user.role);
    if (!hasAccess) {
      return res.status(403).json({
        message: "No tienes acceso a este chat",
      });
    }

    const newMessage = await TripChatMessages.create({
      message: message.trim(),
      userId,
      tripId,
    });

    const messageWithUser = await TripChatMessages.findByPk(newMessage.id, {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "imageUrl"],
        },
      ],
    });

    res.status(201).json(messageWithUser);
  } catch (error) {
    console.error("Error sending chat message:", error);
    res.status(500).json({
      message: "Error al enviar el mensaje",
    });
  }
};

export const deleteTripChatMessage = async (req, res) => {
  try {
    const { tripId, messageId } = req.params;
    const userId = req.user?.id;

    // Add validation for userId
    if (!userId) {
      console.error("deleteTripChatMessage: userId is undefined", {
        user: req.user,
      });
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    // Check if user has access to this trip
    const hasAccess = await checkTripPermissions(userId, tripId, req.user.role);
    if (!hasAccess) {
      return res.status(403).json({
        message: "No tienes acceso a este chat",
      });
    }

    const message = await TripChatMessages.findByPk(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Mensaje no encontrado",
      });
    }

    // Only allow user to delete their own messages or admins
    if (message.userId !== userId && !req.user.role.includes("admin")) {
      return res.status(403).json({
        message: "No puedes eliminar este mensaje",
      });
    }

    await message.destroy();
    res.json({ message: "Mensaje eliminado correctamente" });
  } catch (error) {
    console.error("Error deleting chat message:", error);
    res.status(500).json({
      message: "Error al eliminar el mensaje",
    });
  }
};
