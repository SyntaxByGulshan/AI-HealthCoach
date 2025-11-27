import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DailyHabitData {
    date: string; // ISO date string (YYYY-MM-DD)
    waterIntake: number; // in ml
    sleepHours: number; // hours of sleep

    // Required fields with defaults
    stressLevel: number; // 1-10 scale
    mood: string; // e.g., "Happy", "Sad", "Neutral", "Anxious", "Energetic"
    energyLevel: number; // 1-10 scale
    alcoholIntake: number; // number of drinks
    smoking: number; // number of cigarettes

    // Optional fields
    screenTime?: number; // in minutes
    wakeUpTime?: string; // HH:MM format
    meditationMinutes?: number; // in minutes
}

interface DailyHabitsSliceState {
    habits: Record<string, DailyHabitData>; // key is date string
    todayDate: string;
    isLoading: boolean;
    error: string | null;
}

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const initialState: DailyHabitsSliceState = {
    habits: {},
    todayDate: getTodayDate(),
    isLoading: false,
    error: null,
};

const dailyHabitsSlice = createSlice({
    name: 'dailyHabits',
    initialState,
    reducers: {
        setDailyHabit: (state, action: PayloadAction<DailyHabitData>) => {
            state.habits[action.payload.date] = action.payload;
            state.error = null;
        },
        updateDailyHabit: (state, action: PayloadAction<{ date: string; data: Partial<DailyHabitData> }>) => {
            const { date, data } = action.payload;
            if (state.habits[date]) {
                state.habits[date] = { ...state.habits[date], ...data };
            } else {
                // Create new entry if it doesn't exist with defaults
                state.habits[date] = {
                    date,
                    waterIntake: 0,
                    sleepHours: 0,
                    stressLevel: 5,
                    mood: 'Neutral',
                    energyLevel: 5,
                    alcoholIntake: 0,
                    smoking: 0,
                    ...data,
                } as DailyHabitData;
            }
            state.error = null;
        },
        deleteDailyHabit: (state, action: PayloadAction<string>) => {
            delete state.habits[action.payload];
        },
        setMultipleDailyHabits: (state, action: PayloadAction<DailyHabitData[]>) => {
            action.payload.forEach(habit => {
                state.habits[habit.date] = habit;
            });
            state.error = null;
        },
        clearAllHabits: (state) => {
            state.habits = {};
            state.error = null;
        },
        updateTodayDate: (state) => {
            state.todayDate = getTodayDate();
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    setDailyHabit,
    updateDailyHabit,
    deleteDailyHabit,
    setMultipleDailyHabits,
    clearAllHabits,
    updateTodayDate,
    setLoading,
    setError,
} = dailyHabitsSlice.actions;

export default dailyHabitsSlice.reducer;
