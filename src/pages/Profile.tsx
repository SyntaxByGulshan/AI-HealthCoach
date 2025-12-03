import React, { useState } from 'react';
import { User, Save, Edit2, Check, Activity, Target } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserData, updateUserData } from '../store/slices/userSlice';
import type { UserProfileData } from '../store/slices/userSlice';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Form state
    const [formData, setFormData] = useState<UserProfileData>({
        name: userData?.name || '',
        age: userData?.age || 0,
        gender: userData?.gender || '',
        height: userData?.height || 0,
        weight: userData?.weight || 0,
        goal: userData?.goal || 'lose',
        activity_level: userData?.activity_level || 'sedentary',
        goal_weight: userData?.goal_weight || 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'height' || name === 'weight' || name === 'goal_weight'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const calculateTDEE = async (data: UserProfileData) => {
        setIsCalculating(true);
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    age: data.age,
                    gender: data.gender,
                    weight: data.weight,
                    height: data.height,
                    activity_level: data.activity_level,
                    goal: data.goal,
                    goal_weight: data.goal_weight
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to calculate TDEE');
            }

            const result = await response.json();
            return result.tdee;
        } catch (error) {
            console.error("Error calculating TDEE:", error);
            return null;
        } finally {
            setIsCalculating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate TDEE before saving
        const tdee = await calculateTDEE(formData);

        const dataToSave = {
            ...formData,
            tdee: tdee || 0 // Save TDEE if calculated, else 0
        };

        if (userData) {
            dispatch(updateUserData(dataToSave));
        } else {
            dispatch(setUserData(dataToSave));
        }

        setIsEditing(false);
    };

    const handleEdit = () => {
        if (userData) {
            setFormData(userData);
        }
        setIsEditing(true);
    };

    const getGoalLabel = (goal: string) => {
        switch (goal) {
            case 'lose':
                return 'Lose Weight';
            case 'gain':
                return 'Gain Weight';
            case 'maintain':
                return 'Maintain Weight';
            default:
                return goal;
        }
    };

    const getActivityLabel = (level: string) => {
        const labels: Record<string, string> = {
            'sedentary': 'Sedentary (little or no exercise)',
            'light': 'Lightly active (1-3 days/week)',
            'moderate': 'Moderately active (3-5 days/week)',
            'active': 'Active (6-7 days/week)',
            'very_active': 'Very active (physical job or 2x training)'
        };
        return labels[level] || level;
    };

    // Show form if no user data exists or if editing
    if (!userData || isEditing) {
        return (
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                <div className="glass-card p-4 md:p-8 animate-fade-in">
                    <div className="flex items-center gap-4 mb-8">
                        <User size={40} className="text-teal-400" />
                        <h1 className="text-3xl font-bold text-white">
                            {userData ? 'Edit Profile' : 'Create Your Profile'}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age || ''}
                                onChange={handleInputChange}
                                required
                                min="1"
                                max="120"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                                placeholder="Enter your age"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Height and Weight in a row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                                    Height (cm)
                                </label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={formData.height || ''}
                                    onChange={handleInputChange}
                                    required
                                    min="50"
                                    max="300"
                                    step="0.1"
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                                    placeholder="Enter height in cm"
                                />
                            </div>

                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight || ''}
                                    onChange={handleInputChange}
                                    required
                                    min="20"
                                    max="500"
                                    step="0.1"
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                                    placeholder="Enter weight in kg"
                                />
                            </div>
                        </div>

                        {/* Activity Level */}
                        <div>
                            <label htmlFor="activity_level" className="block text-sm font-medium text-gray-300 mb-2">
                                Activity Level
                            </label>
                            <select
                                id="activity_level"
                                name="activity_level"
                                value={formData.activity_level}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                            >
                                <option value="sedentary">Sedentary (little or no exercise)</option>
                                <option value="light">Lightly active (1-3 days/week)</option>
                                <option value="moderate">Moderately active (3-5 days/week)</option>
                                <option value="active">Active (6-7 days/week)</option>
                                <option value="very_active">Very active (physical job or 2x training)</option>
                            </select>
                        </div>

                        {/* Goal */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Health Goal
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:border-teal-400 transition-all">
                                    <input
                                        type="radio"
                                        name="goal"
                                        value="lose"
                                        checked={formData.goal === 'lose'}
                                        onChange={handleInputChange}
                                        required
                                        className="w-5 h-5 text-teal-500 focus:ring-teal-400 focus:ring-2"
                                    />
                                    <div>
                                        <p className="text-white font-medium">Lose Weight</p>
                                        <p className="text-sm text-gray-400">Lose weight and improve body composition</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:border-teal-400 transition-all">
                                    <input
                                        type="radio"
                                        name="goal"
                                        value="gain"
                                        checked={formData.goal === 'gain'}
                                        onChange={handleInputChange}
                                        required
                                        className="w-5 h-5 text-teal-500 focus:ring-teal-400 focus:ring-2"
                                    />
                                    <div>
                                        <p className="text-white font-medium">Gain Weight</p>
                                        <p className="text-sm text-gray-400">Build muscle mass and increase body weight</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:border-teal-400 transition-all">
                                    <input
                                        type="radio"
                                        name="goal"
                                        value="maintain"
                                        checked={formData.goal === 'maintain'}
                                        onChange={handleInputChange}
                                        required
                                        className="w-5 h-5 text-teal-500 focus:ring-teal-400 focus:ring-2"
                                    />
                                    <div>
                                        <p className="text-white font-medium">Maintain Weight</p>
                                        <p className="text-sm text-gray-400">Stay healthy and maintain current weight</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Goal Weight - Optional/Conditional */}
                        <div>
                            <label htmlFor="goal_weight" className="block text-sm font-medium text-gray-300 mb-2">
                                Goal Weight (kg) <span className="text-gray-500">(Optional)</span>
                            </label>
                            <input
                                type="number"
                                id="goal_weight"
                                name="goal_weight"
                                value={formData.goal_weight || ''}
                                onChange={handleInputChange}
                                min="20"
                                max="500"
                                step="0.1"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                                placeholder="Enter your target weight"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isCalculating}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50"
                            >
                                {isCalculating ? (
                                    <span className="animate-pulse">Calculating...</span>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        {userData ? 'Save Changes' : 'Create Profile'}
                                    </>
                                )}
                            </button>

                            {userData && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData(userData);
                                    }}
                                    className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Display profile view
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="glass-card p-4 md:p-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                            <User size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                            <p className="text-gray-400">{userData.age} years old</p>
                        </div>
                    </div>

                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-all"
                    >
                        <Edit2 size={18} />
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-teal-400 mb-4">Personal Information</h2>

                        <div className="bg-gray-800/30 rounded-lg p-4">
                            <p className="text-sm text-gray-400">Gender</p>
                            <p className="text-lg text-white font-medium capitalize">{userData.gender}</p>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-4">
                            <p className="text-sm text-gray-400">Activity Level</p>
                            <p className="text-lg text-white font-medium">{getActivityLabel(userData.activity_level)}</p>
                        </div>
                    </div>

                    {/* Physical Stats */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-teal-400 mb-4">Physical Stats</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/30 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Height</p>
                                <p className="text-lg text-white font-medium">{userData.height} cm</p>
                            </div>

                            <div className="bg-gray-800/30 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Weight</p>
                                <p className="text-lg text-white font-medium">{userData.weight} kg</p>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-4">
                            <p className="text-sm text-gray-400">BMI</p>
                            <p className="text-lg text-white font-medium">
                                {(userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Health Goal */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-teal-400 mb-4">Health Goal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/30 rounded-lg p-6 flex items-center gap-4">
                            <Target className="text-teal-400" size={24} />
                            <div>
                                <p className="text-sm text-gray-400">Current Goal</p>
                                <p className="text-white text-xl font-semibold">{getGoalLabel(userData.goal)}</p>
                            </div>
                        </div>

                        {userData.goal_weight && (
                            <div className="bg-gray-800/30 rounded-lg p-6 flex items-center gap-4">
                                <Activity className="text-teal-400" size={24} />
                                <div>
                                    <p className="text-sm text-gray-400">Target Weight</p>
                                    <p className="text-white text-xl font-semibold">{userData.goal_weight} kg</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* TDEE Result */}
                {userData.tdee && (
                    <div className="mt-6 animate-fade-in">
                        <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-lg p-6 text-center">
                            <p className="text-gray-300 mb-2">Estimated Daily Calories Needed</p>
                            <h3 className="text-4xl font-bold text-white mb-2">
                                {Math.round(userData.tdee)} <span className="text-xl font-normal text-teal-400">kcal/day</span>
                            </h3>
                            <p className="text-sm text-gray-400">
                                Based on your profile and {getGoalLabel(userData.goal).toLowerCase()} goal
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
