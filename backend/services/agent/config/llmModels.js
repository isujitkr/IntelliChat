import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
});

const openRouter = new ChatOpenRouter({
    model: "deepseek/deepseek-chat",
    temperature: 0,
    maxTokens: 2500,
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const getModel = (agent) => {
    switch (agent) {
        case "search":
            return gemini;
        case "chat":
            return grok;
        case "coding":
            return openRouter;
      
        default:
            return gemini;
    }
}