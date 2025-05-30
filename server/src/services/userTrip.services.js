import { UserRole, UserStatus, UserTripRole } from "../enums/enums.js";
import { Users } from "../models/Users.js";
import { UserTrip } from "../models/UserTrip.js";
import { checkTripPermissions } from "../utils/checkTripPermissions.js";

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
    return res.status(400).json({ message: "Email es requerido" });
  }

  try {
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.status === UserStatus.BLOCKED) {
      return res.status(403).json({ message: "Usuario bloqueado" });
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

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.EDITOR, UserTripRole.OWNER],
      tripId
    );

    if (!hasPermissions) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para invitar a un usuario" });
    }

    const userTrip = await UserTrip.create({
      userId: user.id,
      tripId,
    });

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
  const { role, tripId } = req.body;

  if (!role || !tripId) {
    return res.status(400).json({ message: "Role y tripId son requeridos" });
  }

  try {
    const authenticatedUser = await UserTrip.findOne({
      where: {
        userId: req.user.id,
        tripId,
      },
    });

    if (!authenticatedUser) {
      return res
        .status(403)
        .json({ message: "No tienes un rol asignado en este viaje" });
    }

    // Validar permisos según el rol
    if (authenticatedUser.role === UserTripRole.VIEWER) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para realizar esta acción" });
    }

    const existingOwner = await UserTrip.findOne({
      where: {
        role: "owner",
        tripId,
      },
    });

    const userTrip = await UserTrip.findByPk(id);

    if (!userTrip) {
      return res.status(404).json({ message: "User trip no encontrado" });
    }

    // Bloquear que un owner pierda su rol
    if (userTrip.role === UserTripRole.OWNER && role !== UserTripRole.OWNER) {
      return res.status(400).json({
        message: "No puedes quitar el rol de owner a este usuario",
      });
    }

    // Bloquear que un editor cambie su rol a owner
    if (
      authenticatedUser.role === UserTripRole.EDITOR &&
      role === UserTripRole.OWNER
    ) {
      return res.status(400).json({
        message: "No tenes permiso para cambiar el rol",
      });
    }

    if (existingOwner && role === "owner") {
      await existingOwner.update({
        role: UserTripRole.EDITOR,
      });

      await userTrip.update({ role });

      return res.status(200).json({
        existingOwner,
        userTrip,
      });
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
    const userTrip = await UserTrip.findByPk(id, {
      include: [{ model: Users, as: "user" }],
    });

    if (!userTrip) {
      return res.status(404).json({ message: "User trip no encontrado" });
    }

    if (userTrip.user.role === UserTripRole.OWNER) {
      return res.status(400).json({
        message: "No puedes eliminar al dueño del viaje",
      });
    }

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.EDITOR, UserTripRole.OWNER],
      userTrip.tripId
    );

    if (!hasPermissions) {
      return res
        .status(403)
        .json({ message: "No tiene permisos para crear un dia" });
    }

    await userTrip.destroy();

    res.json({ success: "User trip eliminado" });
  } catch (error) {
    console.error("Error deleting user trip:", error);
    res.status(500).json({ message: "Error eliminando user trip" });
  }
};
