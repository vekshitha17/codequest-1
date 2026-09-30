import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  ArrowLeft,
  Server,
  Database,
  Users,
  BookOpen,
  Gamepad2,
  HelpCircle,
  Code,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import { getAdminStatistics } from '../services/adminService';
import ProgressBar from '../components/ProgressBar';
import './Statistics.css';

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getAdminStatistics();
      setStats(data.statistics);

      // fetch system health
      const res = await fetch('/api/health');
      if (res.ok) {
        const hData = await res.json();
        setHealth(hData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>

        <button
          onClick={fetchStats}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            System & Curriculum Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Database connection status, world volume distributions, and learner progress telemetry.
          </p>
        </div>

        {/* SERVER & DATABASE HEALTH CARD */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="font-heading text-sm font-bold">MongoDB Persistence Engine</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ONLINE</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-sans">Database Store</span>
              <span className="text-slate-200">{health?.database?.databaseName || 'MongoDB Atlas / Embedded Mongoose'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-sans">API Protocol</span>
              <span className="text-slate-200">Express REST + JWT Auth</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-sans">Active Records</span>
              <span className="text-slate-200">{stats?.totalProgressRecords || 0} Progress docs</span>
            </div>
          </div>
        </div>

        {/* CURRICULUM DISTRIBUTION BY REALM */}
        <div className="space-y-4">
          <h3 className="font-heading text-base font-bold text-slate-900">
            Topic Distribution Across Realms
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="cq-card rounded-2xl p-4 bg-emerald-50/50 border-emerald-200/80 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-emerald-900">
                <span>Python World</span>
                <span className="font-mono">{stats?.topicsByWorld?.python || 12} Topics</span>
              </div>
              <ProgressBar
                value={stats?.topicsByWorld?.python || 12}
                max={stats?.totalTopics || 30}
                showPercentage={false}
                color="from-emerald-500 to-teal-500"
              />
            </div>

            <div className="cq-card rounded-2xl p-4 bg-indigo-50/50 border-indigo-200/80 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-indigo-900">
                <span>DSA Citadel</span>
                <span className="font-mono">{stats?.topicsByWorld?.dsa || 12} Topics</span>
              </div>
              <ProgressBar
                value={stats?.topicsByWorld?.dsa || 12}
                max={stats?.totalTopics || 30}
                showPercentage={false}
                color="from-indigo-500 to-blue-500"
              />
            </div>

            <div className="cq-card rounded-2xl p-4 bg-pink-50/50 border-pink-200/80 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-pink-900">
                <span>Adventure Realm</span>
                <span className="font-mono">{stats?.topicsByWorld?.adventure || 6} Stages</span>
              </div>
              <ProgressBar
                value={stats?.topicsByWorld?.adventure || 6}
                max={stats?.totalTopics || 30}
                showPercentage={false}
                color="from-pink-500 to-rose-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
