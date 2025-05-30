import express from "express";
import { updateUser, deleteUser, getSingleUser, getAllUsers } from "../Controllers/userController.js";

const router = express.Router()

router.get("/:id", getSingleUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)
router.get("/", getAllUsers);


export default router