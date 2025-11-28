// src/lib/healthCoach.ts
import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Instances (lazy-loaded if key exists)
let genAI: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

// Initialize model safely
const initModel = () => {
    if (!API_KEY) return null;

    // Initialize only if not already created
    if (!genAI) {
        genAI = new GoogleGenerativeAI(API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    return model;
};

export const getHealthAdvice = async (
    context: string,
    userMessage: string
): Promise<string> => {

    const modelInstance = initModel();

    if (!modelInstance) {
        return "Error: VITE_GEMINI_API_KEY is missing. Please add it to your .env file.";
    }

    try {
        const prompt = `
You are an AI Personal Health Coach. You analyze user's daily data and provide useful advice.

Context:
${context}

User Message:
${userMessage}

Respond with personalized, motivational, and practical health advice. 
Keep answers under 150 words unless the user requests detailed explanation.
`.trim();

        const result = await modelInstance.generateContent(prompt);
        const text = result.response.text();
        return text || "No response generated.";
    }
    catch (error: any) {
        console.error("Gemini API Error:", error);
        return `Error: ${error.message || "Unknown error occurred"}`;
    }
};
