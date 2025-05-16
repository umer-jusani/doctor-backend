import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"

// loading all the environments variables
dotenv.config()


const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
}


// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("Apis is working")
});

app.listen(port, () => {
    console.log("server is running on this port " + port)
})
