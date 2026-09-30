import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  Code2,
  Binary,
  Flame,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { logout } from '../services/authService';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const rawUser = localStorage.getItem('cq_user');
    if (rawUser) {
      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/login');
  };

  const navLinks = currentUser ? [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/dashboard', label: 'Dashboard', icon: Sparkles },
    { to: '/worlds/python', label: 'Python World', icon: Code2 },
    { to: '/worlds/dsa', label: 'DSA Citadel', icon: Binary },
    { to: '/worlds/adventure', label: 'Adventure', icon: Flame },
    { to: '/progress', label: 'Progress', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
  ] : [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/worlds/python', label: 'Python World', icon: Code2 },
    { to: '/worlds/dsa', label: 'DSA Citadel', icon: Binary },
    { to: '/worlds/adventure', label: 'Adventure', icon: Flame },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100/80 navbar-container shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                CodeQuest
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-purple-400">
                Learn · Play · Code
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive ? 'active' : 'text-slate-600 hover:text-purple-600'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {currentUser?.role === 'admin' && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  } transition-colors`
                }
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin Hub</span>
              </NavLink>
            )}
          </nav>

          {/* User Profile / Auth Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* XP Chip */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-amber-800 text-xs font-semibold shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="tabular-nums font-mono">{currentUser.xp || 0} XP</span>
                  <span className="text-amber-400">·</span>
                  <span>Lv.{currentUser.level || 1}</span>
                </div>

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-purple-300 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">
                    {currentUser.username}
                  </span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  title="Log out of CodeQuest"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-xl shadow-sm shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start Adventure 🚀
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-semibold">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="tabular-nums font-mono">{currentUser.xp || 0}</span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-indigo-100 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-purple-500" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {currentUser?.role === 'admin' && (
            <NavLink
              to="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-purple-50 text-purple-800"
            >
              <ShieldAlert className="w-5 h-5 text-purple-600" />
              <span>Admin Hub</span>
            </NavLink>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out ({currentUser.username})</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="text-center px-4 py-2.5 text-sm font-medium text-purple-700 bg-purple-50 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
