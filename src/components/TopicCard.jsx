import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Gamepad2,
  HelpCircle,
  Code,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import './TopicCard.css';

export default function TopicCard({ topic, onSelect }) {
  const isLocked = topic.isLocked;
  const isCompleted = topic.isCompleted;

  const difficultyColors = {
    Beginner: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    Intermediate: 'text-amber-700 bg-amber-50 border-amber-200',
    Advanced: 'text-rose-700 bg-rose-50 border-rose-200',
  };

  return (
    <div
      className={`cq-card rounded-2xl p-5 flex flex-col justify-between topic-card ${
        isLocked
          ? 'opacity-65 bg-slate-50/80 border-dashed border-slate-300'
          : isCompleted
          ? 'border-emerald-200/90 bg-emerald-50/20'
          : 'hover:border-purple-300'
      }`}
    >
      <div>
        {/* Header tags: Level, Difficulty, XP */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Level {topic.level || 1} · #{topic.order || 1}
            </span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                difficultyColors[topic.difficulty] || difficultyColors.Beginner
              }`}
            >
              {topic.difficulty || 'Beginner'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>+{topic.xpReward || 20} XP</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-purple-600">
            {topic.title}
          </h3>
          {isCompleted ? (
            <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Done</span>
            </span>
          ) : isLocked ? (
            <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              <Lock className="w-3.5 h-3.5" />
              <span>Locked</span>
            </span>
          ) : null}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* Action Zone */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        {isLocked ? (
          <div className="flex items-center justify-between text-xs text-slate-400 py-1">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Complete topic #{topic.order - 1} to unlock</span>
            </span>
            <Link
              to={`/topic/${topic._id || topic.id}`}
              className="text-purple-600 hover:underline font-medium"
            >
              Preview
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Primary Action Button */}
            <Link
              to={`/topic/${topic._id || topic.id}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Review Topic' : 'Enter Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </Link>

            {/* Quick mini-action buttons */}
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              {topic.gameId ? (
                <Link
                  to={`/game/${topic.gameId}`}
                  title="Play Interactive Game"
                  className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors font-medium text-center truncate"
                >
                  <Gamepad2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">Game</span>
                </Link>
              ) : (
                <span className="py-1.5 px-1 rounded-lg bg-slate-50 text-slate-300 text-center select-none truncate">
                  Game
                </span>
              )}

              {topic.quizId ? (
                <Link
                  to={`/quiz/${topic.quizId}`}
                  title="Take Quiz"
                  className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors font-medium text-center truncate"
                >
                  <HelpCircle className="w-3 h-3 shrink-0" />
                  <span className="truncate">Quiz</span>
                </Link>
              ) : (
                <span className="py-1.5 px-1 rounded-lg bg-slate-50 text-slate-300 text-center select-none truncate">
                  Quiz
                </span>
              )}

              {topic.challengeId ? (
                <Link
                  to={`/challenge/${topic.challengeId}`}
                  title="Coding Challenge"
                  className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors font-medium text-center truncate"
                >
                  <Code className="w-3 h-3 shrink-0" />
                  <span className="truncate">Code</span>
                </Link>
              ) : (
                <span className="py-1.5 px-1 rounded-lg bg-slate-50 text-slate-300 text-center select-none truncate">
                  Code
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
