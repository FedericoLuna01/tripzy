import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { toggleReaction } from "../services/reactions.services.js";

const router = Router();

// POST /reactions/toggle
router.post("/reactions/toggle", verifyToken, toggleReaction);

export default router;
