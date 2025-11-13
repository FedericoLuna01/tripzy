import { UserTrip } from "./UserTrip.js";
import { Trips } from "./Trips.js";
import { Users } from "./Users.js";
import { TripDays } from "./TripDays.js";
import { Activities } from "./Activities.js";
import { Messages } from "./Messages.js";
import { TripChatMessages } from "./TripChatMessages.js";
import { Reaction } from "./Reaction.js";

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

// Relación Trip -> TripDays
Trips.hasMany(TripDays, {
  foreignKey: "tripId",
  as: "days",
  onDelete: "CASCADE",
});

TripDays.belongsTo(Trips, {
  foreignKey: "tripId",
  as: "trip",
  onDelete: "CASCADE",
});

// Relación TripDays -> Activities
TripDays.hasMany(Activities, {
  foreignKey: "tripDaysId",
  as: "activities",
  onDelete: "CASCADE",
});

Activities.belongsTo(TripDays, {
  foreignKey: "tripDaysId",
  as: "tripDays",
  onDelete: "CASCADE",
});

Activities.hasMany(Reaction, {
  foreignKey: "activityId",
  as: "reactions",
  onDelete: "CASCADE",
});

Reaction.belongsTo(Activities, {
  foreignKey: "activityId",
  as: "activity",
  onDelete: "CASCADE",
});

Users.hasMany(Reaction, {
  foreignKey: "userId",
  as: "userReactions",
  onDelete: "CASCADE",
});

Reaction.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});

Messages.belongsTo(Users, { foreignKey: "senderId", as: "sender" });
Users.hasMany(Messages, { foreignKey: "senderId", as: "messages" });

// Relación TripChatMessages -> Users
TripChatMessages.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});

Users.hasMany(TripChatMessages, {
  foreignKey: "userId",
  as: "tripChatMessages",
  onDelete: "CASCADE",
});

// Relación TripChatMessages -> Trips
TripChatMessages.belongsTo(Trips, {
  foreignKey: "tripId",
  as: "trip",
  onDelete: "CASCADE",
});

Trips.hasMany(TripChatMessages, {
  foreignKey: "tripId",
  as: "chatMessages",
  onDelete: "CASCADE",
});
