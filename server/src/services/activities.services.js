import { checkTripPermissions } from "../utils/checkTripPermissions.js";
import { Activities } from "../models/Activities.js";
import { TripDays } from "../models/TripDays.js";
import { UserTripRole } from "../enums/enums.js";

export const getActivities = async (req, res) => {
  const activities = await Activities.findAll();
  res.json(activities);
};

export const createActivity = async (req, res) => {
  const { title, description, time, tripDaysId, address, latitude, longitude } =
    req.body;

  if (!title || !description || !time || !tripDaysId) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  try {
    const day = await TripDays.findByPk(tripDaysId);
    if (!day) {
      return res.status(404).json({
        message: "Día no encontrado",
      });
    }

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.EDITOR, UserTripRole.OWNER],
      day.tripId
    );

    if (!hasPermissions) {
      return res.status(403).json({
        message: "No tiene permisos para crear una actividad",
      });
    }

    const activity = await Activities.create({
      title,
      description,
      time,
      tripDaysId,
      address,
      latitude,
      longitude,
    });

    return res.status(201).json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear la actividad",
    });
  }
};

export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, time, address, latitude, longitude } = req.body;

  if (!title || !description || !time) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  try {
    const activityExist = await Activities.findByPk(id);

    if (!activityExist) {
      return res.status(404).json({
        message: "No se encontró la actividad",
      });
    }

    const day = await TripDays.findByPk(activityExist.tripDaysId);
    if (!day) {
      return res.status(404).json({
        message: "Día no encontrado",
      });
    }

    const hasPermissions = await checkTripPermissions(
      req.user,
      [UserTripRole.EDITOR, UserTripRole.OWNER],
      day.tripId
    );

    if (!hasPermissions) {
      return res.status(403).json({
        message: "No tiene permisos para actualizar esta actividad",
      });
    }

    await activityExist.update({
      title,
      description,
      time,
      address,
      latitude,
      longitude,
    });

    res.status(200).json(activityExist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al actualizar la actividad",
    });
  }
};

export const deleteActivity = async (req, res) => {
  const { id } = req.params;

  const activity = await Activities.findByPk(id);

  if (!activity) {
    return res.status(404).json({
      message: "Actividad no encontrada",
    });
  }

  const day = await TripDays.findByPk(activity.tripDaysId);

  if (!day) {
    return res.status(404).json({
      message: "Día no encontrado",
    });
  }

  const hasPermissions = await checkTripPermissions(
    req.user,
    [UserTripRole.EDITOR, UserTripRole.OWNER],
    day.tripId
  );

  if (!hasPermissions) {
    return res.status(403).json({
      message: "No tiene permisos para eliminar esta actividad",
    });
  }

  await activity.destroy();

  res.json("Borrado Correctamente");
};

export const getActivitiesByDay = async (req, res) => {
  const { tripDaysId } = req.params;
  try {
    const activities = await Activities.findAll({
      where: { tripDaysId },
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener actividades por día" });
  }
};
