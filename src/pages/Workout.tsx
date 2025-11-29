import React, { useEffect, useState } from 'react';
import { Dumbbell, Footprints, Timer, Activity, TrendingUp, Sparkles, Loader2, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppRootState } from '../store/store';
import { updateWorkout, fetchStructuredWorkoutPlan, type DailyWorkout } from '../store/slices/workoutSlice';

const WORKOUT_TYPES: { key: keyof Omit<DailyWorkout, 'date'>; label: string; icon: React.ReactNode; color: string; gradient: string }[] = [
    {
        key: 'walking',
        label: 'Walking',
        icon: <Footprints size={28} />,
        color: 'text-blue-400',
        gradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
        key: 'running',
        label: 'Running',
        icon: <Activity size={28} />,
        color: 'text-green-400',
        gradient: 'from-green-500/20 to-green-600/20'
    },
    {
        key: 'gymTime',
        label: 'Gym Time',
        icon: <Dumbbell size={28} />,
        color: 'text-orange-400',
        gradient: 'from-orange-500/20 to-orange-600/20'
    },
];

const Workout: React.FC = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector((state: AppRootState) => state.workout.currentDate);
    const workoutHistory = useSelector((state: AppRootState) => state.workout.history);
    const { structuredPlan, planDate, loading, error } = useSelector((state: AppRootState) => state.workout);
    const user = useSelector((state: AppRootState) => state.user.userData);

    const currentWorkout = workoutHistory[currentDate] || {
        walking: 0,
        running: 0,
        gymTime: 0,
    };

    const [showAIPlan, setShowAIPlan] = useState(true);

    // Auto-load workout plan on mount if needed
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const needsNewPlan = !structuredPlan || planDate !== today;

        if (needsNewPlan && user && !loading) {
            dispatch(fetchStructuredWorkoutPlan({ userProfile: user, goal: user.goal }) as any);
        }
    }, [dispatch, structuredPlan, planDate, user, loading]);

    const handleUpdate = (key: keyof Omit<DailyWorkout, 'date'>, value: string) => {
        const numValue = parseInt(value) || 0;
        dispatch(updateWorkout({ date: currentDate, field: key, value: numValue }));
    };

    const handleAddFromAIPlan = (duration: number, type: 'cardio' | 'strength' | 'flexibility') => {
        // Map exercise types to workout fields
        if (type === 'cardio') {
            // For cardio, add to running (you can adjust this logic)
            const currentValue = currentWorkout.running || 0;
            dispatch(updateWorkout({ date: currentDate, field: 'running', value: currentValue + duration }));
        } else if (type === 'strength') {
            // For strength, add to gym time
            const currentValue = currentWorkout.gymTime || 0;
            dispatch(updateWorkout({ date: currentDate, field: 'gymTime', value: currentValue + duration }));
        } else if (type === 'flexibility') {
            // For flexibility, add to walking (or you can create a new field)
            const currentValue = currentWorkout.walking || 0;
            dispatch(updateWorkout({ date: currentDate, field: 'walking', value: currentValue + duration }));
        }
    };

    const totalMinutes = (currentWorkout.walking || 0) + (currentWorkout.running || 0) + (currentWorkout.gymTime || 0);

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Gradient Header */}
            <div className="mb-6 animate-fade-in">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-teal-500/20 to-blue-500/20 p-6 md:p-8 border border-orange-500/30">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-xl">
                            <Dumbbell size={40} className="text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
                                Workout Tracker
                            </h1>
                            <p className="text-gray-300 text-base md:text-lg mt-1">
                                Log your daily physical activities
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* AI Recommended Workout Plan */}
            {structuredPlan && (
                <div className="glass-card p-6 border-2 border-teal-500/30 animate-fade-in">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowAIPlan(!showAIPlan)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-teal-500/30 to-teal-600/30 rounded-lg">
                                <Sparkles size={24} className="text-teal-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">AI Recommended Workout</h2>
                                <p className="text-sm text-gray-400">Personalized for your fitness goals</p>
                            </div>
                        </div>
                        {showAIPlan ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                    </div>

                    {showAIPlan && (
                        <div className="mt-6 space-y-4">
                            {/* Explanation */}
                            <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
                                <p className="text-gray-300 text-sm leading-relaxed">{structuredPlan.explanation}</p>
                            </div>

                            {/* Cardio Exercises */}
                            {structuredPlan.cardio && structuredPlan.cardio.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-teal-400 mb-3 flex items-center gap-2">
                                        <Activity size={20} />
                                        Cardio Exercises
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {structuredPlan.cardio.map((exercise, idx) => (
                                            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-white">{exercise.name}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {exercise.duration} min • {exercise.intensity}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddFromAIPlan(exercise.duration, 'cardio')}
                                                    className="p-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg text-teal-400 transition-colors"
                                                    title="Add to Running"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Strength Exercises */}
                            {structuredPlan.strength && structuredPlan.strength.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                                        <Dumbbell size={20} />
                                        Strength Training
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {structuredPlan.strength.map((exercise, idx) => (
                                            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-white">{exercise.name}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {exercise.duration} min
                                                        {exercise.sets && exercise.reps && ` • ${exercise.sets}×${exercise.reps}`}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddFromAIPlan(exercise.duration, 'strength')}
                                                    className="p-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg text-orange-400 transition-colors"
                                                    title="Add to Gym Time"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Flexibility Exercises */}
                            {structuredPlan.flexibility && structuredPlan.flexibility.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                                        <Timer size={20} />
                                        Flexibility & Recovery
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {structuredPlan.flexibility.map((exercise, idx) => (
                                            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-white">{exercise.name}</p>
                                                    <p className="text-sm text-gray-400">{exercise.duration} min</p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddFromAIPlan(exercise.duration, 'flexibility')}
                                                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors"
                                                    title="Add to Walking"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Total Duration */}
                            <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                                <p className="text-gray-400 text-sm mb-1">Recommended Total Duration</p>
                                <p className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                                    {structuredPlan.totalDuration} min
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="glass-card p-8 text-center">
                    <Loader2 className="animate-spin text-teal-400 mx-auto mb-3" size={40} />
                    <p className="text-gray-400">Generating your personalized workout plan...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="glass-card p-4 border-2 border-red-500/30 bg-red-500/10">
                    <p className="text-red-400 text-sm">⚠️ {error}</p>
                </div>
            )}

            {/* Workout Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {WORKOUT_TYPES.map(({ key, label, icon, color, gradient }) => (
                    <div key={key} className="group glass-card p-6 border-2 border-gray-700/30 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 transform hover:-translate-y-1">
                        <div className={`flex items-center gap-3 mb-5 ${color}`}>
                            <div className={`p-2.5 bg-gradient-to-br ${gradient} rounded-lg group-hover:scale-110 transition-transform`}>
                                {icon}
                            </div>
                            <h2 className="text-xl font-bold text-white">{label}</h2>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="number"
                                min="0"
                                value={currentWorkout[key] || ''}
                                onChange={(e) => handleUpdate(key, e.target.value)}
                                className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-lg px-4 py-3 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all text-2xl font-bold text-center"
                                placeholder="0"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                min
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {[15, 30, 45, 60].map((min) => (
                                <button
                                    key={min}
                                    onClick={() => handleUpdate(key, min.toString())}
                                    className="flex-1 px-3 py-2 text-sm bg-gray-700/50 text-gray-300 rounded-lg hover:bg-teal-500/20 hover:text-teal-300 transition-all border border-gray-600/50 hover:border-teal-500/50 font-medium hover:scale-105"
                                >
                                    {min}m
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                            <Timer size={16} />
                            <span>Quick select or type above</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Daily Summary */}
            <div className="glass-card p-6 md:p-8 border-2 border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-gradient-to-br from-teal-500/30 to-teal-600/30 rounded-lg">
                        <TrendingUp size={24} className="text-teal-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Daily Summary</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm mb-1">Total Active Time</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                            {totalMinutes}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">minutes</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm mb-1">Walking</p>
                        <p className="text-3xl font-bold text-blue-400">
                            {currentWorkout.walking || 0}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">minutes</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm mb-1">Running</p>
                        <p className="text-3xl font-bold text-green-400">
                            {currentWorkout.running || 0}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">minutes</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm mb-1">Gym</p>
                        <p className="text-3xl font-bold text-orange-400">
                            {currentWorkout.gymTime || 0}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">minutes</p>
                    </div>
                </div>

                {totalMinutes >= 30 && (
                    <div className="mt-4 p-4 bg-teal-500/10 rounded-lg border border-teal-500/30 text-center">
                        <p className="text-teal-300 font-semibold">
                            🎉 Great job! You've met the recommended 30 minutes of daily activity!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workout;
