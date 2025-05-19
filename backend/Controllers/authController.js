import userSchema from "../models/userSchema.js";
import doctorSchema from "../models/doctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_key, {
        expiresIn: "15d"
    })
}


export const register = async (req, res) => {
    const { name, email, password, photo, gender, role } = req.body;
    try {
        let user;

        if (role == "doctor") {
            user = await userSchema.findOne({ email })
        }

        if (role == "patient") {
            user = await doctorSchema.findOne({ email })
        }

        // check if user already exists
        if (user) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt);

        if (role == "doctor") {
            doctorSchema.create({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        if (role == "patient") {
            userSchema.create({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        res.status(200).json({
            success: true,
            message: "User Successfully Created."
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error, Try again."
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        let user;

        const patient = await userSchema.findOne({ email })
        const doctor = await doctorSchema.findOne({ email });

        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        // get token
        const token = generateToken(user)

        const { pass, role, appointments, ...rest } = user._doc

        res.status(200).json({
            success: true,
            message: "Successfully Login",
            token,
            role,
            data: { ...rest }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }
}   