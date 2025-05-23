import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import activitiesRoutes from "./routes/activities.routes.js";
import userTripRoutes from "./routes/userTrip.routes.js";
import userRoutes from "./routes/users.routes.js";
import tripsRoutes from "./routes/trips.routes.js";
import daysRoutes from "./routes/days.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import "./models/Users.js";
import "./models/UserTrip.js";
import "./models/Trips.js";
import "./models/TripDays.js";
import "./models/Activities.js";
import "./models/Messages.js";
import "./models/associations.js";

dotenv.config();
const app = express();
const PORT = 3000;
try {
  app.listen(PORT);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    next();
  });
  app.use(userRoutes);
  app.use(tripsRoutes);
  app.use(daysRoutes);
  app.use(activitiesRoutes);
  app.use(authRoutes);
  app.use(userTripRoutes);
  app.use(messageRoutes);

  await sequelize.sync();

  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
} catch (error) {
  console.log(error);
}
