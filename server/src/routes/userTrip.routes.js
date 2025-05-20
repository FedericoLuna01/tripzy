import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createUserTrip,
  deleteUserTrip,
  getAllUserTrip,
  updateUserTrip,
} from "../services/userTrip.services.js";

const router = Router();

router.get("/userTrip", verifyToken, getAllUserTrip);
router.post("/userTrip", verifyToken, createUserTrip);
router.put("/userTrip/:id", verifyToken, updateUserTrip);
router.delete("/userTrip/:id", verifyToken, deleteUserTrip);

export default router;
