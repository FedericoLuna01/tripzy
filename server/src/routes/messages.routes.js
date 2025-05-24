import { Router } from "express";
import {
  deleteMessage,
  getAllMessages,
  getMessage,
  postMessage,
  updateMessage,
} from "../services/message.services.js";
import { verifyAdminPermissions } from "../middleware/verifyAdminPermissions.js";

const router = Router();

router.get("/messages", verifyAdminPermissions, getAllMessages);
router.get("/messages/:id", verifyAdminPermissions, getMessage);
router.post("/messages", postMessage);
router.put("/messages/:id", verifyAdminPermissions, updateMessage);
router.delete("/messages/:id", verifyAdminPermissions, deleteMessage);

export default router;
