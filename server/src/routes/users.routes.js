import { Router } from "express";
import {
  updateUser,
  deleteUser,
  postUser,
  getAllUsers,
  getUser,
} from "../services/users.services.js";
import { verifyAdminPermissions } from "../middleware/verifyAdminPermissions.js";

const router = Router();

router.get("/users", verifyAdminPermissions, getAllUsers);
router.get("/users/:id", verifyAdminPermissions, getUser);
router.post("/users", verifyAdminPermissions, postUser);
router.put("/users/:id", verifyAdminPermissions, updateUser);
router.delete("/users/:id", verifyAdminPermissions, deleteUser);

export default router;
