import React from 'react';
import type { MetricCardProps } from '../types';

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, borderColor, icon }) => {
    const borderClass = borderColor === 'teal' ? 'glass-card-teal' : 'glass-card-green';

    return (
        <div className={`glass-card ${borderClass} p-6 hover-lift animate-fade-in`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    {icon && <div className="text-teal-400">{icon}</div>}
                    <h3 className="text-sm font-semibold text-gray-400">{title}</h3>
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-5xl font-bold text-white">{value}</div>
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>{subtitle}</span>
                </div>
            </div>

            {/* Metric Details */}
            <div className="mt-4 pt-4 border-t border-gray-700/30">
                <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">Diet:</span>
                        <span className="text-white">+0</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">Workout:</span>
                        <span className="text-white">+0</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">Habits:</span>
                        <span className="text-white">+0</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">Steps:</span>
                        <span className="text-white">-0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
