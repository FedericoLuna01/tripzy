import { Users } from "../models/Users.js";
import { UserTrip } from "../models/UserTrip.js";

export const getAllUserTrip = async (req, res) => {
  try {
    const userTrips = await UserTrip.findAll();
    res.json(userTrips);
  } catch (error) {
    console.error("Error fetching user trips:", error);
    res.status(500).json({ message: "Error fetching user trips" });
  }
};

export const createUserTrip = async (req, res) => {
  const { email, tripId } = req.body;

  if (!email || !tripId) {
    return res.status(400).json({ message: "Email y tripId son requeridos" });
  }

  const user = await Users.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const existingUserTrip = await UserTrip.findOne({
    where: {
      userId: user.id,
      tripId,
    },
  });

  if (existingUserTrip) {
    return res.status(400).json({ message: "Usuario ya invitado" });
  }

  try {
    const userTrip = await UserTrip.create({
      userId: user.id,
      tripId,
    });

    // Incluir el usuario en la respuesta con el formato solicitado
    res.status(201).json({
      id: userTrip.id,
      role: userTrip.role,
      userId: userTrip.userId,
      tripId: userTrip.tripId,
      user,
    });
  } catch (error) {
    console.error("Error creating user trip:", error);
    res.status(500).json({ message: "Error creando user trip" });
  }
};

export const updateUserTrip = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role es requerido" });
  }

  const existingOwner = await UserTrip.findOne({
    where: {
      role: "owner",
    },
  });

  if (existingOwner) {
    return res
      .status(400)
      .json({ message: "No puede haber mas de un dueño", existingOwner: true });
  }

  try {
    const userTrip = await UserTrip.findByPk(id);

    if (!userTrip) {
      return res.status(404).json({ message: "User trip no encontrado" });
    }

    await userTrip.update({ role });

    res.json(userTrip);
  } catch (error) {
    console.error("Error updating user trip:", error);
    res.status(500).json({ message: "Error actualizando user trip" });
  }
};

export const deleteUserTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const userTrip = await UserTrip.findByPk(id);

    if (!userTrip) {
      return res.status(404).json({ message: "User trip no encontrado" });
    }

    await userTrip.destroy();

    res.json({ success: "User trip eliminado" });
  } catch (error) {
    console.error("Error deleting user trip:", error);
    res.status(500).json({ message: "Error eliminando user trip" });
  }
};
