import { UserTrip } from "./UserTrip.js";
import { Trips } from "./Trips.js";
import { Users } from "./Users.js";

// Relación User -> UserTrip
Users.hasMany(UserTrip, {
  foreignKey: "userId",
  as: "userTrips",
});

UserTrip.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Relación Trip -> UserTrip
Trips.hasMany(UserTrip, {
  foreignKey: "tripId",
  as: "tripUsers",
});

UserTrip.belongsTo(Trips, {
  foreignKey: "tripId",
  as: "trip",
});
