import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";
import { UserRole } from "../enums/enums.js";

export const verifyAdminPermissions = async (req, res, next) => {
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

    if (payload.role === UserRole.USER) {
      return res.status(401).json({
        message: "No posee permisos",
      });
    }
    if (payload.role === UserRole.SUPERADMIN) {
      return next();
    }

    const { id } = req.params;
    const targetUser = await Users.findByPk(id);

    if (targetUser && targetUser.role === "superadmin") {
      return res.status(403).json({
        message: "No tienes permisos para editar o eliminar a un superadmin",
      });
    }

    next();
  } catch (error) {
    console.error("Error verificando permisos:", error);
    return res.status(403).json({ message: "No posee los permisos correctos" });
  }
};
