# Daily Habits Slice Documentation

## Overview
The daily habits slice manages user's daily health and fitness tracking data including water intake, sleep, calories, exercise, steps, and meals.

## Data Structure

### DailyHabitData Interface
```typescript
interface DailyHabitData {
  date: string;              // ISO date string (YYYY-MM-DD)
  waterIntake: number;       // in ml
  sleepHours: number;        // hours of sleep
  caloriesConsumed: number;  // total calories
  exerciseMinutes: number;   // minutes of exercise
  stepsCount: number;        // number of steps
  mealsLogged: number;       // number of meals logged
  notes?: string;            // optional notes for the day
}
```

### State Structure
```typescript
interface DailyHabitsSliceState {
  habits: Record<string, DailyHabitData>; // key is date string
  todayDate: string;
  isLoading: boolean;
  error: string | null;
}
```

## Available Actions

### `setDailyHabit(habitData: DailyHabitData)`
Sets the complete habit data for a specific date.

**Example:**
```typescript
import { useAppDispatch } from '../store/hooks';
import { setDailyHabit } from '../store/slices/dailyHabitsSlice';

const dispatch = useAppDispatch();
dispatch(setDailyHabit({
  date: '2025-11-28',
  waterIntake: 2000,
  sleepHours: 7.5,
  caloriesConsumed: 1800,
  exerciseMinutes: 45,
  stepsCount: 8500,
  mealsLogged: 3,
  notes: 'Great day!'
}));
```

### `updateDailyHabit({ date, data })`
Updates specific fields for a date. Creates a new entry if it doesn't exist.

**Example:**
```typescript
dispatch(updateDailyHabit({
  date: '2025-11-28',
  data: { waterIntake: 2500, stepsCount: 10000 }
}));
```

### `deleteDailyHabit(date: string)`
Deletes habit data for a specific date.

**Example:**
```typescript
dispatch(deleteDailyHabit('2025-11-28'));
```

### `setMultipleDailyHabits(habits: DailyHabitData[])`
Sets multiple habit entries at once (useful for bulk import or sync).

**Example:**
```typescript
dispatch(setMultipleDailyHabits([
  { date: '2025-11-26', waterIntake: 2000, ... },
  { date: '2025-11-27', waterIntake: 2200, ... },
]));
```

### `clearAllHabits()`
Clears all habit data.

### `updateTodayDate()`
Updates the today date reference (useful when app runs overnight).

## Custom Selectors

### `useTodayHabits()`
Gets today's habit data.

**Example:**
```typescript
import { useTodayHabits } from '../store/selectors';

const todayHabits = useTodayHabits();
console.log(todayHabits?.waterIntake); // 2000
```

### `useHabitsByDate(date: string)`
Gets habit data for a specific date.

**Example:**
```typescript
import { useHabitsByDate } from '../store/selectors';

const habits = useHabitsByDate('2025-11-28');
```

### `useAllHabits()`
Gets all habit data.

**Example:**
```typescript
import { useAllHabits } from '../store/selectors';

const allHabits = useAllHabits();
```

### `useHabitsInRange(startDate: string, endDate: string)`
Gets habits within a date range.

**Example:**
```typescript
import { useHabitsInRange } from '../store/selectors';

const weekHabits = useHabitsInRange('2025-11-21', '2025-11-28');
```

### `useWeeklyAverages()`
Calculates weekly averages for all metrics.

**Example:**
```typescript
import { useWeeklyAverages } from '../store/selectors';

const {
  avgWaterIntake,
  avgSleepHours,
  avgCalories,
  avgExerciseMinutes,
  avgSteps,
  daysTracked
} = useWeeklyAverages();
```

### `useCurrentStreak()`
Gets the current consecutive days streak.

**Example:**
```typescript
import { useCurrentStreak } from '../store/selectors';

const streak = useCurrentStreak(); // 7 (days)
```

## Usage Example

```typescript
import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { useTodayHabits, useWeeklyAverages } from '../store/selectors';
import { updateDailyHabit } from '../store/slices/dailyHabitsSlice';

const DailyHabitsTracker = () => {
  const dispatch = useAppDispatch();
  const todayHabits = useTodayHabits();
  const weeklyAvg = useWeeklyAverages();
  const [waterIntake, setWaterIntake] = useState(todayHabits?.waterIntake || 0);

  const handleUpdateWater = () => {
    const today = new Date().toISOString().split('T')[0];
    dispatch(updateDailyHabit({
      date: today,
      data: { waterIntake }
    }));
  };

  return (
    <div>
      <h2>Today's Water Intake: {todayHabits?.waterIntake || 0} ml</h2>
      <h3>Weekly Average: {weeklyAvg.avgWaterIntake} ml</h3>
      <input 
        type="number" 
        value={waterIntake} 
        onChange={(e) => setWaterIntake(Number(e.target.value))}
      />
      <button onClick={handleUpdateWater}>Update</button>
    </div>
  );
};
```

## Best Practices

1. **Use selectors** instead of directly accessing state for computed values
2. **Update incrementally** using `updateDailyHabit` rather than replacing entire entries
3. **Date format** always use YYYY-MM-DD format for consistency
4. **Batch updates** use `setMultipleDailyHabits` when syncing from backend
5. **Call `updateTodayDate()`** when the app resumes after being idle overnight
