import { Router } from "express";
import {
  updateUser,
  deleteUser,
  postUser,
  getAllUsers,
  getUser,
  getUserByEmail,
} from "../services/users.services.js";
import { verifyAdminPermissions } from "../middleware/verifyAdminPermissions.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/users", verifyAdminPermissions, getAllUsers);
router.get("/users/:id", verifyAdminPermissions, getUser);
router.get("/users/email/:userEmail", verifyToken, getUserByEmail);
router.post("/users", verifyAdminPermissions, postUser);
router.put("/users/:id", verifyAdminPermissions, updateUser);
router.delete("/users/:id", verifyAdminPermissions, deleteUser);

export default router;
