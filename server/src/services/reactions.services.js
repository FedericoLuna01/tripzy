import { Reaction } from "../models/Reaction.js";
import { Users } from "../models/Users.js";

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

export const getReactionsByActivity = async (req, res) => {
  const { activityId } = req.params;

  if (!activityId) {
    return res.status(400).json({ error: "activityId es requerido" });
  }

  try {
    const reactions = await Reaction.findAll({
      where: { activityId },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "imageUrl"],
        },
      ],
    });

    // Agrupar reacciones por emoji
    const groupedReactions = reactions.reduce((acc, reaction) => {
      const emoji = reaction.emoji;

      if (!acc[emoji]) {
        acc[emoji] = {
          emoji,
          count: 0,
          users: [],
        };
      }

      acc[emoji].count++;
      acc[emoji].users.push({
        id: reaction.user.id,
        name: reaction.user.name,
        imageUrl: reaction.user.imageUrl,
      });

      return acc;
    }, {});

    // Convertir el objeto a un array
    const reactionsArray = Object.values(groupedReactions);

    return res.json({ reactions: reactionsArray });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener las reacciones" });
  }
};
