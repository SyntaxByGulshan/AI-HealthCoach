import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    CheckSquare,
    TrendingUp,
    Bot,
    Utensils,
    Dumbbell,
    X
} from 'lucide-react';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { id: 'profile', label: 'Profile', icon: <User size={20} />, path: '/profile' },
    { id: 'habits', label: 'Daily Habits', icon: <CheckSquare size={20} />, path: '/habits' },
    { id: 'progress', label: 'Progress', icon: <TrendingUp size={20} />, path: '/progress' },
    { id: 'coach', label: 'AI Coach', icon: <Bot size={20} />, path: '/coach' },
    { id: 'diet', label: 'Diet Plan', icon: <Utensils size={20} />, path: '/diet' },
    { id: 'workout', label: 'Workout', icon: <Dumbbell size={20} />, path: '/workout' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-50 bg-[#111827] border-r border-gray-800 flex flex-col
                transform transition-all duration-300 ease-in-out
                md:relative md:translate-x-0
                w-64 md:w-20 lg:w-20 xl:w-64
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo Section */}
                <div className="p-6 md:p-4 xl:p-6 border-b border-gray-800 flex items-center justify-between md:justify-center xl:justify-between">
                    <div className="flex items-center gap-2 md:justify-center xl:justify-start">
                        <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
                            <span className="text-white font-bold text-lg"><img src="./logo.png" alt="AI" /></span>
                        </div>
                        <span className="text-xl font-bold text-gradient md:hidden xl:inline">Pulse AI</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 md:p-2 xl:p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.id}>
                                    <Link
                                        to={item.path}
                                        onClick={() => {
                                            if (window.innerWidth < 768) {
                                                onClose();
                                            }
                                        }}
                                        className={`w-full flex items-center gap-3 md:justify-center xl:justify-start px-4 md:px-3 xl:px-4 py-3 rounded-lg transition-all group relative ${isActive
                                            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                                            }`}
                                        title={item.label}
                                    >
                                        {item.icon}
                                        <span className="font-medium md:hidden xl:inline">{item.label}</span>
                                        {/* Tooltip for icon-only mode */}
                                        <span className="hidden md:block xl:hidden absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Status */}
                <div className="p-4 md:p-2 xl:p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 md:justify-center xl:justify-start">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center relative">
                            <span className="text-white font-semibold">U</span>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div className="md:hidden xl:block">
                            <p className="text-sm font-semibold text-white">User</p>
                            <p className="text-xs text-gray-400">Free Access</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
