import { Router } from "express";
import { createClass, updateClass, deleteClass, getClassById, getClasses, assignStudentToClass } from "./classes.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import { handleErrors } from "../middlewares/handle-errors.js";
import { body, param } from "express-validator";
import apiLimiter from "../middlewares/rate-limit-validator.js";

const router = Router();

router.post("/createClass", [
    body("className").notEmpty().withMessage("El nombre de la clase es requerido"),
    body("teacher").notEmpty().withMessage("El ID del profesor es requerido"),
    body("teacher").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("schedule").notEmpty().withMessage("El horario es requerido"),
    validarCampos,
    handleErrors
], createClass);

router.put("/updateClass/:classId", [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("className").optional().notEmpty().withMessage("El nombre de la clase es requerido"),
    body("schedule").optional().notEmpty().withMessage("El horario es requerido"),
    validarCampos,
    handleErrors
], updateClass);

router.delete("/deleteClass/:classId", [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
], deleteClass);

router.get("/getClass/:classId", [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
], getClassById);

router.get("/", apiLimiter, getClasses);

router.post("/assignStudentToClass/:classId/:studentId", [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("studentId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
], assignStudentToClass);

export default router;