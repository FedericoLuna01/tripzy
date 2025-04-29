import { Users } from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }
  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "El usuario no existe",
    });
  }

  const equalPassword = await bcrypt.compare(password, user.password);

  if (!equalPassword) {
    return res.status(401).json({
      message: "La contraseña es incorrecta",
    });
  }

  const secretKey = "mi_clave_secreta";
  const token = jwt.sign({ email }, secretKey, {
    expiresIn: "1h",
  });

  return res.json({ token });
};
