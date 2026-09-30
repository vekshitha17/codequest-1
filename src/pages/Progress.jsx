import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Sparkles,
  Trophy,
  CheckCircle,
  Gamepad2,
  HelpCircle,
  Code,
  ArrowLeft,
  Calendar,
  Layers,
} from 'lucide-react';
import { getProgress } from '../services/progressService';
import { getCurrentUser } from '../services/authService';
import ProgressBar from '../components/ProgressBar';
import XPBadge from '../components/XPBadge';
import LoadingState from '../components/LoadingState';
import './Progress.css';

export default function Progress() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [uData, pData] = await Promise.all([
        getCurrentUser(),
        getProgress(),
      ]);
      setUser(uData.user);
      setStats(pData.stats);
      setRecords(pData.progress || []);
    } catch (e) {
      console.error('Failed to load progress records:', e);
      setError('Unable to load progress telemetry. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading progress telemetry..."
        subtitle="Crunching realm statistics, score history, and XP achievements..."
      />
    );
  }

  if (error && !user) {
    return (
      <LoadingState
        error={error}
        onRetry={fetchData}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <XPBadge xp={user?.xp || 0} level={user?.level || 1} />
      </div>

      {/* OVERVIEW STATS */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
            Player Telemetry
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Progress & Mastery Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time MongoDB logs of all topics conquered, minigame completions, quiz scores, and coding challenge runs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
            <ProgressBar
              value={stats?.overallPercentage || 0}
              max={100}
              label="Overall Mastery"
              color="from-purple-600 to-indigo-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
            <ProgressBar
              value={stats?.pythonPercentage || 0}
              max={100}
              label="Python World"
              color="from-emerald-500 to-teal-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <ProgressBar
              value={stats?.dsaPercentage || 0}
              max={100}
              label="DSA Citadel"
              color="from-indigo-500 to-blue-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 space-y-2">
            <ProgressBar
              value={stats?.adventurePercentage || 0}
              max={100}
              label="Adventure Realm"
              color="from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </div>

      {/* DETAILED ACTIVITY RECORDS TABLE */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading text-lg font-bold text-slate-900">
          Individual Topic Activity Records ({records.length})
        </h2>

        {records.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="pb-3 px-3">Topic ID</th>
                  <th className="pb-3 px-3">Realm</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Minigame</th>
                  <th className="pb-3 px-3">Quiz</th>
                  <th className="pb-3 px-3">Challenge</th>
                  <th className="pb-3 px-3">Attempts</th>
                  <th className="pb-3 px-3 text-right">XP Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr key={rec._id || rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-slate-800">
                      {rec.topicId}
                    </td>
                    <td className="py-3 px-3 capitalize">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {rec.world}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {rec.completed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Conquered</span>
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">In Progress</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {rec.gameCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {rec.quizCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {rec.codingCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums text-slate-600">
                      {rec.attempts || 1}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-600 text-right">
                      +{rec.xpEarned || 0} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            No activity records logged yet. Complete your first topic or minigame to populate this table!
          </div>
        )}
      </div>
    </div>
  );
}
