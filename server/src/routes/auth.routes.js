import { Router } from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
