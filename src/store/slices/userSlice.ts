import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface UserProfileData {
    name: string;
    age: number;
    gender: string;
    height: number; // in cm
    weight: number; // in kg
    goal: "reduceWeight" | "gainWeight" | "maintainWeight";
}

interface UserSliceState {
    userData: UserProfileData | null;
    isLoading: boolean;
    error: string | null;
}

const storedUser = localStorage.getItem("user");
const userCurrentData: UserProfileData | null = storedUser ? JSON.parse(storedUser) : null;



const initialState: UserSliceState = {
    
    userData: userCurrentData||null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserProfileData>) => {
            state.userData = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload))
            state.error = null;
        },
        updateUserData: (state, action: PayloadAction<Partial<UserProfileData>>) => {
            if (state.userData) {
                state.userData = { ...state.userData, ...action.payload };
               // const user:UserProfileData|null = JSON.parse(localStorage.getItem("user")||'');
                 localStorage.setItem("user",JSON.stringify(state.userData))
                  
               
                
            }
        },
        
        clearUserData: (state) => {
            state.userData = null;
            state.error = null;
              localStorage.removeItem("user");
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

export const { setUserData, updateUserData, clearUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
