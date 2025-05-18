// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
        default: 'patient',
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);