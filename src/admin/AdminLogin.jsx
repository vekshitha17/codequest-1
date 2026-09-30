import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { login } from '../services/authService';
import './AdminLogin.css';

export default function AdminLogin() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login({
        emailOrUsername: emailOrUsername.trim(),
        password,
      });

      setLoading(false);
      if (data.user?.role !== 'admin') {
        setError('Access denied: You do not have administrator permissions.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 relative">
      <div className="cq-bg-ambient">
        <div className="cq-orb-1" />
        <div className="cq-orb-3" />
      </div>

      <div className="w-full max-w-md cq-card rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 admin-login-card border border-purple-200">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-800 text-white shadow-md shadow-purple-900/30 mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Admin Master Portal
          </h1>
          <p className="text-xs text-slate-500">
            Authenticate with CodeQuest administrative privileges.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Admin Identifier</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="admin@codequest.dev"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Admin Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <span>Verifying role...</span> : <span>Enter Admin Dashboard</span>}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          <Link to="/login" className="text-purple-600 hover:underline">
            Switch to Student Login
          </Link>
        </div>
      </div>
    </div>
  );
}
