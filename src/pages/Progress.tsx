import React from 'react';
import { TrendingUp } from 'lucide-react';

const Progress: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                    <TrendingUp size={40} className="text-teal-400" />
                    <h1 className="text-3xl font-bold text-white">Progress</h1>
                </div>
                <p className="text-gray-400 text-lg">
                    Progress tracker coming soon. View detailed analytics, charts, and insights
                    about your health journey over time.
                </p>
            </div>
        </div>
    );
};

export default Progress;
