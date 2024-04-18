import jwt from "jsonwebtoken";
import User from "../Info/userInfo.js";

const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized - No Token Provided" });
        }
        //get the userid without the password, aka username
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        req.user = user; //user from database

        next(); //this is a place holder for the next argu (i.e.sendMessage)

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export default protectRoute;