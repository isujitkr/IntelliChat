import axios from 'axios';
import { graph } from '../graph/graph.js';
import { addMessage } from '../config/memory.js';

export const agent = async (req, res) =>{
    try {
        const {prompt, conversationId, agent} = req.body;

        if(!prompt || !conversationId){
            return res.status(400).json({message : "Both prompt and conversationId required"});
        }

        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId,
            role: "user",
            content: prompt
        });

        const result = await graph.invoke({
            prompt,
            conversationId,
            agent
        })

        const response = result.aiResponse;

        await addMessage(conversationId, "user", prompt);
        await addMessage(conversationId, "assistant", response);

        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId,
            role: "assistant",
            content: response,
            images: result.images
        });

        return res.status(200).json({
            answer: response,
            images: result.images
        });
        
    } catch (error) {
        return res.status(500).json( {error: error.message});
    }
}