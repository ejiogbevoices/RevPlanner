
import { GoogleGenAI } from "@google/genai";

export async function getFinancialInsights(prompt: string) {
  // Always use process.env.API_KEY directly for client initialization.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class SaaS CFO and startup strategist specializing in the Y Combinator ecosystem. Analyze the user's pricing model and provide 3-4 actionable, concise insights on how to improve ARR or user acquisition strategy based on industry standards for the selected YC-backed sector. Focus on seat-based expansion, CAC/LTV dynamics, and conversion feasibility.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate insights at this moment. Please check your inputs.";
  }
}
