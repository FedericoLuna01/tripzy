import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import activitiesRoutes from "./routes/activities.routes.js";
import userTripRoutes from "./routes/userTrip.routes.js";
import userRoutes from "./routes/users.routes.js";
import tripsRoutes from "./routes/trips.routes.js";
import daysRoutes from "./routes/days.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import tripChatMessagesRoutes from "./routes/tripChatMessages.routes.js";
import reactionRoutes from "./routes/reactions.routes.js";
import { setupSocketIO } from "./socket/socket.js";
import "./models/Users.js";
import "./models/UserTrip.js";
import "./models/Trips.js";
import "./models/TripDays.js";
import "./models/Activities.js";
import "./models/Messages.js";
import "./models/TripChatMessages.js";
import "./models/Reaction.js";
import "./models/associations.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

const PORT = 3000;
try {
  httpServer.listen(PORT);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    next();
  });

  // Make io accessible in routes
  app.set("io", io);
  app.use(userRoutes);
  app.use(tripsRoutes);
  app.use(daysRoutes);
  app.use(activitiesRoutes);
  app.use(authRoutes);
  app.use(userTripRoutes);
  app.use(messageRoutes);
  app.use(tripChatMessagesRoutes);
  app.use(messageRoutes);
  app.use(reactionRoutes);

  // Setup Socket.IO
  setupSocketIO(io);

  await sequelize.sync();

  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
} catch (error) {
  console.log(error);
}
