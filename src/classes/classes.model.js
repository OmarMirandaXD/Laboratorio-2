import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ClassesSchema = new Schema({
    className: {
        type: String,
        required: [true, "El nombre de la clase es obligatorio"]
    },
    students: [{
        type: Schema.ObjectId,
        ref: 'Student'
    }],
    teacher: {
        type: Schema.ObjectId,
        ref: 'Teacher',
        required: [true, "El profesor es obligatorio"]
    },
    schedule: {
        type: String,
        required: [true, "El horario es obligatorio"]
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Class", ClassesSchema);