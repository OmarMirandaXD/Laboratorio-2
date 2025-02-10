import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    asignature: {
        type: String,
        required: [true, "La asignatura es requerida"]
    },
    classes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Class'
    }]
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Teacher", TeacherSchema);