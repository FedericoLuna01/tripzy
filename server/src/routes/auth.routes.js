import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
} from "../services/auth.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/profile/:id", verifyToken, updateProfile);

export default router;
