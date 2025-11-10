import { Reaction } from "../models/Reaction.js";

export const toggleReaction = async (req, res) => {
  const { activityId, emoji } = req.body;
  const userId = req.user.id;

  if (!activityId || !emoji) {
    return res.status(400).json({ error: "activityId y emoji son requeridos" });
  }

  try {
    const existing = await Reaction.findOne({
      where: { userId, activityId, emoji },
    });

    if (existing) {
      await existing.destroy();
      return res.json({ removed: true });
    }

    const reaction = await Reaction.create({
      userId,
      activityId,
      emoji,
    });

    return res.json({ reaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al procesar la reacción" });
  }
};
