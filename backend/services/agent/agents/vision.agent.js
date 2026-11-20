import { getModel } from "../config/llmModels.js";
import axios from "axios";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";

export const visionAgent = async (state) => {
  try {
    const llm = await getModel("image");
    const res = await llm.invoke(`
        You are and elite AI Image prompt engineer.
        Convert the user request into a highly detailed image generation prompt.

        Requirements:

        -Cinematic Lighting
        -Professional composition
        -Ultra realistic
        -High Detail
        -Beautiful color palette
        -Sharp focus
        -8k quality
        -Depth of field
        -Stunning visuals
    
        Return only the image prompt

        User Request: ${state.prompt}
    `);

    const prompt = res.content.trim();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const buffer = Buffer.from(imageRes.data);
    const fileName = `image-${Date.now()}.png`;

    await uploadToS3(fileName, buffer, "image/png");
    const downloadUrl = await getFromS3(fileName, 10 * 60);

    return {
      ...state,
      aiResponse: `
![Generated Image](${downloadUrl})

[Download Image](${downloadUrl})

⌛ Link expires in 10 minutes
`,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: "❌ Failed to generate Image",
    };
  }
};
