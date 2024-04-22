import Conversation from "../Info/conversation.js";
import Message from "../Info/message.js";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) =>{
    try {
        const {message} = req.body; //input
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        
        //find the conversation exist or not
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        });
        //not exist 
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId],
            });
        };

        //find the message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        };

        //save message and conversation into db
        // await conversation.save();
        // await newMessage.save();

        //this will make the two run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //socket io functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
    // console.log("message sent ", req.params.id);
};

export const getMessage = async(req, res) =>{
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages"); //this will give us the message itself

        if(!conversation) return res.status(200).json([]);

        res.status(201).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}