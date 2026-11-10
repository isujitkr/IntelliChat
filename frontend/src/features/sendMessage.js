import api from "../utils/axios";

const sendMessage = async(payload) =>{
    try {
        const {data} = await api.post("/api/agent/chat", payload);
        
        return data;
    } catch (error) {
        throw error;
    }
}

export default sendMessage;