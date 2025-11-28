import React, { useState } from 'react';
import { Utensils, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppRootState } from '../store/store';
import { addMeal, removeMeal, type MealItem, type DailyDiet } from '../store/slices/dietSlice';
import { v4 as uuidv4 } from 'uuid';

const MEAL_TYPES: { key: keyof Omit<DailyDiet, 'date'>; label: string; color: string }[] = [
    { key: 'breakfast', label: 'Breakfast', color: 'orange' },
    { key: 'lunch', label: 'Lunch', color: 'green' },
    { key: 'snack', label: 'Snack', color: 'yellow' },
    { key: 'dinner', label: 'Dinner', color: 'purple' },
];

const RECOMMENDATIONS = {
    breakfast: ['Oatmeal with Berries', 'Scrambled Eggs', 'Greek Yogurt', 'Avocado Toast'],
    lunch: ['Grilled Chicken Salad', 'Quinoa Bowl', 'Turkey Sandwich', 'Vegetable Soup'],
    snack: ['Almonds', 'Apple', 'Protein Bar', 'Carrot Sticks'],
    dinner: ['Baked Salmon', 'Stir-Fry Vegetables', 'Lean Steak', 'Pasta Primavera'],
};

const DietPlan: React.FC = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector((state: AppRootState) => state.diet.currentDate);
    const dietHistory = useSelector((state: AppRootState) => state.diet.history);
    const currentDiet = dietHistory[currentDate] || {
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: [],
    };

    const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        breakfast: true,
        lunch: true,
        snack: true,
        dinner: true,
    });

    const toggleSection = (type: string) => {
        setExpandedSections((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleAddRecommendation = (type: keyof Omit<DailyDiet, 'date'>, name: string) => {
        const newItem: MealItem = {
            id: uuidv4(),
            name,
            isCustom: false,
        };
        dispatch(addMeal({ date: currentDate, type, item: newItem }));
    };

    const handleAddCustom = (type: keyof Omit<DailyDiet, 'date'>) => {
        const name = customInputs[type];
        if (name && name.trim()) {
            const newItem: MealItem = {
                id: uuidv4(),
                name: name.trim(),
                isCustom: true,
            };
            dispatch(addMeal({ date: currentDate, type, item: newItem }));
            setCustomInputs((prev) => ({ ...prev, [type]: '' }));
        }
    };

    const handleRemoveMeal = (type: keyof Omit<DailyDiet, 'date'>, id: string) => {
        dispatch(removeMeal({ date: currentDate, type, id }));
    };

    const getColorClasses = (color: string) => {
        const colors = {
            orange: {
                gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
                border: 'border-orange-500/30',
                iconBg: 'from-orange-500/30 to-orange-600/30',
                iconColor: 'text-orange-400',
                textGradient: 'from-orange-400 to-amber-400',
                accent: 'accent-orange-500',
                button: 'bg-orange-500/10 text-orange-300 border-orange-500/20 hover:bg-orange-500/20',
            },
            green: {
                gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
                border: 'border-green-500/30',
                iconBg: 'from-green-500/30 to-green-600/30',
                iconColor: 'text-green-400',
                textGradient: 'from-green-400 to-emerald-400',
                accent: 'accent-green-500',
                button: 'bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/20',
            },
            yellow: {
                gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
                border: 'border-yellow-500/30',
                iconBg: 'from-yellow-500/30 to-yellow-600/30',
                iconColor: 'text-yellow-400',
                textGradient: 'from-yellow-400 to-amber-400',
                accent: 'accent-yellow-500',
                button: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20 hover:bg-yellow-500/20',
            },
            purple: {
                gradient: 'from-purple-500/20 via-violet-500/20 to-indigo-500/20',
                border: 'border-purple-500/30',
                iconBg: 'from-purple-500/30 to-purple-600/30',
                iconColor: 'text-purple-400',
                textGradient: 'from-purple-400 to-violet-400',
                accent: 'accent-purple-500',
                button: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20',
            },
        };
        return colors[color as keyof typeof colors];
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
            {/* Gradient Header */}
            <div className="mb-6 animate-fade-in">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/20 via-green-500/20 to-emerald-500/20 p-6 md:p-8 border border-teal-500/30">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-teal-500/30 to-teal-600/30 rounded-xl">
                            <Utensils size={40} className="text-teal-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                                Diet Plan
                            </h1>
                            <p className="text-gray-300 text-base md:text-lg mt-1">
                                Track your meals and stay on target
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Meal Type Cards */}
            <div className="space-y-4">
                {MEAL_TYPES.map(({ key, label, color }) => {
                    const colorClasses = getColorClasses(color);
                    const mealCount = currentDiet[key]?.length || 0;

                    return (
                        <div key={key} className={`group glass-card overflow-hidden border-2 ${colorClasses.border} hover:shadow-lg transition-all duration-300`}>
                            <div
                                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-800/30 transition-colors"
                                onClick={() => toggleSection(key)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 bg-gradient-to-br ${colorClasses.iconBg} rounded-lg group-hover:scale-110 transition-transform`}>
                                        <Utensils size={24} className={colorClasses.iconColor} />
                                    </div>
                                    <div>
                                        <h2 className={`text-xl font-bold bg-gradient-to-r ${colorClasses.textGradient} bg-clip-text text-transparent`}>
                                            {label}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {mealCount} {mealCount === 1 ? 'item' : 'items'} logged
                                        </p>
                                    </div>
                                </div>
                                {expandedSections[key] ? (
                                    <ChevronUp size={24} className={`${colorClasses.iconColor} transition-transform`} />
                                ) : (
                                    <ChevronDown size={24} className="text-gray-400 transition-transform" />
                                )}
                            </div>

                            {expandedSections[key] && (
                                <div className="p-5 pt-0 border-t border-gray-700/30">
                                    {/* List of added meals */}
                                    <div className="space-y-2 mt-4">
                                        {currentDiet[key]?.length === 0 && (
                                            <p className="text-gray-500 text-sm italic text-center py-4">No meals added yet.</p>
                                        )}
                                        {currentDiet[key]?.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors group/item">
                                                <span className="text-gray-200 font-medium">{item.name}</span>
                                                <button
                                                    onClick={() => handleRemoveMeal(key, item.id)}
                                                    className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-all opacity-0 group-hover/item:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add new meal section */}
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-3 font-medium">Quick Add:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {RECOMMENDATIONS[key].map((rec) => (
                                                    <button
                                                        key={rec}
                                                        onClick={() => handleAddRecommendation(key, rec)}
                                                        className={`px-3 py-2 text-sm ${colorClasses.button} border rounded-full transition-all flex items-center gap-1.5 hover:scale-105`}
                                                    >
                                                        <Plus size={14} />
                                                        {rec}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 flex-col md:flex-row">
                                            <input
                                                type="text"
                                                placeholder="Add custom item..."
                                                value={customInputs[key] || ''}
                                                onChange={(e) => setCustomInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                                                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleAddCustom(key);
                                                }}
                                            />
                                            <button
                                                onClick={() => handleAddCustom(key)}
                                                disabled={!customInputs[key]?.trim()}
                                                className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium hover:shadow-lg hover:shadow-teal-500/20"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DietPlan;
