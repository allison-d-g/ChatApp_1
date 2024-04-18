import User from "../Info/userInfo.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/token.js";

export const signup = async (req,res) =>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        //check password
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match."});
        }
        const user = await User.findOne({username}); //check is username exist
        if(user){
            return res.status(400).json({error:"username is already existed."});
        }
        //HASH Password
        const salt = await bcrypt.genSalt(10); // the higher the safe but slower
        //for security reason, the password will be encode in database
        const hashedPassword = await bcrypt.hash(password, salt); 
        
        // http://avatar-placeholder.iran.liara.run/ //this is the web with random pic
        const boyProfilePic = 'http://avatar.iran.liara.run/public/boy?username=${username}';
        const girlProfilePic = 'http://avatar.iran.liara.run/public/girl?username=${username}';
        
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

export const logout = (req,res) =>{
    console.log("Logout");
};

export const login = async(req,res) =>{
    console.log("login");
};