import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  Sparkles,
  Trophy,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  AlertCircle,
} from 'lucide-react';
import { getQuizById, submitQuiz } from '../services/quizService';
import ProgressBar from '../components/ProgressBar';
import { triggerConfetti } from '../utils/helpers';
import LoadingState from '../components/LoadingState';
import './Quiz.css';

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const data = await getQuizById(id);
      setQuiz(data.quiz);
      setAnswers({});
      setResult(null);
      setCurrentIdx(0);
    } catch (err) {
      console.error('Failed to load quiz:', err);
      setError('Quiz could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (result) return; // Cannot change after submit
    setAnswers({
      ...answers,
      [qId]: optionIdx,
    });
  };

  const handleSubmitQuiz = async () => {
    const token = localStorage.getItem('cq_token');
    if (!token) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitQuiz(id, answers);
      setResult(res);
      if (res.passed && res.xpEarned > 0) {
        triggerConfetti();
      }
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      setError('Failed to submit quiz. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading topic quiz..."
        subtitle="Retrieving checkpoint questions and answer choices..."
      />
    );
  }

  if (error || !quiz) {
    return (
      <LoadingState
        error={error || 'Quiz not found with specified identifier.'}
        onRetry={fetchQuiz}
      />
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Back button and Meta */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Pass Threshold: 70%
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
            <span>+{quiz.xpReward || 20} XP</span>
          </span>
        </div>
      </div>

      {/* QUIZ ACTIVE VIEW */}
      {!result ? (
        <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border-amber-200/80">
          {/* Header & Progress */}
          <div className="space-y-3 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                {quiz.title}
              </h1>
              <span className="text-xs font-bold text-slate-500 font-mono">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
            </div>

            <ProgressBar
              value={currentIdx + 1}
              max={totalQuestions}
              showPercentage={false}
              color="from-amber-400 to-yellow-500"
              height="h-2"
            />
          </div>

          {/* Current Question */}
          {currentQ && (
            <div className="space-y-4">
              <h2 className="font-heading text-base sm:text-lg font-bold text-slate-800">
                {currentQ.question}
              </h2>

              {currentQ.codeSnippet && (
                <div className="p-4 rounded-2xl bg-[#1E1E2E] text-[#CDD6F4] font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{currentQ.codeSnippet}</pre>
                </div>
              )}

              {/* 4 Options */}
              <div className="space-y-2.5 pt-2">
                {(currentQ.options || []).map((option, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'quiz-selected-opt text-purple-900 font-semibold'
                          : 'border-slate-200 hover:border-amber-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-mono">{option}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation & Submission Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentIdx + 1 < totalQuestions ? (
                <button
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={submitting || !allAnswered}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-md shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {submitting ? 'Evaluating...' : 'SUBMIT QUIZ 🚀'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ RESULTS VIEW */
        <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border-amber-200/80">
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg ${
                result.passed
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-emerald-500/25'
                  : 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-rose-500/25'
              }`}
            >
              {result.passed ? <Trophy className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              {result.passed ? 'Quiz Passed! 🏆' : 'Keep Practicing!'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {result.message}
            </p>

            {/* Scorecard pill */}
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold">
              <span>Score: <strong className="font-mono text-slate-900">{result.percentage}%</strong></span>
              <span>·</span>
              <span>Correct: <strong className="text-emerald-600">{result.correctCount} / {result.totalQuestions}</strong></span>
              <span>·</span>
              <span>XP Earned: <strong className="text-amber-600">+{result.xpEarned} XP</strong></span>
            </div>
          </div>

          {/* Detailed Question Review & Explanations */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-slate-900">
              Question Review & Explanations
            </h3>

            {(result.detailedFeedback || []).map((q, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  q.isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-800">
                    #{idx + 1}. {q.question}
                  </span>
                  {q.isCorrect ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-semibold text-rose-700 shrink-0">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Incorrect</span>
                    </span>
                  )}
                </div>

                <p className="text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-slate-100">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Result Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setCurrentIdx(0);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm transition-all text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
