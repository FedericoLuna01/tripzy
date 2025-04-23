import { Router } from "express";
import {
  updateUser,
  deleteUser,
  postUser,
  getAllUsers,
  getUser,
} from "../services/users.services.js";
import { validateUser } from "../validators/users.validator.js";
import { handleValidationErrors } from "../middlewares/users.middlewares.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", validateUser, handleValidationErrors, postUser);
router.put("/users/:id", validateUser, handleValidationErrors, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
