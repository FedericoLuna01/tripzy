import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Reaction = sequelize.define(
  "reactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "activities",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
