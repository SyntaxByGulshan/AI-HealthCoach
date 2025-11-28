import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { type AppRootState } from '../store/store';
import { getHealthAdvice } from '../services/gemini';

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

const AICoach: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            text: "Hello! I'm your AI Health Coach. I have access to your daily stats. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Redux Data
    const user = useSelector((state: AppRootState) => state.user);
    const diet = useSelector((state: AppRootState) => state.diet);
    const workout = useSelector((state: AppRootState) => state.workout);
    const dailyHabits = useSelector((state: AppRootState) => state.dailyHabits);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const constructContext = () => {
        const today = new Date().toISOString().split('T')[0];
        const todaysDiet = diet.history[today];
        const todaysWorkout = workout.history[today];
        // dailyHabits structure might need adjustment based on actual slice, assuming it has current day data or similar
        // For now, let's use what we have. If dailyHabits is just current state:

        let context = `User Profile: Name: ${user.name}, Age: ${user.age}, Weight: ${user.weight}kg, Height: ${user.height}cm, Goal: ${user.goals}\n`;

        context += `Date: ${today}\n`;

        if (todaysDiet) {
            context += `Diet:\n`;
            context += `  Breakfast: ${todaysDiet.breakfast.map(i => i.name).join(', ') || 'None'}\n`;
            context += `  Lunch: ${todaysDiet.lunch.map(i => i.name).join(', ') || 'None'}\n`;
            context += `  Snack: ${todaysDiet.snack.map(i => i.name).join(', ') || 'None'}\n`;
            context += `  Dinner: ${todaysDiet.dinner.map(i => i.name).join(', ') || 'None'}\n`;
        } else {
            context += `Diet: No meals logged today.\n`;
        }

        if (todaysWorkout) {
            context += `Workout:\n`;
            context += `  Walking: ${todaysWorkout.walking} min\n`;
            context += `  Running: ${todaysWorkout.running} min\n`;
            context += `  Gym: ${todaysWorkout.gymTime} min\n`;
        } else {
            context += `Workout: No activity logged today.\n`;
        }

        // Add Daily Habits if available (assuming simple state for now)
        context += `Habits:\n`;
        context += `  Water: ${dailyHabits.waterIntake}L\n`;
        context += `  Sleep: ${dailyHabits.sleepHours}h\n`;
        context += `  Mood: ${dailyHabits.mood}\n`;

        return context;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const context = constructContext();
        const responseText = await getHealthAdvice(context, input);

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'ai',
            text: responseText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-2rem)] flex flex-col">
            <div className="glass-card flex-1 flex flex-col overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="p-4 border-b border-gray-700/50 flex items-center gap-3 bg-gray-900/50">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                        <Bot size={24} className="text-teal-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">AI Health Coach</h1>
                        <p className="text-xs text-gray-400">Powered by Gemini</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-teal-600' : 'bg-gray-700'
                                    }`}
                            >
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-teal-600 text-white rounded-tr-none'
                                        : 'bg-gray-800 text-gray-200 rounded-tl-none'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                <span className="text-[10px] opacity-50 mt-1 block">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none">
                                <Loader2 size={16} className="animate-spin text-teal-400" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-700/50 bg-gray-900/30">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about your diet, workout, or health..."
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AICoach;
