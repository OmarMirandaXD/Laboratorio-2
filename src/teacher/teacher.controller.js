import { hash, verify } from "argon2";
import Teacher from "./teacher.model.js";
import Class from "../classes/classes.model.js";
import Student from "../student/student.model.js";

export const getTeacherById = async (req, res) => {
    try {
        const { uid } = req.params;
        const teacher = await Teacher.findById(uid).populate('classes');

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            teacher
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el profesor",
            error: err.message
        });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, teachers] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('classes')
        ]);

        return res.status(200).json({
            success: true,
            total,
            teachers
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los profesores",
            error: err.message
        });
    }
};

export const createClass = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const teacher = await Teacher.findById(uid);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        data.teacher = uid;
        const newClass = await Class.create(data);

        teacher.classes.push(newClass._id);
        await teacher.save();

        return res.status(201).json({
            success: true,
            message: "Clase creada",
            class: newClass
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la clase",
            error: err.message
        });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const data = req.body;

        const classDoc = await Class.findByIdAndUpdate(classId, data, { new: true });

        if (!classDoc) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        // Actualizar la clase en los estudiantes asignados
        await Student.updateMany(
            { classes: classId },
            { $set: { "classes.$": classDoc._id } }
        );

        return res.status(200).json({
            success: true,
            message: "Clase actualizada",
            class: classDoc
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la clase",
            error: err.message
        });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { classId } = req.params;

        const classDoc = await Class.findByIdAndDelete(classId);

        if (!classDoc) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        // Desasignar la clase de los estudiantes
        await Student.updateMany(
            { classes: classId },
            { $pull: { classes: classId } }
        );

        return res.status(200).json({
            success: true,
            message: "Clase eliminada",
            class: classDoc
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la clase",
            error: err.message
        });
    }
};

export const getClassesByTeacher = async (req, res) => {
    try {
        const { uid } = req.params;
        const teacher = await Teacher.findById(uid).populate('classes');

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            classes: teacher.classes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las clases",
            error: err.message
        });
    }
};

export const deleteTeacher = async (req, res) => {
    try {
        const { uid } = req.params;

        const teacher = await Teacher.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            teacher
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el profesor",
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const teacher = await Teacher.findById(uid);

        const matchOldAndNewPassword = await verify(teacher.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await Teacher.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

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

export const updateTeacher = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const teacher = await Teacher.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profesor actualizado',
            teacher,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar profesor',
            error: err.message
        });
    }
};