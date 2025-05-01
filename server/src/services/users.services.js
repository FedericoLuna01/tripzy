import { Users } from "../models/Users.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await Users.findAll();

  // Saco las contraseñas de los usuarios
  users.forEach((user) => {
    delete user.dataValues.password;
  });

  res.json(users);
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await Users.findByPk(id);
  if (!user) {
    return res.status(404).json({
      message: "No se encuentra el usuario",
    });
  }
  res.json(user);
};

export const postUser = async (req, res) => {
  let { name, email, password, role, status } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  if (!role || role.trim() === "") {
    role = "user";
  }

  if (!status) {
    status = "active";
  }

  const userExists = await Users.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({
      message: "El usuario ya existe",
    });
  }

  const user = await Users.create({
    name,
    email,
    password,
    role,
    status,
  });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status, imageUrl } = req.body;

  if (!name || !email || !role || !status) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await user.update({
    name,
    email,
    role,
    status,
    imageUrl,
  });

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found for delete",
    });
  }

  await user.destroy();

  res.json({ message: "Usuario eliminado correctamente" });
};
