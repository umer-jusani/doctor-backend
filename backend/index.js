import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/db.js";
import authRoutes from "./Routes/auth-routes.js";
import userRoutes from "./Routes/user-routes.js";
import doctorRoutes from "./Routes/doctor-routes.js";

// loading all the environments variables
dotenv.config()
const URI = process.env.MONGO_URL

const app = express();
const port = process.env.PORT || 8000;


const corsOptions = {
    origin: true
}

// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));

// routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/doctors", doctorRoutes)

app.get("/", (req, res) => {
    res.send("Apis is working")
});

app.listen(port, () => {
    connectDB(URI);
    console.log("server is running on this port " + port)
})
