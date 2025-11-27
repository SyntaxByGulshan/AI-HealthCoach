import React from 'react';
import { Bot } from 'lucide-react';

const AICoach: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                    <Bot size={40} className="text-teal-400" />
                    <h1 className="text-3xl font-bold text-white">AI Coach</h1>
                </div>
                <p className="text-gray-400 text-lg">
                    AI Coach coming soon. Get personalized recommendations, health insights,
                    and motivational support powered by artificial intelligence.
                </p>
            </div>
        </div>
    );
};

export default AICoach;
