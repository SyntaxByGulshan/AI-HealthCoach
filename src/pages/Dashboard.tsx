import React from 'react';
import StatCard from '../components/StatCard';
import { Activity, Award, Droplets, Moon, Utensils, Dumbbell, CheckCircle2, XCircle, User } from 'lucide-react';
import { useGoalsCompleted, useTodayHabits, useUserBMI, WATER_GOAL, SLEEP_GOAL, WORKOUT_GOAL } from '../store/selectors';
import { useAppSelector } from '../store/hooks';

const Dashboard: React.FC = () => {
    const goalsStatus = useGoalsCompleted();
    const todayHabits = useTodayHabits();
    const bmiData = useUserBMI();
    const todayDate = new Date().toISOString().split('T')[0];
    const todayDiet = useAppSelector((state) => state.diet.history[todayDate]);
    const todayWorkout = useAppSelector((state) => state.workout.history[todayDate]);

    // Calculate actual values
    const waterIntake = todayHabits?.waterIntake || 0;
    const sleepHours = todayHabits?.sleepHours || 0;
    const totalWorkout = todayWorkout
        ? (todayWorkout.walking || 0) + (todayWorkout.running || 0) + (todayWorkout.gymTime || 0)
        : 0;
    const mealsLogged = todayDiet
        ? (todayDiet.breakfast?.length || 0) + (todayDiet.lunch?.length || 0) + (todayDiet.snack?.length || 0) + (todayDiet.dinner?.length || 0)
        : 0;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back! 👋
                </h1>
                <p className="text-gray-400 mb-6">
                    Track your progress and achieve your daily health goals
                </p>
            </div>

            {/* BMI Card */}
            {bmiData.bmi !== null && (
                <div className="mb-8 animate-fade-in">
                    <div className="glass-card p-6 md:p-8 border-2 border-indigo-500/30">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-500/20 rounded-xl">
                                <User size={32} className="text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Body Mass Index (BMI)</h2>
                                <p className="text-gray-400">Your current health indicator</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-center py-4">
                                <div className="text-6xl font-bold text-indigo-400 mb-2">
                                    {bmiData.bmi}
                                </div>
                                <div className="text-gray-400 text-lg">
                                    BMI Value
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center py-4">
                                <div className={`inline-block px-6 py-3 rounded-full mb-2 ${bmiData.color === 'green' ? 'bg-green-500/20 border-2 border-green-500/50' :
                                    bmiData.color === 'blue' ? 'bg-blue-500/20 border-2 border-blue-500/50' :
                                        bmiData.color === 'yellow' ? 'bg-yellow-500/20 border-2 border-yellow-500/50' :
                                            'bg-red-500/20 border-2 border-red-500/50'
                                    }`}>
                                    <span className={`text-xl font-bold ${bmiData.color === 'green' ? 'text-green-400' :
                                        bmiData.color === 'blue' ? 'text-blue-400' :
                                            bmiData.color === 'yellow' ? 'text-yellow-400' :
                                                'text-red-400'
                                        }`}>
                                        {bmiData.category}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm text-center mt-2">
                                    {bmiData.category === 'Normal' && '✓ You\'re in a healthy range!'}
                                    {bmiData.category === 'Underweight' && 'Consider gaining weight for better health'}
                                    {bmiData.category === 'Overweight' && 'Consider lifestyle changes'}
                                    {bmiData.category === 'Obese' && 'Consult with a healthcare professional'}
                                </p>
                                <a href="/profile" className="text-indigo-400 hover:text-indigo-300 text-sm mt-2 underline">
                                    Update your profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Goals Completed Card - Prominent */}
            <div className="mb-8 animate-fade-in">
                <div className="glass-card p-6 md:p-8 border-2 border-teal-500/30">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-teal-500/20 rounded-xl">
                            <Award size={32} className="text-teal-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Goals Completed Today</h2>
                            <p className="text-gray-400">Keep up the great work!</p>
                        </div>
                    </div>
                    <div className="text-center py-4">
                        <div className="text-6xl font-bold text-teal-400 mb-2">
                            {goalsStatus.totalCompleted} / {goalsStatus.totalGoals}
                        </div>
                        <div className="text-gray-400 text-lg">
                            {goalsStatus.totalCompleted === goalsStatus.totalGoals
                                ? '🎉 All goals completed! Amazing!'
                                : `${goalsStatus.totalGoals - goalsStatus.totalCompleted} more to go!`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Goals Overview */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Today's Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Water Goal */}
                    <div className={`glass-card p-4 border-2 ${goalsStatus.waterGoalMet ? 'border-green-500/50' : 'border-gray-700/30'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Droplets size={24} className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Water Intake</h3>
                                    <p className="text-sm text-gray-400">{waterIntake} / {WATER_GOAL} ml</p>
                                </div>
                            </div>
                            {goalsStatus.waterGoalMet ? (
                                <CheckCircle2 size={28} className="text-green-400" />
                            ) : (
                                <XCircle size={28} className="text-gray-600" />
                            )}
                        </div>
                    </div>

                    {/* Sleep Goal */}
                    <div className={`glass-card p-4 border-2 ${goalsStatus.sleepGoalMet ? 'border-green-500/50' : 'border-gray-700/30'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Moon size={24} className="text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Sleep Hours</h3>
                                    <p className="text-sm text-gray-400">{sleepHours.toFixed(1)} / {SLEEP_GOAL} hrs</p>
                                </div>
                            </div>
                            {goalsStatus.sleepGoalMet ? (
                                <CheckCircle2 size={28} className="text-green-400" />
                            ) : (
                                <XCircle size={28} className="text-gray-600" />
                            )}
                        </div>
                    </div>

                    {/* Diet Goal */}
                    <div className={`glass-card p-4 border-2 ${goalsStatus.dietGoalMet ? 'border-green-500/50' : 'border-gray-700/30'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-500/20 rounded-lg">
                                    <Utensils size={24} className="text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Diet Plan</h3>
                                    <p className="text-sm text-gray-400">{mealsLogged} meals logged (need all 4 types)</p>
                                </div>
                            </div>
                            {goalsStatus.dietGoalMet ? (
                                <CheckCircle2 size={28} className="text-green-400" />
                            ) : (
                                <XCircle size={28} className="text-gray-600" />
                            )}
                        </div>
                    </div>

                    {/* Workout Goal */}
                    <div className={`glass-card p-4 border-2 ${goalsStatus.workoutGoalMet ? 'border-green-500/50' : 'border-gray-700/30'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500/20 rounded-lg">
                                    <Dumbbell size={24} className="text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Workout</h3>
                                    <p className="text-sm text-gray-400">{totalWorkout} / {WORKOUT_GOAL} min</p>
                                </div>
                            </div>
                            {goalsStatus.workoutGoalMet ? (
                                <CheckCircle2 size={28} className="text-green-400" />
                            ) : (
                                <XCircle size={28} className="text-gray-600" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<Droplets size={24} />}
                    title="Water"
                    value={waterIntake}
                    target="/ 2000ml"
                />
                <StatCard
                    icon={<Moon size={24} />}
                    title="Sleep"
                    value={sleepHours.toFixed(1)}
                    target="/ 8 hrs"
                />
                <StatCard
                    icon={<Utensils size={24} />}
                    title="Meals"
                    value={mealsLogged}
                    target="logged"
                />
                <StatCard
                    icon={<Dumbbell size={24} />}
                    title="Workout"
                    value={totalWorkout}
                    target="/ 30 min"
                />
            </div>

            {/* Bottom Section - Activity Progress */}
            <div className="glass-card p-4 md:p-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/habits" className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center transition-colors">
                        <Droplets className="mx-auto mb-2 text-blue-400" size={32} />
                        <p className="text-white font-semibold">Track Habits</p>
                    </a>
                    <a href="/diet" className="bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center transition-colors">
                        <Utensils className="mx-auto mb-2 text-teal-400" size={32} />
                        <p className="text-white font-semibold">Log Meals</p>
                    </a>
                    <a href="/workout" className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 text-center transition-colors">
                        <Dumbbell className="mx-auto mb-2 text-orange-400" size={32} />
                        <p className="text-white font-semibold">Track Workout</p>
                    </a>
                    <a href="/profile" className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center transition-colors">
                        <Activity className="mx-auto mb-2 text-purple-400" size={32} />
                        <p className="text-white font-semibold">View Profile</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

