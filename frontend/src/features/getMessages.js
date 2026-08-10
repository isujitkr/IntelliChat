import api from "../utils/axios";

const getMessages = async(id) =>{
    try {
        const {data} = await api.get(`/api/chat/get-messages/${id}`);
        return data.messages;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getMessages;