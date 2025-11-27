import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import dailyHabitsReducer from './slices/dailyHabitsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        dailyHabits: dailyHabitsReducer,
    },
});

// Infer the root state and dispatch types from the store itself
export type AppRootState = ReturnType<typeof store.getState>;
export type AppStoreDispatch = typeof store.dispatch;
