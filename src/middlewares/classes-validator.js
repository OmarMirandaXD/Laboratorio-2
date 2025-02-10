import { body, param } from "express-validator";
import { userExistsById } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createClassValidator = [
    body("className").notEmpty().withMessage("El nombre de la clase es requerido"),
    body("teacher").notEmpty().withMessage("El ID del profesor es requerido"),
    body("teacher").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("teacher").custom(userExistsById),
    body("students").isArray().withMessage("Los estudiantes deben ser un arreglo de IDs"),
    body("students.*").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("students.*").custom(userExistsById),
    body("schedule").notEmpty().withMessage("El horario es requerido"),
    validarCampos,
    handleErrors
];

export const updateClassValidator = [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("className").optional().notEmpty().withMessage("El nombre de la clase es requerido"),
    body("teacher").optional().isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("teacher").optional().custom(userExistsById),
    body("students").optional().isArray().withMessage("Los estudiantes deben ser un arreglo de IDs"),
    body("students.*").optional().isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("students.*").optional().custom(userExistsById),
    body("schedule").optional().notEmpty().withMessage("El horario es requerido"),
    validarCampos,
    handleErrors
];

export const getClassByIdValidator = [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const deleteClassValidator = [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];