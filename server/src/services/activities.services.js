import { Activities } from "../models/Activities.js";

export const getActivities = async (req, res) => {
  const activities = await Activities.findAll();
  res.json(activities);
};

export const createActivity = async (req, res) => {
  const { title, description, time, tripDaysId } = req.body;
  if (!title || !description || !time || !tripDaysId) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const activity = Activities.create({
    title,
    description,
    time,
    tripDaysId,
  });
  res.json(activity);
};

export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, time, tripDaysId } = req.body;

  if (!title || !description || !time || !tripDaysId) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const activityExist = await Activities.findByPk(id);
  if (!activityExist) {
    return res.status(404).json({
      message: "No se encontró la actividad",
    });
  }

  const activity = await Activities.update(
    {
      title,
      description,
      time,
      tripDaysId,
    },
    {
      where: { id },
    }
  );

  res.json(activity);
};

export const deleteActivity = async (req, res) => {
  const { id } = req.params;

  const activity = await Activities.findByPk(id);

  if (!activity) {
    return res.status(404).json({
      message: "Actividad no encontrada",
    });
  }

  await activity.destroy();

  res.json("Borrado Correctamente");
};
