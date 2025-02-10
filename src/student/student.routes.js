import { Router } from "express";
import { param, body } from "express-validator"; 
import { getStudentById, getStudents, deleteStudent, updatePassword, updateStudent, assignClass, getAssignedClasses } from "./student.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/students.validator.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import apiLimiter from "../middlewares/rate-limit-validator.js";

const router = Router();

router.get("/findStudent/:uid", getUserByIdValidator, validarCampos, getStudentById);

router.get("/", apiLimiter, getStudents);

router.delete("/deleteStudent/:uid", deleteUserValidator, validarCampos, deleteStudent);

router.patch("/updatePassword/:uid", updatePasswordValidator, validarCampos, updatePassword);

router.put("/updateStudent/:uid", updateUserValidator, validarCampos, updateStudent);

router.post("/assignClass/:uid", [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("classId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos
], assignClass);

router.get("/assignedClasses/:uid", getUserByIdValidator, validarCampos, getAssignedClasses);

export default router;