import { getModel } from "../config/llmModels.js";

export const codingAgent = async (state) => {
  const intentLlm = await getModel("intent");
  const codeGenLlm = await getModel("coding");

  const intentResponse = await intentLlm.invoke(
    `You are an AI agent that is responsible for determining the intent of a user's query. Your task is to analyze the user's input and classify and return it into one of the following categories: "CODE_GENERATION", "CODE_REVIEW","CODE_EXPLANATION", "DEBUGGING", "OPTIMIZATION", "CONVERSION", "DOCUMENTATION".
        
        User Request: ${state.prompt}`,
  );

  const intent = intentResponse.content.trim();

  if (intent === "CODE_GENERATION") {

    const prompt = `
        You are IntelliChat, an AI agent that is responsible for generating code based on user requirements. Your task is to analyze the user's input and generate clean, correct, efficient, and maintainable code in the programming language requested by the user.

        Generate the requested project.

        Default Stack:
        - HTML
        - CSS
        - JavaScript

        Use React/ Next/ Vue or any another technology if requested
        
        Rules:
        -Responsive
        -Clean and maintainable code
        -Follow best practices
        -Include comments and documentation where necessary
        -Include error handling and input validation
        -Follow secure coding practices

        IMAGES
        ==============
        Always use real Unsplash images.
        Always use working link 
        Never use placeholders.

        Return only valid JSON output with the following Schema:

        {
            "files":[
                {
                    "name": "filename.ext",
                    "content": "code content here"
                },
                {
                    "name": "filename.ext",
                    "content": "code content here"
                }
            ]
        }


        User Request: ${state.prompt}
    `;
    const codeGenResponse = await codeGenLlm.invoke(prompt);

    let content = codeGenResponse.content;

    content = content
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
    
    const data = JSON.parse(content);

    return {
        ...state,
        aiResponse: "Code Generated Successfully",
        artifacts: [
            {
                id: Date.now(),
                type: "Project",
                files: data.files || [],
                title: state.prompt
            }
        ]
    };
  }

  const res = await codeGenLlm.invoke(`
    The user's request is : ${intent}

    Return Markdown only.

    Never generate project files.

    Use headings, subheadings, bullet points, and code blocks to organize the information.

    Explain the code in detail, including its purpose, functionality, and any relevant context.

    User Request: ${state.prompt}
    `)

  const data = res.content;

  return {
    ...state,
    aiResponse: data,
    artifacts: []
  };
};
