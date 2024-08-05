import { Router } from "express";
import { verifytoken } from "../utils/token-manager.js";
import { chatcompeletionvalidator, validate } from "../utils/validators.js";
import { generatechatcompeletion } from "../controllers/chat-controller.js";


const chatRoutes = Router();


chatRoutes.post("/new",validate(chatcompeletionvalidator),verifytoken,generatechatcompeletion)


export default chatRoutes;