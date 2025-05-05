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

  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(
    {
      email,
      id: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
      imageUrl: user.imageUrl,
    },
    secretKey
  );

  return res.json({ token });
};

export const getProfile = async (req, res) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No posee autorización" });
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    return res.json(payload);
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "No posee los permisos correctos" });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl } = req.body;

  if (!name || !imageUrl) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "El usuario no existe",
    });
  }

  await user.update({
    name,
    imageUrl,
  });

  const secretKey = process.env.SECRET_KEY;
  const newToken = jwt.sign(
    {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
      imageUrl: user.imageUrl,
    },
    secretKey
  );

  return res.json({ user, token: newToken });
};
