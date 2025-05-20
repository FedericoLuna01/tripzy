import { Router } from "express";
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getTrip,
  getTripByUserId,
  updateTrip,
} from "../services/trips.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/trips", verifyToken, getAllTrips);
router.get("/trips/user/:userId", verifyToken, getTripByUserId);
router.get("/trips/:id", verifyToken, getTrip);
router.post("/trips", verifyToken, createTrip);
router.delete("/trips/:id", verifyToken, deleteTrip);
router.put("/trips/:id", verifyToken, updateTrip);

export default router;
