import React from 'react';
import { Zap, Trophy, Award } from 'lucide-react';
import './XPBadge.css';

export default function XPBadge({ xp = 0, level = 1, size = 'md' }) {
  const isLg = size === 'lg';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/20 xp-badge-shine ${
        isLg ? 'px-4 py-2 text-base' : 'px-3 py-1.5 text-xs'
      }`}
    >
      <div className="flex items-center gap-1 font-bold">
        <Zap className={`${isLg ? 'w-5 h-5' : 'w-4 h-4'} fill-white text-white`} />
        <span className="font-mono tabular-nums tracking-tight">{xp} XP</span>
      </div>
      <span className="opacity-60">|</span>
      <div className="flex items-center gap-1 font-semibold opacity-95">
        <Trophy className={`${isLg ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
        <span>Level {level}</span>
      </div>
    </div>
  );
}
