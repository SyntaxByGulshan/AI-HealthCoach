import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: DietState = {
    history: {},
    currentDate: new Date().toISOString().split('T')[0],
};

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
        },
        removeMeal: (state, action: PayloadAction<{ date: string; type: keyof Omit<DailyDiet, 'date'>; id: string }>) => {
            const { date, type, id } = action.payload;
            if (state.history[date]) {
                state.history[date][type] = state.history[date][type].filter((item) => item.id !== id);
            }
        },
    },
});

export const { setCurrentDate, addMeal, removeMeal } = dietSlice.actions;
export default dietSlice.reducer;
