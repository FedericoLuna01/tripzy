import { TripDays } from "../models/TripDays.js";

export const getDays = async (req, res) => {
  const days = await TripDays.findAll();
  res.json(days);
};

export const createDay = async (req, res) => {
  const { date, tripId } = req.body;

  if (!date || !tripId) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const day = TripDays.create({
    date,
    tripId,
  });

  res.json(day);
};

export const deleteDay = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const day = await TripDays.destroy({
    where: {
      id,
    },
  });

  if (!day) {
    return res.status(404).json({ message: "Day not found" });
  }

  res.status(200).json({ message: "Dia eliminado" });
};
