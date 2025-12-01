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
        model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
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

export interface StructuredMealPlan {
    breakfast: { name: string; calories: number }[];
    lunch: { name: string; calories: number }[];
    snack: { name: string; calories: number }[];
    dinner: { name: string; calories: number }[];
    explanation: string;
    totalCalories: number;
}

export const generateStructuredDietPlan = async (
    userProfile: any,
    goal: string
): Promise<StructuredMealPlan | null> => {
    const modelInstance = initModel();

    if (!modelInstance) {
        throw new Error("VITE_GEMINI_API_KEY is missing. Please add it to your .env file.");
    }

    try {
        const prompt = `
You are an expert Nutritionist and AI Health Coach.
Create a personalized daily diet plan for the following user:

User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Height: ${userProfile.height} cm
- Weight: ${userProfile.weight} kg
- Activity Level: ${userProfile.activityLevel || "Moderate"}
- Primary Goal: ${goal}

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just the JSON):
{
  "breakfast": [{"name": "Food Item", "calories": 300}, ...],
  "lunch": [{"name": "Food Item", "calories": 400}, ...],
  "snack": [{"name": "Food Item", "calories": 150}, ...],
  "dinner": [{"name": "Food Item", "calories": 500}, ...],
  "explanation": "Brief explanation of why this plan suits the user's goal",
  "totalCalories": 1800
}

Provide 2-4 items per meal with realistic calorie counts.
`.trim();

        const result = await modelInstance.generateContent(prompt);
        const text = result.response.text();

        // Remove markdown code blocks if present
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            const parsed = JSON.parse(cleanedText);
            return parsed as StructuredMealPlan;
        } catch (parseError) {
            console.error("JSON parsing error:", parseError, "Raw text:", cleanedText);
            throw new Error("Failed to parse diet plan response");
        }
    } catch (error: any) {
        console.error("Gemini API Error (Structured Diet Plan):", error);
        throw error;
    }
};

export interface StructuredWorkoutPlan {
    cardio: { name: string; duration: number; intensity: string }[];
    strength: { name: string; duration: number; sets?: number; reps?: number }[];
    flexibility: { name: string; duration: number }[];
    explanation: string;
    totalDuration: number;
}

export const generateStructuredWorkoutPlan = async (
    userProfile: any,
    goal: string
): Promise<StructuredWorkoutPlan | null> => {
    const modelInstance = initModel();

    if (!modelInstance) {
        throw new Error("VITE_GEMINI_API_KEY is missing. Please add it to your .env file.");
    }

    try {
        const prompt = `
You are an expert Fitness Trainer and AI Health Coach.
Create a personalized daily workout plan for the following user:

User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Height: ${userProfile.height} cm
- Weight: ${userProfile.weight} kg
- Activity Level: Moderate
- Primary Goal: ${goal}

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just the JSON):
{
  "cardio": [{"name": "Running", "duration": 30, "intensity": "Moderate"}, ...],
  "strength": [{"name": "Push-ups", "duration": 15, "sets": 3, "reps": 12}, ...],
  "flexibility": [{"name": "Stretching", "duration": 10}, ...],
  "explanation": "Brief explanation of why this workout suits the user's goal",
  "totalDuration": 90
}

Provide 2-3 exercises per category with realistic durations (in minutes) and intensities.
For strength exercises, include sets and reps when applicable.
`.trim();

        const result = await modelInstance.generateContent(prompt);
        const text = result.response.text();

        // Remove markdown code blocks if present
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            const parsed = JSON.parse(cleanedText);
            return parsed as StructuredWorkoutPlan;
        } catch (parseError) {
            console.error("JSON parsing error:", parseError, "Raw text:", cleanedText);
            throw new Error("Failed to parse workout plan response");
        }
    } catch (error: any) {
        console.error("Gemini API Error (Structured Workout Plan):", error);
        throw error;
    }
};
