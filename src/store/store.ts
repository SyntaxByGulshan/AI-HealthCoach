import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import dailyHabitsReducer from './slices/dailyHabitsSlice';
import dietReducer from './slices/dietSlice';
import workoutReducer from './slices/workoutSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        dailyHabits: dailyHabitsReducer,
        diet: dietReducer,
        workout: workoutReducer,
    },
});

// Infer the root state and dispatch types from the store itself
export type AppRootState = ReturnType<typeof store.getState>;
export type AppStoreDispatch = typeof store.dispatch;
