import { Router } from "express";
import { createTrip, getAllTrips } from "../services/trips.services.js";

const router = Router();

router.get("/trips", getAllTrips);
router.post("/trips", createTrip);

export default router;
