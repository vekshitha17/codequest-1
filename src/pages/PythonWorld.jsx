import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Gamepad2,
  Sparkles,
  Trophy,
  CheckCircle,
  Lock,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { getTopics } from '../services/topicService';
import { getGames } from '../services/gameService';
import TopicCard from '../components/TopicCard';
import GameCard from '../components/GameCard';
import SafeImage from '../components/SafeImage';
import LoadingState from '../components/LoadingState';
import { pythonWorldImg } from '../assets/images';
import './PythonWorld.css';

export default function PythonWorld() {
  const [topics, setTopics] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    fetchPythonData();
  }, []);

  const fetchPythonData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [topicsRes, gamesRes] = await Promise.all([
        getTopics('python'),
        getGames({ world: 'python' }),
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
      console.error('Failed to load Python world:', err);
      setError('Failed to load Python World curriculum. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const filteredTopics = selectedLevel === 'all'
    ? topics
    : topics.filter(t => Number(t.level) === Number(selectedLevel));

  const completedCount = topics.filter(t => t.isCompleted).length;
  const totalCount = topics.length || 12;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          World 1 of 3
        </span>
      </div>

      {/* HEADER BANNER */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 python-header-banner shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>The Serpent Realm of Syntax</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Python World
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-xl leading-relaxed">
            Master Python fundamentals from variables, conditionals, and loops up through functional programming, exception safety, and Object-Oriented architecture.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700 justify-center md:justify-start">
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {completedCount} / {totalCount} Conquered
            </span>
            <span>·</span>
            <span className="font-mono text-purple-700 font-bold">{percent}% Mastered</span>
          </div>
        </div>

        {/* Floating artwork thumbnail */}
        <div className="w-44 h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 shrink-0 bg-slate-900">
          <SafeImage
            src={pythonWorldImg}
            alt="Python World Island"
            fallbackType="python"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* LEVEL FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-500 mr-2">Filter Level:</span>
        {['all', '1', '2', '3', '4', '5'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedLevel === lvl
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {lvl === 'all' ? 'All Levels' : `Level ${lvl}`}
          </button>
        ))}
      </div>

      {/* TOPIC GRID */}
      {loading ? (
        <LoadingState
          message="Loading Python World curriculum..."
          subtitle="Gathering lessons from Variables to Object-Oriented Programming..."
        />
      ) : error ? (
        <LoadingState
          error={error}
          onRetry={fetchPythonData}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic._id || topic.id} topic={topic} />
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="cq-card rounded-2xl p-8 text-center text-slate-500 text-sm">
              No topics found for this level filter.
            </div>
          )}
        </div>
      )}

      {/* PYTHON ARCADE MINIGAMES SECTION */}
      {games.length > 0 && (
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Python Arcade Minigames
              </h2>
              <p className="text-xs text-slate-500">
                Play interactive mini-games to sharpen your muscle memory and claim +20 XP rewards
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <GameCard key={game._id || game.id} game={game} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
