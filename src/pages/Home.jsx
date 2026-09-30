import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  Compass,
  Code2,
  Binary,
  Flame,
  Gamepad2,
  HelpCircle,
  Code,
  Trophy,
  ArrowRight,
  CheckCircle,
  Play,
  ChevronRight,
  Shield,
} from 'lucide-react';
import CuteCoderHero from '../components/CuteCoderHero';
import SafeImage from '../components/SafeImage';
import { pythonWorldImg, dsaCitadelImg, adventurePortalImg } from '../assets/images';
import './Home.css';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('cq_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleStartLearning = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleExploreWorlds = () => {
    const element = document.getElementById('worlds-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/worlds/python');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient background decoration */}
      <div className="cq-bg-ambient">
        <div className="cq-orb-1" />
        <div className="cq-orb-2" />
        <div className="cq-orb-3" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                  <span>Learn • Play • Code • Conquer</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Become a Master Coder Through{' '}
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    Epic Adventures
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Master <strong>Python</strong> and <strong>Data Structures & Algorithms</strong> through interactive games, challenges and adventures. Level up your skills, conquer dungeons, and unlock real programming power!
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={handleStartLearning}
                    className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>START LEARNING 🚀</span>
                  </button>

                  <button
                    onClick={handleExploreWorlds}
                    className="w-full sm:w-auto px-8 py-4 text-base font-bold text-purple-700 bg-white/90 hover:bg-white border border-purple-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-5 h-5 text-purple-500" />
                    <span>EXPLORE WORLDS 🌎</span>
                  </button>
                </div>

                {/* Highlights pill row */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    24+ Interactive Lessons
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Real Python Evaluator
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Zero Fluff, 100% Gamified
                  </span>
                </div>
              </div>

              {/* Right Column: Cute 2D Animated Student Girl Coding */}
              <div className="lg:col-span-5 relative flex justify-center w-full">
                <CuteCoderHero />
              </div>

            </div>
          </div>
        </section>

        {/* 3 WORLDS PREVIEW SECTION */}
        <section id="worlds-section" className="py-16 bg-white/60 backdrop-blur-sm border-y border-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                The CodeQuest Universe
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                Explore Three Magical Realms
              </h2>
              <p className="text-sm text-slate-600">
                Each realm features structured levels, interactive puzzle games, quizzes, and live coding challenges designed to forge practical mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* World 1: Python */}
              <div className="cq-card rounded-3xl overflow-hidden p-3 hover:border-emerald-300 cq-card-hover flex flex-col justify-between">
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 bg-slate-900">
                    <SafeImage
                      src={pythonWorldImg}
                      alt="Python Island"
                      fallbackType="python"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Level 1 – 6</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                    Python World
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    From basic variables, conditionals and loops to functions, list comprehensions, exceptions and Object-Oriented Programming.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    12 Topics · 4 Games
                  </span>
                  <Link
                    to="/worlds/python"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Enter World</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* World 2: DSA */}
              <div className="cq-card rounded-3xl overflow-hidden p-3 hover:border-indigo-300 cq-card-hover flex flex-col justify-between">
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 bg-slate-900">
                    <SafeImage
                      src={dsaCitadelImg}
                      alt="DSA Citadel"
                      fallbackType="dsa"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-indigo-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Binary className="w-3.5 h-3.5" />
                      <span>Level 1 – 10</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                    DSA Citadel
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Master Big-O analysis, Linked Lists, Stacks, Queues, Binary Trees, Graphs (BFS/DFS), Sorting algorithms and Dynamic Programming.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    12 Topics · 4 Games
                  </span>
                  <Link
                    to="/worlds/dsa"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-800"
                  >
                    <span>Enter Citadel</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* World 3: Adventure */}
              <div className="cq-card rounded-3xl overflow-hidden p-3 hover:border-pink-300 cq-card-hover flex flex-col justify-between">
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 bg-slate-900">
                    <SafeImage
                      src={adventurePortalImg}
                      alt="Adventure Realm"
                      fallbackType="adventure"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-pink-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Hybrid Stages</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                    Adventure Realm
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    The ultimate crossover where Python syntax and DSA structures combine into full dungeon boss fights and multi-step algorithmic puzzles.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                    6 Stages · Boss Riddle
                  </span>
                  <Link
                    to="/worlds/adventure"
                    className="inline-flex items-center gap-1 text-xs font-bold text-pink-700 hover:text-pink-800"
                  >
                    <span>Enter Realm</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-STEP LEARNING JOURNEY */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                The Proven Pedagogical Loop
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                How CodeQuest Transforms You
              </h2>
              <p className="text-sm text-slate-600">
                Every topic is crafted around active recall and real-time execution, not passive video watching.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="cq-card rounded-2xl p-6 relative">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-heading text-xl font-bold mb-4">
                  01
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  Learn with Syntax
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bite-sized, crystal-clear conceptual explanations, code syntax, and common pitfalls to avoid.
                </p>
              </div>

              {/* Step 2 */}
              <div className="cq-card rounded-2xl p-6 relative">
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-heading text-xl font-bold mb-4">
                  02
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  Play Minigames
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Solidify intuition through visual mini-games: Stack towers, Queue gates, and List treasure hunts.
                </p>
              </div>

              {/* Step 3 */}
              <div className="cq-card rounded-2xl p-6 relative">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-heading text-xl font-bold mb-4">
                  03
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  Ace Topic Quizzes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  4-option multiple choice quizzes testing edge cases and code outputs with immediate rich feedback.
                </p>
              </div>

              {/* Step 4 */}
              <div className="cq-card rounded-2xl p-6 relative">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-heading text-xl font-bold mb-4">
                  04
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  Code & Unlock Next
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Solve real challenges verified against hidden test cases. Earn XP, level up, and unlock the next topic!
                </p>
              </div>
            </div>

            {/* Bottom Call to action banner */}
            <div className="mt-16 cq-card rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-pink-600/90 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  Ready to Start Your Coding Odyssey?
                </h3>
                <p className="text-sm text-purple-100 leading-relaxed">
                  Join thousands of learners mastering Python and Algorithms through hands-on gamified challenges.
                </p>
                <div className="pt-2">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-purple-900 bg-white hover:bg-purple-50 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-0.5"
                  >
                    <span>Create Free Account ✨</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
