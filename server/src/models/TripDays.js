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
        model: "trips", // Nombre de la tabla Trips
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "trip_days", // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);
