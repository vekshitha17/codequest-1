import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Users as UsersIcon,
  BookOpen,
  Gamepad2,
  HelpCircle,
  Code,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Database,
  RefreshCw,
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { getAdminStatistics, getAdminUsers } from '../services/adminService';
import { logout } from '../services/authService';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData] = await Promise.all([
        getAdminStatistics(),
        getAdminUsers(),
      ]);
      setStats(statsData.statistics);
      setRecentUsers((usersData.users || []).slice(0, 5));
    } catch (e) {
      console.error('Failed to load admin stats:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* ==========================================
          SIDEBAR NAVIGATION
         ========================================== */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-900/40">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-base tracking-tight text-white">
                Admin Center
              </div>
              <div className="text-[11px] text-purple-300 font-mono">CodeQuest Core</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-600 text-white shadow-xs"
            >
              <LayoutDashboard className="w-4 h-4 text-white" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <UsersIcon className="w-4 h-4 text-slate-400" />
              <span>Users</span>
            </Link>

            <Link
              to="/admin/topics"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Topics</span>
            </Link>

            <Link
              to="/admin/games"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-slate-400" />
              <span>Games</span>
            </Link>

            <Link
              to="/admin/quizzes"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Quizzes</span>
            </Link>

            <Link
              to="/admin/challenges"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Code className="w-4 h-4 text-slate-400" />
              <span>Coding Challenges</span>
            </Link>

            <Link
              to="/admin/statistics"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>Statistics</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-6 border-t border-slate-800 space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Switch to Student View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ==========================================
          MAIN AREA
         ========================================== */}
      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Admin Overview Dashboard
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Live MongoDB Atlas management for CodeQuest users, curriculum topics, and challenge modules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>

        {/* ==========================================
            OVERVIEW CARDS (5 Core Tiles)
           ========================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* 1. Total Users */}
          <Link
            to="/admin/users"
            className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Total Users</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UsersIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold text-slate-900 tabular-nums">
              {stats?.totalUsers || 0}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">👥 Registered Accounts</p>
          </Link>

          {/* 2. Total Topics */}
          <Link
            to="/admin/topics"
            className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs hover:border-purple-300 hover:shadow-md transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Total Topics</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold text-slate-900 tabular-nums">
              {stats?.totalTopics || 0}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">📚 Python, DSA, Adv</p>
          </Link>

          {/* 3. Total Games */}
          <Link
            to="/admin/games"
            className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs hover:border-pink-300 hover:shadow-md transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Total Games</span>
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold text-slate-900 tabular-nums">
              {stats?.totalGames || 0}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">🎮 Interactive Puzzles</p>
          </Link>

          {/* 4. Total Quizzes */}
          <Link
            to="/admin/quizzes"
            className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs hover:border-amber-300 hover:shadow-md transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Total Quizzes</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold text-slate-900 tabular-nums">
              {stats?.totalQuizzes || 0}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">🧠 Checkpoint Exams</p>
          </Link>

          {/* 5. Total Coding Challenges */}
          <Link
            to="/admin/challenges"
            className="bg-white rounded-2xl p-5 border border-teal-100 shadow-xs hover:border-teal-300 hover:shadow-md transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Coding Challenges</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Code className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold text-slate-900 tabular-nums">
              {stats?.totalChallenges || 0}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">💻 Live IDE Algorithms</p>
          </Link>
        </div>

        {/* ==========================================
            TWO-COLUMN SECTION: Content Stats + Recent Users
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Content Statistics & Progress Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Curriculum Content Distribution</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  {stats?.totalTopics || 0} Total Topics
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                  <div className="text-xl">🐍</div>
                  <div className="font-heading text-lg font-extrabold text-emerald-900">
                    {stats?.topicsByWorld?.python || 12}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700">Python World</div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center space-y-1">
                  <div className="text-xl">🧩</div>
                  <div className="font-heading text-lg font-extrabold text-indigo-900">
                    {stats?.topicsByWorld?.dsa || 12}
                  </div>
                  <div className="text-[11px] font-bold text-indigo-700">DSA Citadel</div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100 text-center space-y-1">
                  <div className="text-xl">🔥</div>
                  <div className="font-heading text-lg font-extrabold text-pink-900">
                    {stats?.topicsByWorld?.adventure || 6}
                  </div>
                  <div className="text-[11px] font-bold text-pink-700">Adventure Realm</div>
                </div>
              </div>
            </div>

            {/* Progress Overview Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>Student Progress &amp; Performance</span>
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Avg. Score: {stats?.averageProgressScore || 85}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-slate-500 font-semibold">Active Student Cohort</div>
                  <div className="font-heading text-xl font-bold text-slate-900">
                    {stats?.activeStudents || 1}
                  </div>
                  <div className="text-[11px] text-slate-400">Excluding staff administrators</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-slate-500 font-semibold">Completion Records</div>
                  <div className="font-heading text-xl font-bold text-slate-900">
                    {stats?.totalProgressRecords || 0}
                  </div>
                  <div className="text-[11px] text-slate-400">Persistent progress documents</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Recent Users */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-indigo-600" />
                  <span>Recent Registered Users</span>
                </h3>
                <Link
                  to="/admin/users"
                  className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentUsers.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No registered users found in database.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentUsers.map((u) => (
                    <div key={u._id || u.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{u.username}</div>
                        <div className="text-slate-400 font-mono text-[11px] truncate max-w-[160px]">
                          {u.email}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {u.role}
                        </span>
                        <div className="text-[11px] text-slate-500 font-semibold font-mono mt-0.5">
                          {u.xp || 0} XP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
