import React from 'react';
import { Utensils } from 'lucide-react';

const DietPlan: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                    <Utensils size={40} className="text-teal-400" />
                    <h1 className="text-3xl font-bold text-white">Diet Plan</h1>
                </div>
                <p className="text-gray-400 text-lg">
                    Diet Plan coming soon. Access personalized meal plans, nutrition tracking,
                    and dietary recommendations tailored to your goals.
                </p>
            </div>
        </div>
    );
};

export default DietPlan;
