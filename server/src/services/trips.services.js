import { TripDays } from "../models/TripDays.js";
import { Trips } from "../models/Trips.js";
import { UserTrip } from "../models/UserTrip.js";

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trips.findAll();
    return res.json(trips);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener los viajes",
    });
  }
};

export const getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trips.findByPk(id);

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
    const { title, description, startDate, imageUrl, userId, isPublic } =
      req.body;

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
      isPublic,
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
  try {
    const { id } = req.params;

    const trip = await Trips.findByPk(id);
    if (!trip) {
      return res.status(404).json({
        message: "Viaje no encontrado",
      });
    }
    await UserTrip.destroy({
      where: { tripId: id },
    });

    // Eliminar el viaje
    await trip.destroy();

    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el viaje:", error);
    res.status(500).json({
      message: "Error al eliminar el viaje",
    });
  }
};

export const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, imageUrl, isBlocked, isPublic } =
    req.body;
  if (!title || !description || !startDate || !imageUrl) {
    return res.status(400).json({
      message: "Se necesitan todos los campos",
    });
  }
  const trip = await Trips.findByPk(id);
  if (!trip) {
    return res.status(404).json({
      message: "No se encontró el viaje",
    });
  }

  await Trips.update(
    { title, description, startDate, imageUrl, isBlocked, isPublic },
    {
      where: { id },
    }
  );

  res.json(trip);
};
