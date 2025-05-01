import { Router } from "express";
import {
  updateUser,
  deleteUser,
  postUser,
  getAllUsers,
  getUser,
} from "../services/users.services.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", postUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
