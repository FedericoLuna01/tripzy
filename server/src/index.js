import express from "express";
import { sequelize } from "./db.js";
import userRoutes from "./routes/users.routes.js";
import tripsRoutes from "./routes/trips.routes.js";
import daysRoutes from "./routes/days.routes.js";
import authRoutes from "./routes/auth.routes.js";
import "./models/Users.js";
import "./models/UserTrip.js";
import "./models/Trips.js";
import "./models/TripDays.js";

const app = express();
const PORT = 3000;
try {
  app.listen(PORT);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  app.use(userRoutes);
  app.use(tripsRoutes);
  app.use(daysRoutes);
  app.use(authRoutes);

  await sequelize.sync();

  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
} catch (error) {
  console.log(error);
}
