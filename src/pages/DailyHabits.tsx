import React, { useState, useEffect } from 'react';
import { Droplets, Moon, Calendar, TrendingUp, Award, Monitor, Brain, Smile, Clock, Heart, Zap, Wine, Cigarette } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateDailyHabit } from '../store/slices/dailyHabitsSlice';

const DailyHabits: React.FC = () => {
    const dispatch = useAppDispatch();
    const todayDate = new Date().toISOString().split('T')[0];
    const todayHabits = useAppSelector((state) => state.dailyHabits.habits[todayDate]);

    // Required fields
    const [waterIntake, setWaterIntake] = useState(todayHabits?.waterIntake || 0);
    const [sleepHours, setSleepHours] = useState(todayHabits?.sleepHours || 0);

    // Optional fields
    const [screenTime, setScreenTime] = useState(todayHabits?.screenTime || 0);
    const [stressLevel, setStressLevel] = useState(todayHabits?.stressLevel || 5);
    const [mood, setMood] = useState(todayHabits?.mood || '');
    const [wakeUpTime, setWakeUpTime] = useState(todayHabits?.wakeUpTime || '');
    const [meditationMinutes, setMeditationMinutes] = useState(todayHabits?.meditationMinutes || 0);
    const [energyLevel, setEnergyLevel] = useState(todayHabits?.energyLevel || 5);
    const [alcoholIntake, setAlcoholIntake] = useState(todayHabits?.alcoholIntake || 0);
    const [smoking, setSmoking] = useState(todayHabits?.smoking || 0);

    // Goals
    const waterGoal = 2000; // 2000ml = 2 liters
    const sleepGoal = 8; // 8 hours

    // Update local state when Redux state changes
    useEffect(() => {
        if (todayHabits) {
            setWaterIntake(todayHabits.waterIntake);
            setSleepHours(todayHabits.sleepHours);
            setScreenTime(todayHabits.screenTime || 0);
            setStressLevel(todayHabits.stressLevel || 5);
            setMood(todayHabits.mood || '');
            setWakeUpTime(todayHabits.wakeUpTime || '');
            setMeditationMinutes(todayHabits.meditationMinutes || 0);
            setEnergyLevel(todayHabits.energyLevel || 5);
            setAlcoholIntake(todayHabits.alcoholIntake || 0);
            setSmoking(todayHabits.smoking || 0);
        }
    }, [todayHabits]);

    const handleWaterUpdate = (amount: number) => {
        const newAmount = Math.max(0, waterIntake + amount);
        setWaterIntake(newAmount);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { waterIntake: newAmount }
        }));
    };

    const handleSleepUpdate = (hours: number) => {
        const newHours = Math.max(0, Math.min(24, sleepHours + hours));
        setSleepHours(newHours);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { sleepHours: newHours }
        }));
    };

    const handleScreenTimeUpdate = (minutes: number) => {
        const newMinutes = Math.max(0, screenTime + minutes);
        setScreenTime(newMinutes);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { screenTime: newMinutes }
        }));
    };

    const handleStressLevelChange = (level: number) => {
        setStressLevel(level);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { stressLevel: level }
        }));
    };

    const handleMoodChange = (newMood: string) => {
        setMood(newMood);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { mood: newMood }
        }));
    };

    const handleWakeUpTimeChange = (time: string) => {
        setWakeUpTime(time);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { wakeUpTime: time }
        }));
    };

    const handleMeditationUpdate = (minutes: number) => {
        const newMinutes = Math.max(0, meditationMinutes + minutes);
        setMeditationMinutes(newMinutes);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { meditationMinutes: newMinutes }
        }));
    };

    const handleEnergyLevelChange = (level: number) => {
        setEnergyLevel(level);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { energyLevel: level }
        }));
    };

    const handleAlcoholUpdate = (drinks: number) => {
        const newDrinks = Math.max(0, alcoholIntake + drinks);
        setAlcoholIntake(newDrinks);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { alcoholIntake: newDrinks }
        }));
    };

    const handleSmokingUpdate = (cigarettes: number) => {
        const newCigarettes = Math.max(0, smoking + cigarettes);
        setSmoking(newCigarettes);
        dispatch(updateDailyHabit({
            date: todayDate,
            data: { smoking: newCigarettes }
        }));
    };

    const waterProgress = Math.min((waterIntake / waterGoal) * 100, 100);
    const sleepProgress = Math.min((sleepHours / sleepGoal) * 100, 100);

    const hasDataToday = todayHabits && (todayHabits.waterIntake > 0 || todayHabits.sleepHours > 0);

    const moods = ['Happy', 'Sad', 'Neutral', 'Anxious', 'Energetic', 'Tired', 'Excited'];

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Gradient Header */}
            <div className="mb-6 animate-fade-in">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-purple-500/20 p-6 md:p-8 border border-blue-500/30">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-teal-500/30 to-teal-600/30 rounded-xl">
                            <Calendar size={40} className="text-teal-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                                Daily Habits
                            </h1>
                            <p className="text-gray-300 text-base md:text-lg mt-1">
                                Track your daily habits and build a healthier lifestyle
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="group glass-card p-6 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/30 hover:border-teal-500/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-teal-500/20 rounded-lg">
                            <Calendar className="text-teal-400" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Today's Date</p>
                            <p className="text-white text-xl font-semibold">
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group glass-card p-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/30 hover:border-green-500/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg group-hover:scale-110 transition-transform">
                            <TrendingUp className="text-green-400" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Status</p>
                            <p className="text-white text-xl font-semibold">
                                {hasDataToday ? 'Tracking' : 'Not Started'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group glass-card p-4 md:p-6 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/30 hover:border-yellow-500/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg group-hover:scale-110 transition-transform">
                            <Award className="text-yellow-400" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Goals Met</p>
                            <p className="text-white text-xl font-semibold">
                                {(waterProgress >= 100 ? 1 : 0) + (sleepProgress >= 100 ? 1 : 0)} / 2
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Goals Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
                    Daily Goals
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Water Intake */}
                    <div className="group glass-card p-5 md:p-6 border-2 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg group-hover:scale-110 transition-transform">
                                <Droplets size={24} className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Water Intake</h3>
                                <p className="text-sm text-gray-400">{waterIntake} / {waterGoal} ml</p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-gray-700/50 rounded-full mb-3 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out" style={{ width: `${waterProgress}%` }} />
                        </div>
                        <div className="flex  gap-2 flex-wrap justify-between md:justify-between justify-center ">
                            <button onClick={() => handleWaterUpdate(250)} className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-all">+250ml</button>
                            <button onClick={() => handleWaterUpdate(500)} className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-all">+500ml</button>
                            <button onClick={() => handleWaterUpdate(1000)} className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-all">+1L</button>
                            <button onClick={() => handleWaterUpdate(-250)} className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-all">-250ml</button>
                        </div>
                    </div>

                    {/* Sleep Hours */}
                    <div className="group glass-card p-5 md:p-6 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg group-hover:scale-110 transition-transform">
                                <Moon size={24} className="text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Sleep Hours</h3>
                                <p className="text-sm text-gray-400">{sleepHours.toFixed(1)} / {sleepGoal} hrs</p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-gray-700/50 rounded-full mb-3 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-500 ease-out" style={{ width: `${sleepProgress}%` }} />
                        </div>
                        <div className="flex  gap-2 flex-wrap md:justify-between justify-center">
                            <button onClick={() => handleSleepUpdate(0.5)} className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition-all">+0.5h</button>
                            <button onClick={() => handleSleepUpdate(1)} className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition-all">+1h</button>
                            <button onClick={() => handleSleepUpdate(2)} className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition-all">+2h</button>
                            <button onClick={() => handleSleepUpdate(-0.5)} className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-all">-0.5h</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wellness Tracker Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-red-400 rounded-full"></div>
                    Wellness Tracker
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mood */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                <Smile size={24} className="text-pink-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Mood</h3>
                                <p className="text-sm text-gray-400">{mood || 'Not selected'}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {moods.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => handleMoodChange(m)}
                                    className={`px-3 py-2 rounded text-sm font-semibold transition-all ${mood === m
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stress Level */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <Brain size={24} className="text-red-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Stress Level</h3>
                                <p className="text-sm text-gray-400">Level: {stressLevel} / 10</p>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={stressLevel}
                            onChange={(e) => handleStressLevelChange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                    </div>

                    {/* Energy Level */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-cyan-500/20 rounded-lg">
                                <Zap size={24} className="text-cyan-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Energy Level</h3>
                                <p className="text-sm text-gray-400">Level: {energyLevel} / 10</p>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={energyLevel}
                            onChange={(e) => handleEnergyLevelChange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                    </div>

                    {/* Alcohol Intake */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-500/20 rounded-lg">
                                <Wine size={24} className="text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Alcohol Intake</h3>
                                <p className="text-sm text-gray-400">{alcoholIntake} drinks</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button onClick={() => handleAlcoholUpdate(1)} className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-semibold transition-all">+1</button>
                            <button onClick={() => handleAlcoholUpdate(2)} className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-semibold transition-all">+2</button>
                            <button onClick={() => handleAlcoholUpdate(3)} className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-semibold transition-all">+3</button>
                            <button onClick={() => handleAlcoholUpdate(-1)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-all">-1</button>
                        </div>
                    </div>

                    {/* Smoking */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-500/20 rounded-lg">
                                <Cigarette size={24} className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Smoking</h3>
                                <p className="text-sm text-gray-400">{smoking} cigarettes</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button onClick={() => handleSmokingUpdate(1)} className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold transition-all">+1</button>
                            <button onClick={() => handleSmokingUpdate(5)} className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold transition-all">+5</button>
                            <button onClick={() => handleSmokingUpdate(10)} className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold transition-all">+10</button>
                            <button onClick={() => handleSmokingUpdate(-1)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-all">-1</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional Tracking Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-green-400 rounded-full"></div>
                    Optional Tracking
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Screen Time */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                                <Monitor size={24} className="text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Screen Time</h3>
                                <p className="text-sm text-gray-400">{screenTime} minutes</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button onClick={() => handleScreenTimeUpdate(30)} className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-semibold transition-all">+30m</button>
                            <button onClick={() => handleScreenTimeUpdate(60)} className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-semibold transition-all">+1h</button>
                            <button onClick={() => handleScreenTimeUpdate(120)} className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-semibold transition-all">+2h</button>
                            <button onClick={() => handleScreenTimeUpdate(-30)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-all">-30m</button>
                        </div>
                    </div>

                    {/* Meditation */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <Heart size={24} className="text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Meditation</h3>
                                <p className="text-sm text-gray-400">{meditationMinutes} minutes</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button onClick={() => handleMeditationUpdate(5)} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition-all">+5m</button>
                            <button onClick={() => handleMeditationUpdate(10)} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition-all">+10m</button>
                            <button onClick={() => handleMeditationUpdate(15)} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition-all">+15m</button>
                            <button onClick={() => handleMeditationUpdate(-5)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-all">-5m</button>
                        </div>
                    </div>

                    {/* Wake Up Time */}
                    <div className="glass-card p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Clock size={24} className="text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">Wake Up Time</h3>
                                <p className="text-sm text-gray-400">{wakeUpTime || 'Not set'}</p>
                            </div>
                        </div>
                        <input
                            type="time"
                            value={wakeUpTime}
                            onChange={(e) => handleWakeUpTimeChange(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Achievement Message */}
            {waterProgress >= 100 && sleepProgress >= 100 && (
                <div className="mt-6 glass-card p-4 md:p-6 border-2 border-green-500/50 animate-fade-in">
                    <div className="flex items-center gap-4">
                        <Award size={40} className="text-green-400" />
                        <div>
                            <h3 className="text-xl font-bold text-white">Amazing! 🎉</h3>
                            <p className="text-gray-300">You've met both your water and sleep goals today!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyHabits;
