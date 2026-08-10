import { getModel } from "../config/llmModels.js"

export const router = async(state) =>{
    const llm = await getModel("router");

    const prompt = `You are an agent router.
    
    Available agents:
        -chat
        -search
        -coding
        -pdf
        -ppt
        -vision

    Rules:
        chat:
            General coversation,
            Explanation,
            Learning,
            Questions.
        
        search:
            Current Events,
            Latest Information,
            News,
            Recent Developments,
            Internet Lookup.

        coding:
            Generate code,
            Debug code,
            Build Projects,
            Architecture,
            API Design,
            Database,
            Programming Language.

        pdf:
            Questions about generate PDFs or document context.
        
        ppt:
            Questions about generate ppts or ppt context.

        vision:
            Generate Image,
            Create Image
    

    Return ONLY One word:
        chat
        search
        coding
        pdf
        ppt
        vision

    User Query
        ${state.prompt}
    ` 

    const response = await llm.invoke(prompt);

    return {
        ...state,
        agent: response.content.trim().toLowerCase()
    }
}