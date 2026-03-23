import axios from "axios";
import chats from "../model/ChatModel.js";
import { model } from "mongoose";
import { json } from "express";
import dotenv from "dotenv"
import OpenAI from "openai"
dotenv.config();

const askAI  = async (req,res) => {
    try {
        const {prompt} = req.body;
       
      const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    // model: "openrouter/free",
    // model:"gpt-4o",
    model: "openrouter/auto" ,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

        const answer = response.data.choices[0].message.content;
        return res.json({answer})
    } catch (error) {
        console.log("FULL ERROR:", error.response?.data || error?.message);
    res.status(500).send(error.response?.data || error.message);
    }

}


const saveChat = async (req, res) => {
  try {
    const { prompt, answer } = req.body;
     if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const chat = new chats({
      prompt,
      response: answer
    });

    await chat.save();

    return res.status(201).json({
      message: "Chat Saved Successfully"
    });

  } catch (error) {
    console.log(error); // 🔥 debug

    return res.status(500).json({
      message: "Error saving"
    });
  }
};

export {askAI , saveChat};
