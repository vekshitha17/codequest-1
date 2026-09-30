import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  subLabel,
  color = 'from-purple-500 to-pink-500',
  showPercentage = true,
  height = 'h-2.5',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / (max || 1)) * 100)));

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {label && <span className="font-semibold text-slate-800">{label}</span>}
            {subLabel && <span className="text-slate-400">{subLabel}</span>}
          </div>
          {showPercentage && (
            <span className="font-mono font-bold text-slate-700 tabular-nums">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height} p-0.5 border border-slate-200/50`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out progress-bar-glow`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
