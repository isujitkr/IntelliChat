import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js"
import { memory } from "../config/memory.js";

export const chatAgent = async(state) =>{
    const llm = await getModel("chat");

    const history = await memory(state.conversationId);

    const systemPrompt = `
    Your ara IntelliChat, an intelligent AI assistant.

    Rules:
    -For simple questions, greetings and short queries, response naturally in plain text.
    -For technical, educational, coding or detailed topics, use clean Markdown.

    Formatting:
        -Use # for titles and ## for sections.
        -Leave a black line after headings.
        -use bullet points for lists.
        -Use numbered lists for steps.
        -Use fenced code blocks with language tags for code.
        -Keep paragraphs short and readable.
        -Never write headings and content on the same line.
        -Never generate large walls of text.
    `
    const messages = [
        new SystemMessage(systemPrompt)
    ];

    history.forEach(msg => {
        if(msg.role === "user"){
            messages.push(new HumanMessage(msg.content))
        }
        if(msg.role === "assistant") {
            messages.push(new AIMessage(msg.content))
        }
    });

    messages.push(new HumanMessage(state.prompt));

    const response = await llm.invoke(messages);

    return {
        ...state,
        aiResponse: response.content
    }
}