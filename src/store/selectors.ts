import { useAppSelector } from './hooks';
import type { AppRootState } from './store';

/**
 * Selector to get today's habit data
 */
export const useTodayHabits = () => {
    return useAppSelector((state: AppRootState) => {
        const todayDate = state.dailyHabits.todayDate;
        return state.dailyHabits.habits[todayDate] || null;
    });
};

/**
 * Selector to get habit data for a specific date
 */
export const useHabitsByDate = (date: string) => {
    return useAppSelector((state: AppRootState) => {
        return state.dailyHabits.habits[date] || null;
    });
};

/**
 * Selector to get all habits
 */
export const useAllHabits = () => {
    return useAppSelector((state: AppRootState) => state.dailyHabits.habits);
};

/**
 * Selector to get habits for a date range
 */
export const useHabitsInRange = (startDate: string, endDate: string) => {
    return useAppSelector((state: AppRootState) => {
        const habits = state.dailyHabits.habits;
        const filteredHabits: typeof habits = {};

        Object.keys(habits).forEach(date => {
            if (date >= startDate && date <= endDate) {
                filteredHabits[date] = habits[date];
            }
        });

        return filteredHabits;
    });
};

/**
 * Selector to get weekly average statistics
 */
export const useWeeklyAverages = () => {
    return useAppSelector((state: AppRootState) => {
        const habits = state.dailyHabits.habits;
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const weekHabits = Object.values(habits).filter(habit => {
            const habitDate = new Date(habit.date);
            return habitDate >= sevenDaysAgo && habitDate <= today;
        });

        if (weekHabits.length === 0) {
            return {
                avgWaterIntake: 0,
                avgSleepHours: 0,
                avgCalories: 0,
                avgExerciseMinutes: 0,
                avgSteps: 0,
                daysTracked: 0,
            };
        }

        const totals = weekHabits.reduce(
            (acc, habit) => ({
                waterIntake: acc.waterIntake + habit.waterIntake,
                sleepHours: acc.sleepHours + habit.sleepHours,
                caloriesConsumed: acc.caloriesConsumed + habit.caloriesConsumed,
                exerciseMinutes: acc.exerciseMinutes + habit.exerciseMinutes,
                stepsCount: acc.stepsCount + habit.stepsCount,
            }),
            {
                waterIntake: 0,
                sleepHours: 0,
                caloriesConsumed: 0,
                exerciseMinutes: 0,
                stepsCount: 0,
            }
        );

        const count = weekHabits.length;

        return {
            avgWaterIntake: Math.round(totals.waterIntake / count),
            avgSleepHours: Math.round((totals.sleepHours / count) * 10) / 10,
            avgCalories: Math.round(totals.caloriesConsumed / count),
            avgExerciseMinutes: Math.round(totals.exerciseMinutes / count),
            avgSteps: Math.round(totals.stepsCount / count),
            daysTracked: count,
        };
    });
};

/**
 * Selector to get current streak (consecutive days with data)
 */
export const useCurrentStreak = () => {
    return useAppSelector((state: AppRootState) => {
        const habits = state.dailyHabits.habits;
        const today = new Date();
        let streak = 0;

        // Check backwards from today
        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];

            if (habits[dateStr]) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    });
};
