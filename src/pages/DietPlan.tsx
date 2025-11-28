import React, { useState } from 'react';
import { Utensils, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppRootState } from '../store/store';
import { addMeal, removeMeal, type MealItem, type DailyDiet } from '../store/slices/dietSlice';
import { v4 as uuidv4 } from 'uuid';

const MEAL_TYPES: { key: keyof Omit<DailyDiet, 'date'>; label: string }[] = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'snack', label: 'Snack' },
    { key: 'dinner', label: 'Dinner' },
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

    return (
        <div className="max-w-7xl mx-auto p-8 pb-24">
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-teal-500/20 rounded-xl">
                        <Utensils size={32} className="text-teal-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Diet Plan</h1>
                        <p className="text-gray-400">Track your meals and stay on target</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {MEAL_TYPES.map(({ key, label }) => (
                        <div key={key} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50">
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-700/30 transition-colors"
                                onClick={() => toggleSection(key)}
                            >
                                <h2 className="text-xl font-semibold text-teal-300">{label}</h2>
                                {expandedSections[key] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </div>

                            {expandedSections[key] && (
                                <div className="p-4 pt-0 border-t border-gray-700/30">
                                    {/* List of added meals */}
                                    <div className="space-y-2 mt-4">
                                        {currentDiet[key]?.length === 0 && (
                                            <p className="text-gray-500 text-sm italic">No meals added yet.</p>
                                        )}
                                        {currentDiet[key]?.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-700/30">
                                                <span className="text-gray-200">{item.name}</span>
                                                <button
                                                    onClick={() => handleRemoveMeal(key, item.id)}
                                                    className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-400/10 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add new meal section */}
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Recommended:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {RECOMMENDATIONS[key].map((rec) => (
                                                    <button
                                                        key={rec}
                                                        onClick={() => handleAddRecommendation(key, rec)}
                                                        className="px-3 py-1.5 text-sm bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full hover:bg-teal-500/20 transition-colors flex items-center gap-1"
                                                    >
                                                        <Plus size={14} />
                                                        {rec}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Add custom item..."
                                                value={customInputs[key] || ''}
                                                onChange={(e) => setCustomInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                                                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleAddCustom(key);
                                                }}
                                            />
                                            <button
                                                onClick={() => handleAddCustom(key)}
                                                disabled={!customInputs[key]?.trim()}
                                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DietPlan;
