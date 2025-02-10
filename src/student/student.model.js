import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    surname: {
        type: String,
        required: [true, "El apellido es requerido"]
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
    phone: {
        type: String,
        minLength: 8,
        required: [true, "El teléfono es requerido"],
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    status: {
        type: Boolean,
        default: true
    },
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }]
}, {
    versionKey: false,
    timestamps: true
});

StudentSchema.methods.toJSON = function() {
    const { _id, password, ...student } = this.toObject();
    student.uid = _id;
    return student;
};

export default model("Student", StudentSchema);