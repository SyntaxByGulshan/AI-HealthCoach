import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DailyHabits from './pages/DailyHabits';
import Progress from './pages/Progress';
import AICoach from './pages/AICoach';
import DietPlan from './pages/DietPlan';
import Workout from './pages/Workout';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0e1a] relative">
          {/* Mobile Header with Hamburger */}
          <div className="md:hidden p-4 flex items-center gap-4 border-b border-gray-800 bg-[#111827]">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="text-xl font-bold text-gradient">Pulse AI</span>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/habits" element={<DailyHabits />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/coach" element={<AICoach />} />
            <Route path="/diet" element={<DietPlan />} />
            <Route path="/workout" element={<Workout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
