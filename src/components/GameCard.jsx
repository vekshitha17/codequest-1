import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Sparkles, Play, CheckCircle } from 'lucide-react';
import './GameCard.css';

export default function GameCard({ game, isCompleted = false }) {
  const typeLabels = {
    'list-treasure-hunt': 'Treasure Hunt',
    'guess-output': 'Output Guesser',
    'fix-code': 'Bug Slayer',
    'memory': 'Syntax Matcher',
    'stack-tower': 'LIFO Tower',
    'queue-line': 'FIFO Gate',
    'array-scanner': 'Array Scanner',
    'binary-search': 'Binary Search',
    'sorting-match': 'Complexity Match',
  };

  return (
    <div className="cq-card rounded-2xl p-5 flex flex-col justify-between game-card hover:border-pink-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
            {typeLabels[game.type] || 'Minigame'}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>+{game.xpReward || 20} XP</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {game.title}
          </h3>
          {isCompleted && (
            <span title="Completed" className="shrink-0 text-emerald-500">
              <CheckCircle className="w-4 h-4" />
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {game.instructions}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <Link
          to={`/games/${game._id || game.id}`}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl shadow-xs transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isCompleted ? 'Play Again' : 'Start Minigame'}</span>
        </Link>
      </div>
    </div>
  );
}
