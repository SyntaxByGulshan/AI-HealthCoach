import React from 'react';
import type { DailyGoalItemProps } from '../types';

const DailyGoalItem: React.FC<DailyGoalItemProps> = ({ id, label, isCompleted, onToggle }) => {
    return (
        <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 cursor-pointer transition-colors"
            onClick={() => onToggle(id)}
        >
            <div className="relative">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggle(id)}
                    className="appearance-none w-5 h-5 border-2 border-gray-600 rounded checked:bg-green-500 checked:border-green-500 cursor-pointer transition-all"
                />
                {isCompleted && (
                    <svg
                        className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </div>

            <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-green-400 line-through' : 'text-gray-300'
                }`}>
                {label}
            </span>
        </div>
    );
};

export default DailyGoalItem;
