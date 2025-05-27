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

  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(
    {
      email,
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
      status: newUser.status,
      imageUrl: newUser.imageUrl,
    },
    secretKey
  );
  res.status(200).json({ newUser, token });
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
      message: "Usuario o contraseña incorrectos",
    });
  }

  const equalPassword = await bcrypt.compare(password, user.password);

  if (!equalPassword) {
    return res.status(401).json({
      message: "Usuario o contraseña incorrectos",
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

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;

    if (!name) {
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
      imageUrl: imageUrl || "",
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
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return res.status(500).json({
      message: "Error al actualizar el perfil",
    });
  }
};
