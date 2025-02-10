import express from 'express';
import { register, login } from "./auth.controller.js";
import { authValidator } from '../middlewares/auth.validator.js'; 
import { validarCampos } from "../middlewares/validate-fields.js"; 
import apiLimiter from "../middlewares/rate-limit-validator.js";

const router = express.Router();

router.post("/register", apiLimiter, authValidator, validarCampos, register);
router.post("/login", apiLimiter, authValidator, validarCampos, login);

export default router;