import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message:{
        type: String,
        required: true
    },
    //createdAt, updatedAt => message.createdAt:15:30
}, {timestamps: true});
// when we create an messge will have createdAt
// and updatedAt field, with this timestamp
//mongodb will auto get the time for us

const Message = mongoose.model("Message", messageSchema);

export default Message;