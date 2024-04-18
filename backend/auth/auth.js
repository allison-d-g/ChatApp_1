import express from "express";

import { login,logout,signup } from "../controllers/authController.js";

const router = express.Router();

//log in, login is defined in controllers
router.post("/login", login); 

//logout
router.post("/logout", logout);

//signup
router.post("/signup", signup);

export default router;