import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code2, Binary, Flame, Heart, Shield } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container py-12 relative z-10 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                CodeQuest
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              "Learn • Play • Code • Conquer" — The interactive gamified academy transforming Python and Data Structures into an epic quest.
            </p>
          </div>

          {/* Worlds */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Quest Realms
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/worlds/python" className="hover:text-purple-600 transition-colors flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Python World</span>
                </Link>
              </li>
              <li>
                <Link to="/worlds/dsa" className="hover:text-purple-600 transition-colors flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5 text-indigo-500" />
                  <span>DSA Citadel</span>
                </Link>
              </li>
              <li>
                <Link to="/worlds/adventure" className="hover:text-purple-600 transition-colors flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-pink-500" />
                  <span>Adventure Realm</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><span>Interactive Topic Lessons</span></li>
              <li><span>Arcade Minigames & Puzzles</span></li>
              <li><span>4-Choice Knowledge Quizzes</span></li>
              <li><span>Python Coding Challenges</span></li>
              <li><span>XP & Unlock Progression</span></li>
            </ul>
          </div>

          {/* Quick Links & Admin */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Access
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-purple-600 transition-colors">
                  Player Dashboard
                </Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-purple-600 transition-colors">
                  XP & Achievements
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-purple-600 transition-colors">
                  Adventurer Profile
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-purple-600 transition-colors flex items-center gap-1 text-purple-600 font-medium">
                  <Shield className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} CodeQuest. Built for curious coders worldwide.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>for computer science learners.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
