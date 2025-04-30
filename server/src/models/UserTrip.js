import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { UserTripRole } from "../enums/enums.js";

export const UserTrip = sequelize.define(
  "user_trip",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM(Object.values(UserTripRole)),
      allowNull: false,
      defaultValue: UserTripRole.VIEWER,
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
