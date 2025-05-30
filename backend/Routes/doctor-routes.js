import express from "express";
import { updateUser, deleteUser, getAllUsers, getSingleUser } from "../Controllers/doctorController.js";

const router = express.Router()

router.get("/:id", getSingleUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)
router.get("/", getAllUsers);


export default router