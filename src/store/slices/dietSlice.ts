

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { generateStructuredDietPlan, type StructuredMealPlan } from '../../services/gemini';

export interface MealItem {
    id: string;
    name: string;
    calories?: number;
    isCustom: boolean;
}

export interface DailyDiet {
    date: string;
    breakfast: MealItem[];
    lunch: MealItem[];
    snack: MealItem[];
    dinner: MealItem[];
}

interface DietState {
    history: Record<string, DailyDiet>;
    currentDate: string;
    structuredPlan: StructuredMealPlan | null;
    planDate: string | null; // Date when plan was generated
    loading: boolean;
    error: string | null;
}

const storedHistory = localStorage.getItem("dietHistory");
const storedStructuredPlan = localStorage.getItem("structuredDietPlan");
const storedPlanDate = localStorage.getItem("dietPlanDate");

const initialState: DietState = {
    history: storedHistory ? JSON.parse(storedHistory) : {},
    currentDate: new Date().toISOString().split('T')[0],
    structuredPlan: storedStructuredPlan ? JSON.parse(storedStructuredPlan) : null,
    planDate: storedPlanDate || null,
    loading: false,
    error: null,
};

export const fetchStructuredDietPlan = createAsyncThunk(
    'diet/fetchStructuredDietPlan',
    async ({ userProfile, goal }: { userProfile: any; goal: string }, { rejectWithValue }) => {
        try {
            const response = await generateStructuredDietPlan(userProfile, goal);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to generate structured diet plan");
        }
    }
);

const dietSlice = createSlice({
    name: 'diet',
    initialState,
    reducers: {
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
        addMeal: (state, action: PayloadAction<{ date: string; type: keyof Omit<DailyDiet, 'date'>; item: MealItem }>) => {
            const { date, type, item } = action.payload;
            if (!state.history[date]) {
                state.history[date] = {
                    date,
                    breakfast: [],
                    lunch: [],
                    snack: [],
                    dinner: [],
                };
            }
            state.history[date][type].push(item);
            localStorage.setItem("dietHistory", JSON.stringify(state.history));
        },
        removeMeal: (state, action: PayloadAction<{ date: string; type: keyof Omit<DailyDiet, 'date'>; id: string }>) => {
            const { date, type, id } = action.payload;
            if (state.history[date]) {
                state.history[date][type] = state.history[date][type].filter(item => item.id !== id);
                localStorage.setItem("dietHistory", JSON.stringify(state.history));
            }
        },
        clearDietHistory: (state) => {
            state.history = {};
            localStorage.removeItem("dietHistory");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStructuredDietPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStructuredDietPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.structuredPlan = action.payload;
                const today = new Date().toISOString().split('T')[0];
                state.planDate = today;
                localStorage.setItem("structuredDietPlan", JSON.stringify(action.payload));
                localStorage.setItem("dietPlanDate", today);
            })
            .addCase(fetchStructuredDietPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentDate, addMeal, removeMeal, clearDietHistory } = dietSlice.actions;
export default dietSlice.reducer;
