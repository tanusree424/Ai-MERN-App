import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    prompt:{
        type:String,
        required:true
    },
    response: {
        type:String
    }
} ,{timestamps:true});

const chats = mongoose.model("chats" , chatSchema);

export default chats;