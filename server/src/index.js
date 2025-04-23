import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { sequelize } from "./db.js";
import "./models/Users.js";

const app = express();
const PORT = 3000;
app.use(cors());
try {
  app.listen(PORT);
  app.use(express.json());
  app.use(userRoutes);

  await sequelize.sync();

  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
} catch (error) {
  console.log(error);
}
