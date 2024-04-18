import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

//protect the route (link) before run the function
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;