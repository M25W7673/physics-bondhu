const { GoogleGenAI } = require("@google/genai");
const systemPrompt = require("../prompts/systemPrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function askGemini(userMessage) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}

Student Question:
${userMessage}`,
  });

  return response.text;
}

module.exports = { askGemini };