
import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DailyHabitData {
    date: string; // ISO date string (YYYY-MM-DD)
    waterIntake: number; // in ml
    sleepHours: number; // hours of sleep
    stressLevel: number; // 1-10 scale
    mood: string; // e.g., "Happy", "Sad", "Neutral"
    energyLevel: number; // 1-10 scale
    alcoholIntake: number; // number of drinks
    smoking: number; // number of cigarettes
    screenTime?: number; // in minutes
    wakeUpTime?: string; // HH:MM format
    meditationMinutes?: number; // in minutes
}

interface DailyHabitsSliceState {
    habits: Record<string, DailyHabitData>;
    todayDate: string;
    isLoading: boolean;
    error: string | null;
}

const getTodayDate = () => new Date().toISOString().split('T')[0];

const storedHabits = localStorage.getItem("dailyHabits");
const userStoredHabits: Record<string, DailyHabitData> = storedHabits ? JSON.parse(storedHabits) : {};

const initialState: DailyHabitsSliceState = {
    habits: userStoredHabits,
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
            localStorage.setItem("dailyHabits", JSON.stringify(state.habits));
            state.error = null;
        },
        updateDailyHabit: (state, action: PayloadAction<{ date: string; data: Partial<DailyHabitData> }>) => {
            const { date, data } = action.payload;
            if (state.habits[date]) {
                state.habits[date] = { ...state.habits[date], ...data };
            } else {
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
                };
            }
            localStorage.setItem("dailyHabits", JSON.stringify(state.habits));
            state.error = null;
        },
        deleteDailyHabit: (state, action: PayloadAction<string>) => {
            delete state.habits[action.payload];
            localStorage.setItem("dailyHabits", JSON.stringify(state.habits));
        },
        setMultipleDailyHabits: (state, action: PayloadAction<DailyHabitData[]>) => {
            action.payload.forEach(habit => {
                state.habits[habit.date] = habit;
            });
            localStorage.setItem("dailyHabits", JSON.stringify(state.habits));
            state.error = null;
        },
        clearAllHabits: (state) => {
            state.habits = {};
            state.error = null;
            localStorage.removeItem("dailyHabits");
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
