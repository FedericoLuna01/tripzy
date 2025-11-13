import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Activities = sequelize.define(
  "activities",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
    },
    tripDaysId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tripDays",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
