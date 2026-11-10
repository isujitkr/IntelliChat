import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
});

export const getModel = (agent) => {
    switch (agent) {
        case "search":
            return gemini;
        case "chat":
            return gemini;
        case "coding":
            return gemini;
      
        default:
            return gemini;
    }
}