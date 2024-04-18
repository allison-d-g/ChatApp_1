import mongoose, { trusted } from "mongoose";

const userInfo = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
        minlength: 8,
    },
    gender:{
        type:String,
        required: true,
        enum:["Male", "Female"], //set the options
    },
    profilePic:{
        type: String,
        default:"",
    },
});

const User = mongoose.model("User", userInfo);

export default User;