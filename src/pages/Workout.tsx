import React from 'react';
import { Dumbbell, Footprints, Timer, Activity } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppRootState } from '../store/store';
import { updateWorkout, type DailyWorkout } from '../store/slices/workoutSlice';

const WORKOUT_TYPES: { key: keyof Omit<DailyWorkout, 'date'>; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'walking', label: 'Walking', icon: <Footprints size={24} />, color: 'text-blue-400' },
    { key: 'running', label: 'Running', icon: <Activity size={24} />, color: 'text-green-400' },
    { key: 'gymTime', label: 'Gym Time', icon: <Dumbbell size={24} />, color: 'text-orange-400' },
];

const Workout: React.FC = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector((state: AppRootState) => state.workout.currentDate);
    const workoutHistory = useSelector((state: AppRootState) => state.workout.history);
    const currentWorkout = workoutHistory[currentDate] || {
        walking: 0,
        running: 0,
        gymTime: 0,
    };

    const handleUpdate = (key: keyof Omit<DailyWorkout, 'date'>, value: string) => {
        const numValue = parseInt(value) || 0;
        dispatch(updateWorkout({ date: currentDate, field: key, value: numValue }));
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-teal-500/20 rounded-xl">
                        <Dumbbell size={32} className="text-teal-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Workout Tracker</h1>
                        <p className="text-gray-400">Log your daily physical activities</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {WORKOUT_TYPES.map(({ key, label, icon, color }) => (
                        <div key={key} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                            <div className={`flex items-center gap-3 mb-4 ${color}`}>
                                {icon}
                                <h2 className="text-xl font-semibold text-white">{label}</h2>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        min="0"
                                        value={currentWorkout[key] || ''}
                                        onChange={(e) => handleUpdate(key, e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors text-lg"
                                        placeholder="0"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        min
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {[15, 30, 45, 60].map((min) => (
                                    <button
                                        key={min}
                                        onClick={() => handleUpdate(key, min.toString())}
                                        className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-teal-500/20 hover:text-teal-300 transition-colors border border-gray-600 hover:border-teal-500/30"
                                    >
                                        {min}m
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                                <Timer size={14} />
                                <span>Duration in minutes</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-teal-500/10 rounded-xl border border-teal-500/20">
                    <h3 className="text-lg font-semibold text-teal-300 mb-2">Daily Summary</h3>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">Total Active Time:</span>
                            <span className="text-xl font-bold text-white">
                                {(currentWorkout.walking || 0) + (currentWorkout.running || 0) + (currentWorkout.gymTime || 0)} min
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workout;
