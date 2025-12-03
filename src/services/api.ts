/**
 * Backend API Service
 * Handles communication with the FastAPI ML backend for TDEE predictions
 */

const BACKEND_URL = 'http://localhost:8000';

export interface UserStatsInput {
    age: number;
    gender: 'male' | 'female';
    weight: number; // kg
    height: number; // cm
    activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal: 'lose' | 'maintain' | 'gain';
    goal_weight?: number; // kg (optional)
}

export interface TDEEPredictionResponse {
    tdee: number; // kcal/day
    uncertainty: number; // kcal/day
    unit: string; // "kcal/day"
}

/**
 * Predict Total Daily Energy Expenditure (TDEE) using the trained ML model
 */
export async function predictTDEE(stats: UserStatsInput): Promise<TDEEPredictionResponse> {
    try {
        const response = await fetch(`${BACKEND_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stats),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Prediction failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Backend API Error:', error);
        throw error;
    }
}

/**
 * Check if the backend server is running
 */
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${BACKEND_URL}/`);
        return response.ok;
    } catch (error) {
        console.error('Backend health check failed:', error);
        return false;
    }
}

/**
 * Convert activity level from profile format to backend format
 */
export function mapActivityLevel(level: string): UserStatsInput['activity_level'] {
    const normalized = level.toLowerCase();
    const mapping: Record<string, UserStatsInput['activity_level']> = {
        'sedentary': 'sedentary',
        'lightly active': 'light',
        'moderately active': 'moderate',
        'very active': 'active',
        'extremely active': 'very_active',
        // Direct matches
        'light': 'light',
        'moderate': 'moderate',
        'active': 'active',
        'very_active': 'very_active'
    };
    return mapping[normalized] || 'moderate';
}

/**
 * Convert goal from profile format to backend format
 */
export function mapGoal(goal: string): UserStatsInput['goal'] {
    const normalized = goal.toLowerCase();
    const mapping: Record<string, UserStatsInput['goal']> = {
        'lose weight': 'lose',
        'maintain weight': 'maintain',
        'gain weight': 'gain',
        // Direct matches
        'lose': 'lose',
        'maintain': 'maintain',
        'gain': 'gain'
    };
    return mapping[normalized] || 'maintain';
}
