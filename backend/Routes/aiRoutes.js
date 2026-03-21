import express from "express"
import { askAI, saveChat } from "../Controllers/AiController.js";

const aiRoutes = express.Router();
aiRoutes.post("/ask-ai", askAI);
aiRoutes.post("/save", saveChat)

export default aiRoutes;