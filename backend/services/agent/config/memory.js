import redis from "../../../shared/redis/redis.js"
import { getMessages } from "../utils/getMessages.js";

export const memory = async (conversationId) => {
    const key = `messages-${conversationId}`;

    const cachedData = await redis.get(key);

    if(cachedData) return JSON.parse(cachedData);

    const messages = await getMessages(conversationId);

    await redis.set(key, JSON.stringify(messages),"EX", 24 * 60 * 60);

    return messages;
}

export const addMessage = async (conversationId, role, content) =>{
    const key = `messages-${conversationId}`;

    const cachedData = await redis.get(key);
    const messages = cachedData? JSON.parse(cachedData): [];

    messages.push({
        role, content
    });

    if(messages.length > 20){
        messages.shift();
    }

    await redis.set(key,JSON.stringify(messages));

}