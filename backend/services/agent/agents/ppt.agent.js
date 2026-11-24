import { getModel } from "../config/llmModels.js";
import { generatePpt } from "../utils/generatePpt.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const pptAgent = async (state) => {
  try {
    const llm = getModel("ppt");

    const prompt = `Your are a professional presentation designer.
        Return Only Valid JSON.
        
        Format:
        {
            "title": "",
            "subtitle":"",
            "slides":[
                {
                    "title":"",
                    "points": ["","","",""]
                }
            ]
        }

        Rules:
        -Generate exactly 6 content slides.
        -Each slide should have 4-6 concise bullet points.
        -No markdown.
        -No explanations.
        -No code blocks.
        -Return only JSON

        Topic: ${state.prompt}
            `;

    const res = await llm.invoke(prompt);

    const data = JSON.parse(res.content);

    const ppt = await generatePpt(data);

    const buffer = await ppt.write({
      outputType: "nodebuffer",
    });

    const fileName = `ppt-${Date.now()}.pptx`;

    const contentType =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    await uploadToS3(fileName, buffer, contentType);
    const downloadUrl = await getFromS3(fileName, 60 * 10);

    return {
      ...state,
      aiResponse: `
# Presentation Generated

**${data.title}**

[Download PPT](${downloadUrl})

⌛ Link expires in 10 minutes.
`,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      aiResponse: error,
    };
  }
};
