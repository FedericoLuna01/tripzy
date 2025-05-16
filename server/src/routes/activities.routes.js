import { Router } from "express";
import {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
  getActivitiesByDay,
} from "../services/activities.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/activities", verifyToken, getActivities);
router.get("/activities/day/:tripDaysId", verifyToken, getActivitiesByDay);
router.post("/activities", verifyToken, createActivity);
router.put("/activities/:id", verifyToken, updateActivity);
router.delete("/activities/:id", verifyToken, deleteActivity);

export default router;
