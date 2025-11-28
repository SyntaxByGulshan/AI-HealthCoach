
import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DailyWorkout {
    date: string;
    walking: number; // minutes
    running: number; // minutes
    gymTime: number; // minutes
}

interface WorkoutState {
    history: Record<string, DailyWorkout>;
    currentDate: string;
}

const storedHistory = localStorage.getItem("workoutHistory");
const initialState: WorkoutState = {
    history: storedHistory ? JSON.parse(storedHistory) : {},
    currentDate: new Date().toISOString().split('T')[0],
};

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
});

export const { setCurrentDate, updateWorkout, clearWorkoutHistory } = workoutSlice.actions;
export default workoutSlice.reducer;
