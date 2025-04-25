import { Router } from "express";
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getTrip,
  updateTrip,
} from "../services/trips.services.js";
import { getUser } from "../services/users.services.js";

const router = Router();

router.get("/trips", getAllTrips);
router.get("/trips/:id", getTrip);
router.post("/trips", createTrip);
router.delete("/trips/:id", deleteTrip);
router.put("/trips/:id", updateTrip);

export default router;
