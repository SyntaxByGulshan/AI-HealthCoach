import React from 'react';
import MetricCard from '../components/MetricCard';
import StatCard from '../components/StatCard';
import DailyGoalItem from '../components/DailyGoalItem';
import { Activity, Flame, Award, TrendingUp, Play } from 'lucide-react';
import type { Goal } from '../types';

const Dashboard: React.FC = () => {
    const [goals, setGoals] = React.useState<Goal[]>([
        { id: '1', label: 'Morning Yoga', isCompleted: false },
        { id: '2', label: 'Drink 2L Water', isCompleted: false },
    ]);

    const handleGoalToggle = (id: string) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
        ));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, User! 👋
                </h1>
                <p className="text-gray-400 mb-6">
                    Complete your profile to get personalized recommendations
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="gradient-green text-white flex items-center gap-2 shadow-lg shadow-green-500/20">
                        <Play size={18} fill="white" />
                        Start Tracking
                    </button>
                    <button className="bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/20">
                        Daily Check-in
                    </button>
                </div>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <MetricCard
                    title="Today's Points"
                    value="0"
                    subtitle="Current streak: 0 days"
                    borderColor="teal"
                    icon={<Activity size={20} />}
                />
                <MetricCard
                    title="Weekly Total"
                    value="0"
                    subtitle="Current streak: 0 days"
                    borderColor="green"
                    icon={<TrendingUp size={20} />}
                />
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<Activity size={24} />}
                    title="Steps"
                    value="0"
                    target="/ 10k"
                />
                <StatCard
                    icon={<Flame size={24} />}
                    title="Calories Burned"
                    value="0"
                    target="kcal"
                />
                <StatCard
                    icon={<Award size={24} />}
                    title="Daily Points"
                    value="0"
                    target="pts"
                />
                <StatCard
                    icon={<TrendingUp size={24} />}
                    title="Weekly Points"
                    value="0"
                    target="pts"
                />
            </div>

            {/* Bottom Section - Activity Progress & Daily Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Progress */}
                <div className="lg:col-span-2 glass-card p-4 md:p-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-white mb-4">Activity Progress</h2>
                    <div className="h-64 flex items-center justify-center border border-gray-700/30 rounded-lg bg-gray-900/20">
                        <p className="text-gray-500">Chart visualization coming soon</p>
                    </div>
                </div>

                {/* Daily Goals */}
                <div className="glass-card p-4 md:p-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-white mb-4">Daily Goals</h2>
                    <div className="space-y-2">
                        {goals.map((goal) => (
                            <DailyGoalItem
                                key={goal.id}
                                id={goal.id}
                                label={goal.label}
                                isCompleted={goal.isCompleted}
                                onToggle={handleGoalToggle}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
