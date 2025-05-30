import userSchema from "../models/userSchema.js";


export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await userSchema.findByIdAndUpdate(id, { $set: req.body }, { new: true }).select("-password");
        res.status(200).json({ success: true, message: "Successfully Updated User Profile", data: updatedUser })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Update User Profile" })

    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await userSchema.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully Deleted User Profile", })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Delete User Profile" })

    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userSchema.findById(id).select("-password");
        res.status(200).json({ success: true, message: "User Found", data: user })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to found the user" })

    }
}

export const getAllUsers = async (req, res) => {
    const id = req.params.id;

    try {
        const users = await userSchema.find({}).select("-password");
        res.status(200).json({ success: true, message: "Users Found", data: users })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to found Users" })

    }
}