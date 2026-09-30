import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Gamepad2,
  Sparkles,
  Trophy,
  CheckCircle,
  Lock,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { getTopics } from '../services/topicService';
import { getGames } from '../services/gameService';
import TopicCard from '../components/TopicCard';
import GameCard from '../components/GameCard';
import SafeImage from '../components/SafeImage';
import LoadingState from '../components/LoadingState';
import { adventurePortalImg } from '../assets/images';
import './AdventureWorld.css';

export default function AdventureWorld() {
  const [topics, setTopics] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdventureData();
  }, []);

  const fetchAdventureData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [topicsRes, gamesRes] = await Promise.all([
        getTopics('adventure'),
        getGames({ world: 'adventure' }),
      ]);
      const topicList = Array.isArray(topicsRes)
        ? topicsRes
        : (topicsRes?.topics || topicsRes?.data || []);
      const gameList = Array.isArray(gamesRes)
        ? gamesRes
        : (gamesRes?.games || gamesRes?.data || []);
      setTopics(topicList);
      setGames(gameList);
    } catch (err) {
      console.error('Failed to load Adventure realm:', err);
      setError('Failed to load Adventure Realm stages. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const completedCount = topics.filter(t => t.isCompleted).length;
  const totalCount = topics.length || 6;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-pink-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-xs font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
          World 3 of 3 · Endgame
        </span>
      </div>

      {/* HEADER BANNER */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 adventure-header-banner shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>Python + DSA Synthesis Quest</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Adventure Realm
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-xl leading-relaxed">
            Where Python programming and algorithm theory forge into one. Conquer 6 multi-stage boss trials combining list comprehensions with array searching, recursion with call stacks, and dynamic programming with graph exploration!
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700 justify-center md:justify-start">
            <span className="flex items-center gap-1 text-pink-800">
              <CheckCircle className="w-4 h-4 text-pink-600" />
              {completedCount} / {totalCount} Conquered
            </span>
            <span>·</span>
            <span className="font-mono text-purple-700 font-bold">{percent}% Mastered</span>
          </div>
        </div>

        {/* Artwork thumbnail */}
        <div className="w-44 h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 shrink-0 bg-slate-900">
          <SafeImage
            src={adventurePortalImg}
            alt="Adventure Portal"
            fallbackType="adventure"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* STAGES GRID */}
      {loading ? (
        <LoadingState
          message="Loading Adventure Realm stages..."
          subtitle="Preparing the multi-stage boss trials combining Python & DSA..."
        />
      ) : error ? (
        <LoadingState
          error={error}
          onRetry={fetchAdventureData}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              The 6 Boss Trial Stages
            </h2>
            <span className="text-xs text-slate-500">Progressive Unlocks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicCard key={topic._id || topic.id} topic={topic} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
