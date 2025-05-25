import { UserTripRole } from "../enums/enums.js";
import { TripDays } from "../models/TripDays.js";
import { checkTripPermissions } from "../utils/checkTripPermissions.js";

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

  const hasPermissions = await checkTripPermissions(
    req.user,
    [UserTripRole.EDITOR, UserTripRole.OWNER],
    tripId
  );

  if (!hasPermissions) {
    return res
      .status(403)
      .json({ message: "No tiene permisos para crear un dia" });
  }

  const day = await TripDays.create({
    date,
    tripId,
  });

  res.status(200).json(day);
};

export const deleteDay = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const day = await TripDays.findByPk(id);

    if (!day) {
      return res.status(404).json({ message: "Dia no encontrado" });
    }

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.EDITOR, UserTripRole.OWNER],
      day.tripId
    );

    if (!hasPermissions) {
      return res
        .status(403)
        .json({ message: "No tiene permisos para eliminar este dia" });
    }

    await day.destroy();

    res.status(200).json({ message: "Dia eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el dia" });
  }
};
