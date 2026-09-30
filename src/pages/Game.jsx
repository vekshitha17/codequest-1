import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Award,
  Play,
} from 'lucide-react';
import { getGameById, completeGame } from '../services/gameService';
import { triggerConfetti } from '../utils/helpers';
import LoadingState from '../components/LoadingState';
import './Game.css';

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameState, setGameState] = useState('intro'); // 'intro' | 'playing' | 'completed'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverFeedback, setServerFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGame();
  }, [id]);

  const fetchGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGameById(id);
      setGame(data.game);
      setGameState('intro');
      setCurrentIdx(0);
      setScore(0);
      setIsGameOver(false);
    } catch (err) {
      console.error('Failed to load game:', err);
      setError('Interactive mini-game could not be loaded. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsGameOver(false);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = game.questions[currentIdx];
    const correct = String(selectedAnswer).trim() === String(currentQuestion.correctAnswer).trim();

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < (game.questions?.length || 0)) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setIsGameOver(true);
    setGameState('completed');
    const token = localStorage.getItem('cq_token');

    if (token) {
      setSubmitting(true);
      try {
        const finalScore = Math.round((score / (game.questions?.length || 1)) * 100);
        const res = await completeGame(id, {
          score: finalScore,
          attempts,
        });
        setServerFeedback(res);
        if (res.xpEarned > 0) {
          triggerConfetti();
        }
      } catch (e) {
        console.error('Error submitting game completion:', e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRetry = () => {
    setAttempts(prev => prev + 1);
    handleStartGame();
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading interactive game..."
        subtitle="Preparing arcade puzzle challenges..."
      />
    );
  }

  if (error || !game) {
    return (
      <LoadingState
        error={error || 'Game not found with specified identifier.'}
        onRetry={fetchGame}
      />
    );
  }

  const currentQ = game.questions?.[currentIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-pink-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            {game.world?.toUpperCase()} ARCADE
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>+{game.xpReward || 20} XP Reward</span>
          </span>
        </div>
      </div>

      {/* GAME INTRO SCREEN */}
      {gameState === 'intro' && (
        <div className="cq-card rounded-3xl p-8 sm:p-12 text-center space-y-6 game-stage-canvas border-pink-200/80 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-pink-500/25">
            <Gamepad2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="font-heading text-3xl font-extrabold text-slate-900">
              {game.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {game.instructions}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 max-w-sm mx-auto text-xs text-slate-500 space-y-1">
            <div>Questions / Puzzles: <strong className="text-slate-800">{game.questions?.length || 0}</strong></div>
            <div>Reward on Completion: <strong className="text-amber-600">+{game.xpReward || 20} XP</strong></div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-2xl shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START MISSION</span>
          </button>
        </div>
      )}

      {/* GAMEPLAY STAGE */}
      {gameState === 'playing' && currentQ && (
        <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6 border-pink-200/70 shadow-lg">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">
              Challenge {currentIdx + 1} of {game.questions.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Score: {score}
              </span>
              <span className="text-xs text-slate-400">
                Attempt #{attempts}
              </span>
            </div>
          </div>

          {/* Prompt */}
          <div className="space-y-3">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
              {currentQ.prompt}
            </h2>

            {currentQ.codeSnippet && (
              <div className="p-4 rounded-2xl bg-[#1E1E2E] text-[#CDD6F4] font-mono text-xs overflow-x-auto shadow-inner">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {(currentQ.options || []).map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              let optStyle = 'border-slate-200 bg-white hover:border-pink-300 text-slate-800';

              if (isAnswerChecked) {
                if (opt === currentQ.correctAnswer) {
                  optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  optStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                }
              } else if (isSelected) {
                optStyle = 'selected-game-option font-semibold';
              }

              return (
                <button
                  key={i}
                  disabled={isAnswerChecked}
                  onClick={() => setSelectedAnswer(opt)}
                  className={`p-4 rounded-2xl border-2 text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                >
                  <span className="font-mono">{opt}</span>
                  {isAnswerChecked && opt === currentQ.correctAnswer && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Answer Feedback & Explanation */}
          {isAnswerChecked && (
            <div
              className={`p-4 rounded-2xl text-xs space-y-1 ${
                isCorrect
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Correct Analysis! 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Not quite right!</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">
                {currentQ.explanation || currentQ.hint}
              </p>
            </div>
          )}

          {/* Action Button: Check Answer or Next */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 italic">
              {currentQ.hint && !isAnswerChecked ? `Hint: ${currentQ.hint}` : ''}
            </span>

            {!isAnswerChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
              >
                CHECK ANSWER
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentIdx + 1 === game.questions.length ? 'FINISH GAME' : 'NEXT PUZZLE'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* GAME COMPLETED SCREEN */}
      {gameState === 'completed' && (
        <div className="cq-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border-pink-200/80 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Minigame Conquered! 🏆
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              You scored {score} out of {game.questions?.length} ({Math.round((score / (game.questions?.length || 1)) * 100)}%).
            </p>
          </div>

          {serverFeedback && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs max-w-sm mx-auto font-semibold">
              {serverFeedback.message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetry}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Challenge</span>
            </button>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
