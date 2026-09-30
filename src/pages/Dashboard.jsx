import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Trophy,
  BookOpen,
  Gamepad2,
  HelpCircle,
  Code,
  ArrowRight,
  Code2,
  Binary,
  Flame,
  CheckCircle2,
  ChevronRight,
  Compass,
  Star,
  Layers,
  Award,
} from 'lucide-react';
import { getCurrentUser } from '../services/authService';
import { getProgress } from '../services/progressService';
import { getTopics } from '../services/topicService';
import ProgressBar from '../components/ProgressBar';
import XPBadge from '../components/XPBadge';
import LoadingState from '../components/LoadingState';
import { calculateLevel, getNextLevelThreshold, getLevelTitle } from '../utils/helpers';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [progressStats, setProgressStats] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [userData, progressData, topicsData] = await Promise.all([
        getCurrentUser(),
        getProgress(),
        getTopics(),
      ]);

      setUser(userData.user);
      setProgressStats(progressData.stats);
      const allTopics = Array.isArray(topicsData)
        ? topicsData
        : (topicsData?.topics || topicsData?.data || []);
      setTopics(allTopics);
      setError('');
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      const raw = localStorage.getItem('cq_user');
      if (raw) {
        try {
          setUser(JSON.parse(raw));
        } catch (e) {}
      } else {
        setError('Failed to load profile data. Please refresh or verify login.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading your adventure..."
        subtitle="Retrieving player stats, realm progress, and active quests..."
      />
    );
  }

  if (error && !user) {
    return (
      <LoadingState
        error={error}
        onRetry={fetchDashboardData}
      />
    );
  }

  const currentLevel = calculateLevel(user?.xp || 0);
  const nextLevelXP = getNextLevelThreshold(currentLevel);
  const prevLevelXP = currentLevel > 1 ? getNextLevelThreshold(currentLevel - 1) : 0;
  const levelProgress = Math.max(
    0,
    Math.min(
      100,
      Math.round(((user?.xp || 0) - prevLevelXP) / ((nextLevelXP - prevLevelXP) || 1) * 100)
    )
  );

  const completedSet = new Set(user?.completedTopics || []);
  const totalTopics = topics.length;
  const completedTopicsCount = topics.filter(t => completedSet.has(t._id || t.id)).length;

  // Find incomplete topics
  const incompleteTopics = topics.filter(t => !completedSet.has(t._id || t.id));

  // Determine next quest: first unlocked or first incomplete topic
  const nextQuest = incompleteTopics.find(t => !t.isLocked) || incompleteTopics[0] || null;

  // Breakdown topics by world
  const pythonTopics = topics.filter(t => t.world === 'python');
  const dsaTopics = topics.filter(t => t.world === 'dsa');
  const adventureTopics = topics.filter(t => t.world === 'adventure');

  const pythonCompleted = pythonTopics.filter(t => completedSet.has(t._id || t.id)).length;
  const dsaCompleted = dsaTopics.filter(t => completedSet.has(t._id || t.id)).length;
  const adventureCompleted = adventureTopics.filter(t => completedSet.has(t._id || t.id)).length;

  const pythonPercent = pythonTopics.length > 0 ? Math.round((pythonCompleted / pythonTopics.length) * 100) : 0;
  const dsaPercent = dsaTopics.length > 0 ? Math.round((dsaCompleted / dsaTopics.length) * 100) : 0;
  const adventurePercent = adventureTopics.length > 0 ? Math.round((adventureCompleted / adventureTopics.length) * 100) : 0;

  return (
    <div className="dashboard-wrapper min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative ambient background elements */}
      <div className="dashboard-bg-decoration pointer-events-none select-none">
        <span className="floating-symbol sym-1">def</span>
        <span className="floating-symbol sym-2">&#123;&nbsp;&#125;</span>
        <span className="floating-symbol sym-3">&lt;/&gt;</span>
        <span className="floating-symbol sym-4">[&nbsp;]</span>
        <span className="floating-symbol sym-5">&lambda;</span>
        <span className="floating-symbol sym-6">&#9733;</span>
        <span className="floating-symbol sym-7">&#10022;</span>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* ==========================================
            A. WELCOME HERO (High contrast pastel card)
           ========================================== */}
        <div className="welcome-hero-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 text-white shadow-xl relative overflow-hidden border border-purple-400/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold text-amber-300 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                <span>Student Adventurer Codex</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Welcome back, {user?.username || 'Priya'}! ✨
              </h1>
              <p className="text-sm sm:text-base text-purple-100 font-medium max-w-xl leading-relaxed">
                Continue your CodeQuest adventure and master Python &amp; Data Structures.
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-purple-200">
                <span>Rank: <strong className="text-white font-bold">{getLevelTitle(currentLevel)}</strong></span>
                <span>·</span>
                <span>Current Tier: <strong className="text-amber-300 font-bold">Level {currentLevel}</strong></span>
              </div>
            </div>

            {/* XP & Level progress container */}
            <div className="w-full md:w-64 bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-200">Current Mastery</span>
                <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full">
                  Level {currentLevel}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-bold">{user?.xp || 0} XP</span>
                <span className="text-purple-200 text-[11px] font-mono">
                  {nextLevelXP - (user?.xp || 0)} XP to Lvl {currentLevel + 1}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
              <div className="text-[10px] text-right text-purple-300 font-mono">
                {levelProgress}% towards next level
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            B. QUICK STATS (4 attractive cards)
           ========================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Topics Completed */}
          <div className="stat-card group bg-white rounded-2xl p-5 shadow-xs border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700">Topics Completed</span>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {completedTopicsCount}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              of {totalTopics || 30} total curriculum lessons
            </p>
          </div>

          {/* 2. Games Solved */}
          <div className="stat-card group bg-white rounded-2xl p-5 shadow-xs border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700">Games Solved</span>
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-5 h-5" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {user?.completedGames?.length || 0}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              arcade minigames mastered (+20 XP)
            </p>
          </div>

          {/* 3. Quizzes Passed */}
          <div className="stat-card group bg-white rounded-2xl p-5 shadow-xs border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700">Quizzes Passed</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {user?.completedQuizzes?.length || 0}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              knowledge checkpoints scored
            </p>
          </div>

          {/* 4. Coding Challenges */}
          <div className="stat-card group bg-white rounded-2xl p-5 shadow-xs border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700">Coding Challenges</span>
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {user?.completedChallenges?.length || 0}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              algorithms solved &amp; verified
            </p>
          </div>
        </div>

        {/* ==========================================
            E. LEARNING PATH (Interactive visual steps)
           ========================================== */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-indigo-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>Your Learning Path</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                The proven CodeQuest 6-step mastery methodology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {[
              { step: '1', title: 'Learn', desc: 'Concept lessons', color: 'bg-purple-50 text-purple-800 border-purple-200' },
              { step: '2', title: 'Play', desc: 'Mini-arcade puzzle', color: 'bg-pink-50 text-pink-800 border-pink-200' },
              { step: '3', title: 'Quiz', desc: 'Recall check', color: 'bg-amber-50 text-amber-800 border-amber-200' },
              { step: '4', title: 'Code', desc: 'Live IDE challenge', color: 'bg-teal-50 text-teal-800 border-teal-200' },
              { step: '5', title: 'Complete', desc: 'Unlock next step', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
              { step: '6', title: 'Earn XP', desc: 'Level up hero', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
            ].map((s, idx) => (
              <div
                key={s.step}
                className={`p-3 rounded-2xl border ${s.color} text-center space-y-1 relative`}
              >
                <div className="w-6 h-6 rounded-full bg-white/90 text-slate-700 text-xs font-bold flex items-center justify-center mx-auto shadow-xs">
                  {s.step}
                </div>
                <div className="font-heading text-xs font-extrabold">{s.title}</div>
                <div className="text-[10px] text-slate-600 font-medium">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            C. & F. CONTINUE LEARNING / RECOMMENDED QUEST
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: Continue Learning & Recommended Next Quest */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>Continue Learning</span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                {incompleteTopics.length} quests remaining
              </span>
            </div>

            {/* If all conquered */}
            {totalTopics > 0 && completedTopicsCount === totalTopics ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-lg font-bold text-emerald-900">
                  All current topics conquered!
                </h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  You have completed every lesson in the curriculum. Replay minigames or practice in the IDE to push your mastery score higher!
                </p>
              </div>
            ) : nextQuest ? (
              /* F. Highlighted Recommended Next Quest Card */
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border-2 border-indigo-200/90 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Your Next Quest
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Level {nextQuest.level || 1} • {nextQuest.difficulty || 'Beginner'}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>+{nextQuest.xpReward || 20} XP</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900">
                    {nextQuest.world === 'python' ? '🐍 ' : nextQuest.world === 'dsa' ? '🧩 ' : '🔥 '}
                    {nextQuest.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {nextQuest.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    World: <strong className="text-slate-800 capitalize">{nextQuest.world}</strong>
                  </span>
                  <Link
                    to={`/topic/${nextQuest._id || nextQuest.id}`}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Start Quest</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : totalTopics === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center text-slate-500 text-xs border border-slate-200">
                Loading curriculum topics...
              </div>
            ) : null}

            {/* Additional Incomplete Topic List if available */}
            {incompleteTopics.length > 1 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Upcoming Quests In Queue
                </h4>
                <div className="space-y-2.5">
                  {incompleteTopics.slice(1, 4).map((t) => (
                    <div
                      key={t._id || t.id}
                      className="bg-white rounded-2xl p-4 flex items-center justify-between gap-3 border border-slate-200 hover:border-purple-300 transition-colors shadow-2xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                            {t.world === 'python' ? 'Python' : t.world === 'dsa' ? 'DSA' : 'Adventure'} · Lvl {t.level}
                          </span>
                          <span className="text-xs font-semibold text-slate-800 font-medium">
                            {t.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {t.description}
                        </p>
                      </div>

                      <Link
                        to={`/topic/${t._id || t.id}`}
                        className="shrink-0 px-3 py-1.5 text-xs font-bold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ==========================================
              D. WORLD PROGRESS (3 Attractive Cards)
             ========================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>World Progress</span>
              </h2>
              <Link
                to="/progress"
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
              >
                <span>Analytics</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {/* 1. Python World */}
              <div className="bg-white rounded-3xl p-5 shadow-xs border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                      🐍
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-slate-900">
                        Python World
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Variables, Control Flow &amp; OOP
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {pythonPercent}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                    <span>Progress</span>
                    <span>{pythonCompleted} of {pythonTopics.length || 12} topics</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pythonPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/python"
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                  >
                    <span>Enter Python World</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 2. DSA Citadel */}
              <div className="bg-white rounded-3xl p-5 shadow-xs border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg">
                      🧩
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-slate-900">
                        DSA Citadel
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Arrays, Trees, Graphs &amp; DP
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    {dsaPercent}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                    <span>Progress</span>
                    <span>{dsaCompleted} of {dsaTopics.length || 12} topics</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${dsaPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/dsa"
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                  >
                    <span>Enter DSA Citadel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 3. Adventure Realm */}
              <div className="bg-white rounded-3xl p-5 shadow-xs border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-800 flex items-center justify-center font-bold text-lg">
                      🔥
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-slate-900">
                        Adventure Realm
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Hybrid Synthesis &amp; Boss Stages
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-pink-800 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                    {adventurePercent}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                    <span>Progress</span>
                    <span>{adventureCompleted} of {adventureTopics.length || 6} topics</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-pink-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${adventurePercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/adventure"
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-pink-800 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors"
                  >
                    <span>Enter Adventure Realm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
