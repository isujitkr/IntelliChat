import api from "../utils/axios"

export const updateConversation = async (payload) =>{
    try {
        const { data } = await api.post("/api/chat/update-conversation", payload);
        return data.updateConversation;
    } catch (error) {
        console.log("Error: ", error);
        return[];
    }
}