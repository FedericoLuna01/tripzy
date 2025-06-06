import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const TripDays = sequelize.define(
  "tripDays",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trips",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
