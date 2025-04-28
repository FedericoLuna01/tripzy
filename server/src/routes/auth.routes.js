import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);

export default router;
