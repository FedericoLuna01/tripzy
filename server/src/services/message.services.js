import { Messages } from "../models/Messages.js";
import { Users } from "../models/Users.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Messages.findAll({
      include: [
        {
          model: Users,
          as: "sender",
          attributes: ["id", "name", "email", "imageUrl"],
          required: false,
        },
      ],
      order: [["timestamp", "DESC"]],
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error al obtener los mensajes" });
  }
};

export const getMessage = async (req, res) => {
  const { id } = req.params;
  const mensaje = await Messages.findByPk(id);

  if (!mensaje) {
    return res.status(404).json({
      message: "No se pudo encontrar el mensaje",
    });
  }

  res.json(mensaje);
};

export const postMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  try {
    const existingUser = await Users.findOne({
      where: { email },
    });

    const newMessage = await Messages.create({
      name,
      email,
      message,
      senderId: existingUser ? existingUser.id : null,
    });

    res.status(201).json({
      message: "Mensaje enviado correctamente",
      data: newMessage,
      isRegisteredUser: existingUser,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Error al crear el mensaje" });
  }
};

export const updateMessage = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "El cuerpo de la solicitud está vacío" });
  }

  const { id } = req.params;
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const updateMessage = await Messages.findByPk(id);

  if (!updateMessage) {
    return res.status(404).json({
      message: "Mensaje no encontrado",
    });
  }
  await updateMessage.update({
    name,
    email,
    message,
  });

  res.json({ message: "Mensaje actualizado" });
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  const deleteMessage = await Messages.findByPk(id);

  if (!deleteMessage) {
    return res.status(404).json({
      message: "No se encontro el mensaje",
    });
  }

  await deleteMessage.destroy();
  res.json({ message: "Mensaje borrado" });
};
