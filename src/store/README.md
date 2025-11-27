# Redux Store Documentation

## Overview
This directory contains the Redux Toolkit store configuration and slices for the AI Health Coach application.

## Structure
```
store/
├── store.ts          # Main store configuration
├── hooks.ts          # Typed Redux hooks
├── slices/
│   └── userSlice.ts  # User data slice
└── README.md         # This file
```

## User Slice

### State Structure
```typescript
interface UserProfileData {
  name: string;
  age: number;
  gender: string;
  sex: string;
  height: number;  // in cm
  weight: number;  // in kg
  goal: string;
}

interface UserSliceState {
  userData: UserProfileData | null;
  isLoading: boolean;
  error: string | null;
}
```

### Available Actions

#### `setUserData(userData: UserProfileData)`
Sets the complete user data object.

**Example:**
```typescript
import { useAppDispatch } from '../store/hooks';
import { setUserData } from '../store/slices/userSlice';

const dispatch = useAppDispatch();
dispatch(setUserData({
  name: 'John Doe',
  age: 30,
  gender: 'Male',
  sex: 'Male',
  height: 175,
  weight: 75,
  goal: 'Lose weight'
}));
```

#### `updateUserData(partialData: Partial<UserProfileData>)`
Updates specific fields in the user data without replacing the entire object.

**Example:**
```typescript
dispatch(updateUserData({ weight: 73, goal: 'Build muscle' }));
```

#### `clearUserData()`
Clears all user data from the store.

**Example:**
```typescript
dispatch(clearUserData());
```

#### `setLoading(isLoading: boolean)`
Sets the loading state.

**Example:**
```typescript
dispatch(setLoading(true));
```

#### `setError(errorMessage: string)`
Sets an error message and stops loading.

**Example:**
```typescript
dispatch(setError('Failed to load user data'));
```

## Using the Store in Components

### 1. Import the typed hooks
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
```

### 2. Access state
```typescript
const { userData, isLoading, error } = useAppSelector((state) => state.user);
```

### 3. Dispatch actions
```typescript
const dispatch = useAppDispatch();
dispatch(setUserData(newData));
```

## Complete Example

See `src/components/UserProfileExample.tsx` for a complete working example of how to use the user slice in a component.

## Best Practices

1. **Always use typed hooks** (`useAppDispatch` and `useAppSelector`) instead of the plain Redux hooks
2. **Use `updateUserData`** for partial updates instead of fetching the entire state and calling `setUserData`
3. **Handle loading and error states** in your components for better UX
4. **Keep user data in sync** with your backend by dispatching actions after API calls
