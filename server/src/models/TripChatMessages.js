import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Users } from "./Users.js";
import { Trips } from "./Trips.js";

export const TripChatMessages = sequelize.define(
  "tripChatMessages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trips,
        key: "id",
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "trip_chat_messages",
  }
);
