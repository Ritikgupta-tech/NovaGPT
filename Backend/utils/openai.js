import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getOpenAIAPIResponse = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
    });

    console.log("Gemini Response:");
    console.log(response.text);

    return response.text;
  } catch (err) {
    console.log("Gemini Error:", err.message);

    return `Gemini Error: ${err.message}`;
  }
};

export default getOpenAIAPIResponse;