import { UserTrip } from "./UserTrip.js";
import { Trips } from "./Trips.js";
import { Users } from "./Users.js";

// Relación User -> UserTrip
Users.hasMany(UserTrip, {
  foreignKey: "userId",
  as: "userTrips",
  onDelete: "CASCADE",
});

UserTrip.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});

// Relación Trip -> UserTrip
Trips.hasMany(UserTrip, {
  foreignKey: "tripId",
  as: "tripUsers",
  onDelete: "CASCADE",
});

UserTrip.belongsTo(Trips, {
  foreignKey: "tripId",
  as: "trip",
  onDelete: "CASCADE",
});
