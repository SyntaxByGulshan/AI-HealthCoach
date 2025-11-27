import React from 'react';
import { Dumbbell } from 'lucide-react';

const Workout: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                    <Dumbbell size={40} className="text-teal-400" />
                    <h1 className="text-3xl font-bold text-white">Workout</h1>
                </div>
                <p className="text-gray-400 text-lg">
                    Workout page coming soon. Access exercise routines, workout tracking,
                    and fitness programs designed for your fitness level.
                </p>
            </div>
        </div>
    );
};

export default Workout;
