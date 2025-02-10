import { hash, verify } from "argon2";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";

export const register = async (req, res) => {
    try {
        const { body: data, file } = req;
        const profilePicture = file ? file.filename : null;
        const encryptedPassword = await hash(data.password);

        const userData = {
            ...data,
            password: encryptedPassword,
            profilePicture
        };

        let user;
        if (data.role === "STUDENT_ROLE") {
            user = await Student.create(userData);
        } else if (data.role === "TEACHER_ROLE") {
            user = await Teacher.create(userData);
        } else {
            return res.status(400).json({
                message: "Rol especificado no válido"
            });
        }

        return res.status(201).json({
            message: "Usuario ha sido creado",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Registro de usuario fallido",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        let user = await Student.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            user = await Teacher.findOne({
                $or: [{ email: email }, { username: username }]
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "Credenciales no válidas",
                error: "No se encontró un usuario con el email o nombre de usuario proporcionado"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales no válidas",
                error: "Contraseña incorrecta"
            });
        }

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                profilePicture: user.profilePicture,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Inicio de sesión fallido, error del servidor",
            error: err.message
        });
    }
};