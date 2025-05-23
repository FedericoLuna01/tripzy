import { Router } from "express";
import {
  deleteMessage,
  getAllMessages,
  getMessage,
  postMessage,
  updateMessage,
} from "../services/message.services.js";

const router = Router();

router.get("/messages", getAllMessages);
router.get("/messages/:id", getMessage);
router.post("/messages", postMessage);
router.put("/messages/:id", updateMessage);
router.delete("/messages/:id", deleteMessage);

export default router;
