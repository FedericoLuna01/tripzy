import { body } from "express-validator";

export const validateUser = [
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),
    
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido"),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
];