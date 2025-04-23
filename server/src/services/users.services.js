import { Users } from "../models/Users.js";

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
  res.json();
};

export const postUser = async (req, res) => {
  const { name, email, password } = req.body;

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
  });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await Users.update(
    {
      name,
      email,
      password,
    },
    {
      where: { id },
    }
  );
  await Users.update({ name, email, password }, { where: { id } });
  const updatedUser = await Users.findByPk(id);
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found for delete",
    });
  }
  await Users.destroy({
    where: { id },
  });
  res.json({ message: "Usuario eliminado correctamente" });
};
