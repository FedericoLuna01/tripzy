import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Users } from "./Users.js";

export const UserTrip = sequelize.define(
  "user_trip",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM("owner", "editor", "viewer"),
      defaultValue: "viewer",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trips",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
