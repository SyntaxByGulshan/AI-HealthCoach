import React from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, target }) => {
    return (
        <div className="glass-card p-5 hover-lift animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
                <div className="text-teal-400">
                    {icon}
                </div>
                <h4 className="text-sm font-medium text-gray-400">{title}</h4>
            </div>

            <div className="space-y-1">
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-500">{target}</div>
            </div>
        </div>
    );
};

export default StatCard;
