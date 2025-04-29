import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No posee autorización" });
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    console.log(payload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "No posee los permisos correctos" });
  }
};
