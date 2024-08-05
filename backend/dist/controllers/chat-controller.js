import User from "../models/User.js";
import { configureopenAi } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generatechatcompeletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not regsitered or token maifuncctioned" });
        }
        // grab chat of uSER
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        //SEND ALL CHAT WITH NEW ONE
        const config = configureopenAi();
        const openai = new OpenAIApi(config);
        const chatresponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatresponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        return res.status(500).json({ message: "Something is wrong" });
    }
    //GET LATEST RESPONSE 
};
//# sourceMappingURL=chat-controller.js.map