import api from "../utils/axios";

const sendMessage = async(payload) =>{
    try {
        const {data} = await api.post("/api/agent/chat", payload);
        
        return data.response;
    } catch (error) {
        console.log("Error in send message: ", error.message);
        return null;
    }
}

export default sendMessage;