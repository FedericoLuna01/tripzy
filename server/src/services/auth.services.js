import { Users } from "../models/Users.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: "El usuario ya existe",
    });
  }

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json(newUser);
};

export const loginUser = async (req, res) => {
  res.send("Login");
};
