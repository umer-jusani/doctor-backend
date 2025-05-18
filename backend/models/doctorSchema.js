// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    role: {
        type: String,
        default: 'doctor',
    },
    specialization: {
        type: String,
    },
    experience: {
        type: Number,
    },
    availableTime: {
        type: [String], // e.g. ["10:00AM-12:00PM", "4:00PM-6:00PM"]
    },
    bio: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);