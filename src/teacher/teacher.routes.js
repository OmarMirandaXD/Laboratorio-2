import { Router } from "express";
import { param, body } from "express-validator"; // Importar param y body
import { getTeacherById, getTeachers, deleteTeacher, updatePassword, updateTeacher, createClass, updateClass, deleteClass, getClassesByTeacher } from "./teacher.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/teacher.validator.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import apiLimiter from "../middlewares/rate-limit-validator.js";

const router = Router();

router.get("/findTeacher/:uid", getUserByIdValidator, validarCampos, getTeacherById);

router.get("/", apiLimiter, getTeachers);

router.delete("/deleteTeacher/:uid", deleteUserValidator, validarCampos, deleteTeacher);

router.patch("/updatePassword/:uid", updatePasswordValidator, validarCampos, updatePassword);

router.put("/updateTeacher/:uid", updateUserValidator, validarCampos, updateTeacher);

router.post("/createClass/:uid", [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("className").notEmpty().withMessage("El nombre de la clase es requerido"),
    body("schedule").notEmpty().withMessage("El horario es requerido"),
    validarCampos
], createClass);

router.put("/updateClass/:classId", [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("className").optional().notEmpty().withMessage("El nombre de la clase es requerido"),
    body("schedule").optional().notEmpty().withMessage("El horario es requerido"),
    validarCampos
], updateClass);

router.delete("/deleteClass/:classId", [
    param("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos
], deleteClass);

router.get("/classesByTeacher/:uid", getUserByIdValidator, validarCampos, getClassesByTeacher);

export default router;