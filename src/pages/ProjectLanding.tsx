import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Bot, Dumbbell, Sparkles, HeartPulse, Trophy, Utensils, ArrowRight } from 'lucide-react';

const ProjectLanding: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-0px)] bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-teal-300 text-sm">
              <Sparkles size={16} />
              Final Year Project • 2025
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
              AI Health Coach
              <span className="block text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">
                Diet • Workout • Habits
              </span>
            </h1>
            <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
              A personalized wellness web app powered by Google Gemini. Generate meal plans, get AI workout recommendations,
              and track daily goals with a clean dashboard.
            </p>

            {/* Redirect Button to real project */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <RouterLink
                to="/app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors shadow-lg shadow-teal-500/20"
              >
                Open Real Project
                <ArrowRight size={18} />
              </RouterLink>


              <RouterLink
                to="/coach"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50 text-gray-200 font-semibold transition-colors"
              >
                Try AI Coach
                <Bot size={18} />
              </RouterLink>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              Tip: This landing page summarizes the features and project details.
              Use the button to redirect into the full application.
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl" />

            <div className="relative glass-card p-6 sm:p-8 border border-gray-800/60">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-500/20 rounded-xl">
                  <HeartPulse size={28} className="text-teal-300" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">Project Snapshot</div>
                  <div className="text-gray-400 text-sm">What this app can do</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                  <div className="text-teal-300 font-semibold flex items-center gap-2">
                    <Utensils size={18} /> Diet Plans
                  </div>
                  <div className="text-gray-400 text-sm mt-1">AI structured meals + logging</div>
                </div>
                <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                  <div className="text-cyan-300 font-semibold flex items-center gap-2">
                    <Dumbbell size={18} /> Workout Tracker
                  </div>
                  <div className="text-gray-400 text-sm mt-1">AI plans + activity tracking</div>
                </div>
                <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                  <div className="text-teal-300 font-semibold flex items-center gap-2">
                    <Trophy size={18} /> Daily Habits
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Water, sleep, gamified goals</div>
                </div>
                <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                  <div className="text-cyan-300 font-semibold flex items-center gap-2">
                    <Bot size={18} /> Gemini Coach
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Personalized chat advice</div>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-800/70 pt-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    'React 19 + TypeScript',
                    'Redux Toolkit',
                    'Tailwind CSS',
                    'Google Gemini 1.5 Flash',
                    'Vite',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800/30 border border-gray-700/40 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500 leading-relaxed">
                Project docs: <span className="text-gray-300">docs/ARCHITECTURE.md</span>,{' '}
                <span className="text-gray-300">docs/WORKFLOWS.md</span>, and <span className="text-gray-300">docs/UML_DIAGRAMS.md</span>.
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">All Features</h2>
            <div className="text-gray-400 text-sm">A quick list of what the full app includes</div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Dashboard',
                desc: 'BMI/BMR overview, daily goal status, and quick actions.',
                icon: <Sparkles size={18} className="text-teal-400" />,
              },
              {
                title: 'AI Diet Plan',
                desc: 'Generate meal recommendations and log meals by type.',
                icon: <Utensils size={18} className="text-cyan-400" />,
              },
              {
                title: 'Workout Tracker',
                desc: 'Track walking/running/gym time and incorporate AI suggestions.',
                icon: <Dumbbell size={18} className="text-orange-300" />,
              },
              {
                title: 'Daily Habits',
                desc: 'Water + sleep tracking with goal completion and progress.',
                icon: <HeartPulse size={18} className="text-teal-300" />,
              },
              {
                title: 'AI Coach (Gemini)',
                desc: 'Chat-based recommendations using your daily logged context.',
                icon: <Bot size={18} className="text-purple-300" />,
              },
              {
                title: 'User Profile',
                desc: 'Create/edit profile and compute estimated calorie needs.',
                icon: <Trophy size={18} className="text-cyan-300" />,
              },
            ].map((f) => (
              <div key={f.title} className="glass-card p-5 border border-gray-800/60 hover:border-teal-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gray-900/30 rounded-lg border border-gray-700/40">{f.icon}</div>
                  <h3 className="text-white font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project details */}
        <div className="mt-12">
          <div className="glass-card p-6 sm:p-8 border border-gray-800/60">
            <h2 className="text-2xl font-bold text-white">Project Details</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Goal</div>
                <div className="text-white font-semibold mt-1">Personalized fitness and wellness planning</div>
                <div className="text-gray-400 text-sm mt-2">
                  Generate diet and workout suggestions, then track daily habits to keep users consistent.
                </div>
              </div>
              <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                <div className="text-gray-400 text-sm">AI Engine</div>
                <div className="text-white font-semibold mt-1">Google Gemini 1.5 Flash</div>
                <div className="text-gray-400 text-sm mt-2">
                  Uses your logged diet/workout/habits context to provide tailored guidance.
                </div>
              </div>
              <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Architecture</div>
                <div className="text-white font-semibold mt-1">React + Redux + Vite</div>
                <div className="text-gray-400 text-sm mt-2">
                  UI renders pages, Redux stores histories, and Gemini powers structured plan generation.
                </div>
              </div>
              <div className="bg-gray-900/30 border border-gray-700/40 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Backend</div>
                <div className="text-white font-semibold mt-1">Python (FastAPI/Flask-like)</div>
                <div className="text-gray-400 text-sm mt-2">
                  Used for TDEE prediction (see backend/main.py).
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/docs/ARCHITECTURE.md"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50 text-gray-200 font-semibold transition-colors"
              >
                View Architecture Docs
              </a>
              <RouterLink
                to="/app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors shadow-lg shadow-teal-500/20"
              >
                Enter App
                <ArrowRight size={18} />
              </RouterLink>

            </div>

            <div className="mt-4 text-xs text-gray-500">
              Note: If your hosting environment doesn’t serve Markdown under /docs, open these files directly from the repository.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLanding;

