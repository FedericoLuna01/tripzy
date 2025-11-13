import { Router } from "express";
import {
  getTripChatMessages,
  sendTripChatMessage,
  deleteTripChatMessage,
} from "../services/tripChatMessages.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/trips/:tripId/messages", verifyToken, getTripChatMessages);
router.post("/trips/:tripId/messages", verifyToken, sendTripChatMessage);
router.delete(
  "/trips/:tripId/messages/:messageId",
  verifyToken,
  deleteTripChatMessage
);

export default router;
