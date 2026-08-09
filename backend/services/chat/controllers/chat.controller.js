import { Error } from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("User ID from header:", userId);
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const conversation = await Conversation.create({
      userId: userId,
    });

    return res.status(201).json({ conversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const conversations = await Conversation.find({ userId: userId }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({ conversations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateConversation = async(req, res) =>{
    try{
        const {conversationId, title} = req.body;

        const updateConversation = await Conversation.findByIdAndUpdate(
            conversationId,
            { title },
            { new : true}
        );

        return res.status(200).json({updateConversation});

    } catch(error){
        return res.status(500).json({error: error.message});
    }
}

export const saveMessage = async (req, res) => {
  try {
    const {conversationId, role, content} = req.body;

    if (!conversationId || !role || !content) {
      return res.status(400).json({ error: "conversationId, role, and content are required" });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = await Message.create({
      conversationId,
      role,
      content,
    });

    return res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
    try{
        const { conversationId } = req.params.conversationId;

        const messages = await Message.find({ conversationId }).sort({createdAt: -1});

        return res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
