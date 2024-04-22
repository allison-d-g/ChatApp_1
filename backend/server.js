import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./auth/auth.js";
import messageRoutes from "./auth/message.auth.js";
import userRoutes from "./auth/user.auth.js";

import connectToMongoDB from "./database/connectToMongoDB.js"
import {app, server} from './socket/socket.js'

// const app = express();
const PORT = process.env.PORT || 3300;

const _dirname = path.resolve() //deploy

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req,res) => {
//     //root route http://localhost:3300/
//     res.send("Hello World!!");

// });

server.listen(PORT, () => {
    connectToMongoDB();
    console.log('Server Running on port ' + PORT)
});
