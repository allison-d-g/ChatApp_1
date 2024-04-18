import User from "../Info/userInfo.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/token.js";
import mongoose from "mongoose";

export const signup = async (req,res) =>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        //check password
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match."});
        }
        //check username
        const user = await User.findOne({username}); //check is username exist
        if(user){
            return res.status(400).json({error:"username exists."});
        }

        //HASH Password
        const salt = await bcrypt.genSalt(10); // the higher the safe but slower
        //for security reason, the password will be encode in database
        const hashedPassword = await bcrypt.hash(password, salt); 
        
        // https://avatar-placeholder.iran.liara.run/ //this is the web with random pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === "Male" ? boyProfilePic:girlProfilePic,
        });
        
        if(newUser){
            //generate JWT token
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    }catch (error){
        console.log("Error in signup", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    // console.log("Signup");
};

export const logout =  (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message:"Logged out successfully."});
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const login = async(req,res) =>{
   try {
    const{username, password} =req.body; //input 
    const user = await User.findOne({username}); //check username
    //check if password correct
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error: "Invalid username or password."});
    }

    //log user in
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
    }); //response

   } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({error:"Internal Server Error"});
   }
};