import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  Lock,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  Zap,
  Trophy,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { login } from '../services/authService';
import SafeImage from '../components/SafeImage';
import { mascotHeroImg } from '../assets/images';
import './Login.css';

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrUsername.trim() || !password) {
      setError('Please provide both your email/username and password');
      return;
    }

    setLoading(true);
    try {
      const data = await login({ emailOrUsername: emailOrUsername.trim(), password });
      setLoading(false);
      // If user is admin and was trying to access admin, or if student, redirect
      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from);
      }
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(msg);
    }
  };

  // Quick helper to fill demo credentials
  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmailOrUsername('admin@codequest.dev');
      setPassword('Admin@CodeQuest2026');
    } else {
      setEmailOrUsername('coder@codequest.dev');
      setPassword('Student@CodeQuest2026');
    }
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Ambient background orbs */}
      <div className="cq-bg-ambient">
        <div className="cq-orb-1" />
        <div className="cq-orb-2" />
        <div className="cq-orb-3" />
      </div>

      <div className="w-full max-w-5xl cq-card rounded-3xl overflow-hidden shadow-2xl border border-white/80 relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* LEFT COLUMN: Coding Adventure Portal Visual */}
        <div className="lg:col-span-5 bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-600 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Floating symbols decoration */}
          <div className="absolute top-4 right-4 text-white/20 font-mono text-2xl font-bold select-none pointer-events-none">
            &lt;/&gt;
          </div>
          <div className="absolute bottom-20 left-4 text-white/15 font-mono text-3xl font-bold select-none pointer-events-none">
            {'{ }'}
          </div>
          <div className="absolute top-1/2 right-6 text-white/15 font-mono text-2xl font-bold select-none pointer-events-none">
            [ ]
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold text-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Adventure Portal</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              YOUR CODING ADVENTURE STARTS HERE
            </h2>

            <p className="text-xs sm:text-sm text-purple-200 font-medium">
              Learn • Play • Code • Conquer
            </p>
          </div>

          {/* Center Mascot & Floating Badges */}
          <div className="relative my-6 flex flex-col items-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 p-1 bg-white/10 backdrop-blur-sm">
              <SafeImage
                src={mascotHeroImg}
                alt="CodeQuest Mascot"
                fallbackType="mascot"
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Floating Level Badge */}
            <div className="absolute -bottom-3 -right-2 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg floating-badge flex items-center gap-1.5 border border-amber-200">
              <Trophy className="w-3.5 h-3.5 fill-amber-950" />
              <span>Level Up!</span>
            </div>

            {/* Floating XP Badge */}
            <div className="absolute -top-3 -left-2 bg-purple-900/90 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg floating-badge flex items-center gap-1.5 border border-purple-400">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>Earn 500+ XP</span>
            </div>
          </div>

          {/* Bottom encouragement & quick demo logins */}
          <div className="relative z-10 space-y-3 pt-2 border-t border-white/20">
            <p className="text-xs text-purple-200 italic">
              "Ready to level up your programming prowess?"
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-purple-300">Quick Test:</span>
              <button
                type="button"
                onClick={() => fillDemo('student')}
                className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white transition-colors text-[11px] cursor-pointer"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white transition-colors text-[11px] cursor-pointer"
              >
                Admin Demo
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Glassmorphism Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white/95">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                Welcome back, Coder! ✨
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter the CodeQuest world and continue your adventure.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username or Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="coder@codequest.dev or PixelCoder"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-[11px] text-purple-600 font-medium select-none">
                    Min. 6 characters
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-md shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <span>ENTER CODEQUEST 🚀</span>
                    <Rocket className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer link to register */}
            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600 space-y-1">
              <p>
                New to CodeQuest?{' '}
                <Link
                  to="/register"
                  className="font-bold text-purple-700 hover:text-purple-800 hover:underline"
                >
                  Create your account ✨
                </Link>
              </p>
              <p>
                Staff or Instructor?{' '}
                <Link
                  to="/admin/login"
                  className="font-medium text-slate-500 hover:text-purple-600"
                >
                  Admin Portal
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
