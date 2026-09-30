import React, { useState } from 'react';
import { Code2, Binary, Flame, Sparkles, Shield } from 'lucide-react';

export default function SafeImage({
  src,
  alt = 'CodeQuest',
  className = '',
  fallbackType = 'generic',
  loading = 'lazy',
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-3 text-center select-none overflow-hidden ${
          fallbackType === 'python'
            ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-emerald-100'
            : fallbackType === 'dsa'
            ? 'bg-gradient-to-br from-indigo-600 via-purple-700 to-slate-900 text-indigo-100'
            : fallbackType === 'adventure'
            ? 'bg-gradient-to-br from-pink-600 via-rose-700 to-slate-900 text-pink-100'
            : fallbackType === 'mascot'
            ? 'bg-gradient-to-br from-purple-700 via-indigo-800 to-slate-900 text-purple-100'
            : 'bg-gradient-to-br from-slate-700 to-slate-900 text-slate-200'
        } ${className}`}
        aria-label={alt}
        role="img"
      >
        <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-sm">
          {fallbackType === 'python' ? (
            <span className="text-xl">🐍</span>
          ) : fallbackType === 'dsa' ? (
            <span className="text-xl">🧩</span>
          ) : fallbackType === 'adventure' ? (
            <span className="text-xl">🔥</span>
          ) : fallbackType === 'mascot' ? (
            <span className="text-xl">🤖</span>
          ) : (
            <Sparkles className="w-5 h-5 text-amber-300" />
          )}
        </div>
        <span className="text-xs font-heading font-extrabold tracking-tight">
          {fallbackType === 'python'
            ? 'Python Realm'
            : fallbackType === 'dsa'
            ? 'DSA Citadel'
            : fallbackType === 'adventure'
            ? 'Adventure Portal'
            : fallbackType === 'mascot'
            ? 'Hero Mascot'
            : 'CodeQuest'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
