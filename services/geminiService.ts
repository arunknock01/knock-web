import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// We assume process.env.API_KEY is available as per instructions.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLogoConcept = async (customPrompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const modelId = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are an expert SVG Graphics Designer and Frontend Engineer specializing in Minimalist, Apple-style, and Geometric logo design.
    
    Your task is to generate raw SVG code for a logo concept based on the user's description.
    
    Constraints:
    1. Output ONLY the raw <svg>...</svg> code. Do not wrap it in markdown blocks (like \`\`\`xml). Do not add explanations.
    2. The SVG must be strictly Black and White (or currentColor).
    3. The design must be minimal, abstract, and follow the "Knock" brand guidelines: broken circles, portals, soft rounded edges.
    4. ViewBox should be "0 0 100 100".
    5. Use minimalist strokes and geometric shapes.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: customPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Some creativity, but structurally sound
      }
    });

    let text = response.text || '';
    
    // Cleanup if model adds markdown despite instructions
    text = text.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
