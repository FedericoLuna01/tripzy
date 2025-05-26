import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";

export const verifyToken = async (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No posee autorización" });
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);

    const user = await Users.findByPk(payload.id);

    if (!user) {
      return res.status(401).json({ message: "No posee autorización" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "No posee los permisos correctos" });
  }
};
