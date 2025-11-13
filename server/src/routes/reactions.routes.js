import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  toggleReaction,
  getReactionsByActivity,
} from "../services/reactions.services.js";

const router = Router();

// POST /reactions/toggle
router.post("/reactions/toggle", verifyToken, toggleReaction);

// GET /reactions/activity/:activityId
router.get(
  "/reactions/activity/:activityId",
  verifyToken,
  getReactionsByActivity
);

export default router;
