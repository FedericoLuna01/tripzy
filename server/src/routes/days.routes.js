import { Router } from "express";
import { createDay, deleteDay, getDays } from "../services/days.services.js";

const router = Router();

router.get("/days", getDays);
router.post("/days", createDay);
router.delete("/days/:id", deleteDay);

export default router;
