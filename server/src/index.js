import express from "express";
import userRoutes from "./routes/users.routes.js";
import tripsRoutes from "./routes/trips.routes.js";
import { sequelize } from "./db.js";
import "./models/Users.js";
import "./models/UserTrip.js";
import "./models/Trips.js";

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

  await sequelize.sync();

  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
} catch (error) {
  console.log(error);
}
