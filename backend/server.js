import express from "express";
import dotenv from "dotenv";

import authRoutes from "./auth/auth.js";
import connectToMongoDB from "./database/connectToMongoDB.js"

const app = express();
const PORT = process.env.PORT || 3300;


dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)

app.use("/api/auth", authRoutes);

// app.get("/", (req,res) => {
//     //root route http://localhost:3300/
//     res.send("Hello World!!");

// });





app.listen(PORT, () => {
    connectToMongoDB();
    console.log('Server Running on port ' + PORT)
});
