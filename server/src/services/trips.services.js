import { Trips } from "../models/Trips.js";
import { UserTrip } from "../models/UserTrip.js";

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trips.findAll();
    console.log(trips);
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
  const trip = await Trips.findByPk(id);
  if (!trip) {
    return res.status(404).json({
      message: "No se encuentra el viaje",
    });
  }
  res.json(trip);
};

export const createTrip = async (req, res) => {
  try {
    const { title, description, startDate, imageUrl, userId, isPublic } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
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
