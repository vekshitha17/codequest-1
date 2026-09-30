import React from 'react';
import { Sparkles, AlertCircle, RotateCcw } from 'lucide-react';

export default function LoadingState({
  message = 'Loading your adventure...',
  subtitle = 'Connecting with the CodeQuest realms...',
  error = null,
  onRetry = null,
  compact = false,
}) {
  if (error) {
    return (
      <div className={`w-full text-center p-6 sm:p-8 ${compact ? 'max-w-sm' : 'max-w-md'} mx-auto my-4`}>
        <div className="bg-rose-50/90 border border-rose-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-base font-bold text-slate-900">
              Quest Briefing Unavailable
            </h3>
            <p className="text-xs text-rose-700 leading-relaxed font-medium">
              {error || 'Unable to connect to the server. Please check your connection and try again.'}
            </p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quest</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex items-center justify-center text-center p-8 sm:p-12 ${compact ? 'py-6' : 'min-h-[220px]'}`}>
      <div className="space-y-3.5">
        <div className="relative inline-flex items-center justify-center">
          {/* Lightweight pulsing ring */}
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs animate-bounce">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-sm sm:text-base font-bold text-slate-800">
            {message}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
