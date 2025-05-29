import { UserTripRole } from "../enums/enums.js";
import { TripDays } from "../models/TripDays.js";
import { Trips } from "../models/Trips.js";
import { Users } from "../models/Users.js";
import { UserTrip } from "../models/UserTrip.js";
import { checkTripPermissions } from "../utils/checkTripPermissions.js";

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trips.findAll({
      include: [
        {
          model: UserTrip,
          as: "tripUsers",
          where: { role: "owner" },
          include: [
            {
              model: Users,
              as: "user",
            },
          ],
        },
      ],
    });

    const formattedTrips = trips.map((trip) => {
      const owner = trip.tripUsers[0]?.user || null;
      return {
        ...trip.toJSON(),
        owner,
      };
    });
    return res.json(formattedTrips);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener los viajes",
    });
  }
};

export const getTripByUserId = async (req, res) => {
  const { userId } = req.params;

  if (Number(userId) !== req.user.id) {
    return res.status(403).json({
      message: "No tienes permisos para ver los viajes de otro usuario",
    });
  }

  try {
    const trips = await Trips.findAll({
      include: [
        {
          model: UserTrip,
          as: "tripUsers",
          where: { userId },
          include: [
            {
              model: Users,
              as: "user",
            },
          ],
        },
        {
          model: TripDays,
          as: "days",
        },
      ],
    });

    res.json(trips);
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({
      message: "Error al obtener los viajes",
    });
  }
};

export const getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trips.findByPk(id, {
      include: [
        {
          model: TripDays,
          as: "days",
        },
        {
          model: UserTrip,
          as: "tripUsers",
          include: [
            {
              model: Users,
              as: "user",
            },
          ],
        },
      ],
    });

    if (!trip) {
      return res.status(404).json({
        message: "No se encuentra el viaje",
      });
    }

    res.json(trip);
  } catch (error) {
    console.error("Error al obtener el viaje:", error);
    res.status(500).json({
      message: "Error al obtener el viaje",
    });
  }
};

export const createTrip = async (req, res) => {
  try {
    const { title, description, startDate, imageUrl, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!title || !description || !startDate || !imageUrl) {
      return res.status(400).json({
        message: "Los campos son obligatorios",
      });
    }

    const trip = await Trips.create({
      title,
      description,
      startDate,
      imageUrl,
    });

    await TripDays.create({
      date: startDate,
      tripId: trip.id,
    });

    await UserTrip.create({
      userId: userId,
      tripId: trip.id,
      role: "owner",
    });

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating trip" });
  }
};

export const deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trips.findByPk(id);

    if (!trip) {
      return res.status(404).json({
        message: "Viaje no encontrado",
      });
    }

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.OWNER],
      id
    );

    if (!hasPermissions && !req.user.role.includes("admin")) {
      return res
        .status(403)
        .json({ message: "No tiene permisos para eliminar el viaje" });
    }

    await UserTrip.destroy({
      where: { tripId: id },
    });

    await trip.destroy();

    res.status(200).json({ success: "Eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el viaje:", error);
    res.status(500).json({
      message: "Error al eliminar el viaje",
    });
  }
};

export const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, imageUrl, isBlocked } = req.body;

  if (!title || !description || !startDate || !imageUrl) {
    return res.status(400).json({
      message: "Se necesitan todos los campos",
    });
  }
  try {
    const trip = await Trips.findByPk(id);
    if (!trip) {
      return res.status(404).json({
        message: "No se encontró el viaje",
      });
    }

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.EDITOR, UserTripRole.OWNER],
      id
    );

    if (!hasPermissions && !req.user.role.includes("admin")) {
      return res
        .status(403)
        .json({ message: "No tiene permisos para editar un viaje" });
    }

    await trip.update({
      title,
      description,
      startDate,
      imageUrl,
      isBlocked,
    });

    res.json(trip);
  } catch (error) {
    console.error("Error al actualizar el viaje:", error);
    res.status(500).json({
      message: "Error al actualizar el viaje",
    });
  }
};

export const deleteUserFromTrip = async (req, res) => {
  const { userId, tripId } = req.params;

  try {
    const userTrip = await UserTrip.findOne({
      where: { userId, tripId },
    });

    if (!userTrip) {
      return res.status(404).json({
        message: "No se encontró la relación entre el usuario y el viaje",
      });
    }

    await userTrip.destroy();

    res.json({ message: "Usuario eliminado del viaje" });
  } catch (error) {
    console.error("Error al eliminar el usuario del viaje:", error);
    res.status(500).json({
      message: "Error al eliminar el usuario del viaje",
    });
  }
};
