import { hash, verify } from "argon2";
import Student from "./student.model.js";
import Class from "../classes/classes.model.js";

export const getStudentById = async (req, res) => {
    try {
        const { uid } = req.params;
        const student = await Student.findById(uid).populate('classes');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            student
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el estudiante",
            error: err.message
        });
    }
};

export const getStudents = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, students] = await Promise.all([
            Student.countDocuments(query),
            Student.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('classes')
        ]);

        return res.status(200).json({
            success: true,
            total,
            students
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los estudiantes",
            error: err.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { uid } = req.params;

        const student = await Student.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Estudiante eliminado",
            student
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el estudiante",
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const student = await Student.findById(uid);

        const matchOldAndNewPassword = await verify(student.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await Student.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const student = await Student.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Estudiante actualizado',
            student,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar estudiante',
            error: err.message
        });
    }
};

export const assignClass = async (req, res) => {
    try {
        const { uid } = req.params;
        const { classId } = req.body;

        const student = await Student.findById(uid);
        const classDoc = await Class.findById(classId);

        if (!student || !classDoc) {
            return res.status(404).json({
                success: false,
                message: "Estudiante o clase no encontrado"
            });
        }

        if (student.classes.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a 3 clases"
            });
        }

        if (student.classes.includes(classId)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a esta clase"
            });
        }

        student.classes.push(classId);
        await student.save();

        return res.status(200).json({
            success: true,
            message: "Clase asignada al estudiante",
            student
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar clase",
            error: err.message
        });
    }
};

export const getAssignedClasses = async (req, res) => {
    try {
        const { uid } = req.params;
        const student = await Student.findById(uid).populate('classes');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            classes: student.classes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las clases asignadas",
            error: err.message
        });
    }
};