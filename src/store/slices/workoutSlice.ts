
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { generateStructuredWorkoutPlan, type StructuredWorkoutPlan } from '../../services/gemini';

export interface DailyWorkout {
    date: string;
    walking: number; // minutes
    running: number; // minutes
    gymTime: number; // minutes
}

interface WorkoutState {
    history: Record<string, DailyWorkout>;
    currentDate: string;
    structuredPlan: StructuredWorkoutPlan | null;
    planDate: string | null; // Date when plan was generated
    loading: boolean;
    error: string | null;
}

const storedHistory = localStorage.getItem("workoutHistory");
const storedStructuredPlan = localStorage.getItem("structuredWorkoutPlan");
const storedPlanDate = localStorage.getItem("workoutPlanDate");

const initialState: WorkoutState = {
    history: storedHistory ? JSON.parse(storedHistory) : {},
    currentDate: new Date().toISOString().split('T')[0],
    structuredPlan: storedStructuredPlan ? JSON.parse(storedStructuredPlan) : null,
    planDate: storedPlanDate || null,
    loading: false,
    error: null,
};

export const fetchStructuredWorkoutPlan = createAsyncThunk(
    'workout/fetchStructuredWorkoutPlan',
    async ({ userProfile, goal }: { userProfile: any; goal: string }, { rejectWithValue }) => {
        try {
            const response = await generateStructuredWorkoutPlan(userProfile, goal);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to generate structured workout plan");
        }
    }
);

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
        updateWorkout: (state, action: PayloadAction<{ date: string; field: keyof Omit<DailyWorkout, 'date'>; value: number }>) => {
            const { date, field, value } = action.payload;
            if (!state.history[date]) {
                state.history[date] = { date, walking: 0, running: 0, gymTime: 0 };
            }
            state.history[date][field] = value;
            localStorage.setItem("workoutHistory", JSON.stringify(state.history));
        },
        clearWorkoutHistory: (state) => {
            state.history = {};
            localStorage.removeItem("workoutHistory");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStructuredWorkoutPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStructuredWorkoutPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.structuredPlan = action.payload;
                const today = new Date().toISOString().split('T')[0];
                state.planDate = today;
                localStorage.setItem("structuredWorkoutPlan", JSON.stringify(action.payload));
                localStorage.setItem("workoutPlanDate", today);
            })
            .addCase(fetchStructuredWorkoutPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentDate, updateWorkout, clearWorkoutHistory } = workoutSlice.actions;
export default workoutSlice.reducer;
