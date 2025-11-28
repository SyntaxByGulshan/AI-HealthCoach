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
                daysTracked: 0,
            };
        }

        const totals = weekHabits.reduce(
            (acc, habit) => ({
                waterIntake: acc.waterIntake + habit.waterIntake,
                sleepHours: acc.sleepHours + habit.sleepHours,
            }),
            {
                waterIntake: 0,
                sleepHours: 0,
            }
        );

        const count = weekHabits.length;

        return {
            avgWaterIntake: Math.round(totals.waterIntake / count),
            avgSleepHours: Math.round((totals.sleepHours / count) * 10) / 10,
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

// Goal constants
export const WATER_GOAL = 2000; // ml
export const SLEEP_GOAL = 8; // hours
export const WORKOUT_GOAL = 30; // minutes
export const DIET_GOAL = 4; // number of meal types (breakfast, lunch, snack, dinner)

/**
 * Selector to get daily goals completion status
 */
/**
 * Selector to calculate user's BMI
 */
export const useUserBMI = () => {
    return useAppSelector((state: AppRootState) => {
        const userData = state.user.userData;

        if (!userData || !userData.weight || !userData.height) {
            return {
                bmi: null,
                category: 'No data',
                color: 'gray'
            };
        }

        // BMI = weight(kg) / (height(m))^2
        const heightInMeters = userData.height / 100;
        const bmi = userData.weight / (heightInMeters * heightInMeters);

        // Determine BMI category
        let category = '';
        let color = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            color = 'blue';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
            color = 'green';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            color = 'yellow';
        } else {
            category = 'Obese';
            color = 'red';
        }

        return {
            bmi: Math.round(bmi * 10) / 10, // Round to 1 decimal place
            category,
            color
        };
    });
};

/**
 * Selector to get daily goals completion status
 */
export const useGoalsCompleted = () => {
    return useAppSelector((state: AppRootState) => {
        const todayDate = new Date().toISOString().split('T')[0];
        const todayHabits = state.dailyHabits.habits[todayDate];
        const todayDiet = state.diet.history[todayDate];
        const todayWorkout = state.workout.history[todayDate];

        // Water goal: >= 2000ml
        const waterGoalMet = (todayHabits?.waterIntake || 0) >= WATER_GOAL;

        // Sleep goal: >= 8 hours
        const sleepGoalMet = (todayHabits?.sleepHours || 0) >= SLEEP_GOAL;

        // Diet goal: At least 1 meal in each of 4 meal types
        const dietGoalMet = todayDiet
            ? (todayDiet.breakfast?.length || 0) > 0 &&
            (todayDiet.lunch?.length || 0) > 0 &&
            (todayDiet.snack?.length || 0) > 0 &&
            (todayDiet.dinner?.length || 0) > 0
            : false;

        // Workout goal: >= 30 minutes total
        const totalWorkout = todayWorkout
            ? (todayWorkout.walking || 0) + (todayWorkout.running || 0) + (todayWorkout.gymTime || 0)
            : 0;
        const workoutGoalMet = totalWorkout >= WORKOUT_GOAL;

        // Calculate total completed
        const totalCompleted = [waterGoalMet, sleepGoalMet, dietGoalMet, workoutGoalMet].filter(Boolean).length;

        return {
            waterGoalMet,
            sleepGoalMet,
            dietGoalMet,
            workoutGoalMet,
            totalCompleted,
            totalGoals: 4,
        };
    });
};

