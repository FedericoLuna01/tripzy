import { Router } from "express";
import { createDay, deleteDay, getDays } from "../services/days.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/days", verifyToken, getDays);
router.post("/days", verifyToken, createDay);
router.delete("/days/:id", verifyToken, deleteDay);

export default router;
