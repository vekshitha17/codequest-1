import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Code,
  Sparkles,
  Trophy,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  ArrowLeft,
  Terminal,
  Send,
  AlertCircle,
} from 'lucide-react';
import { getChallengeById, submitChallenge } from '../services/challengeService';
import { triggerConfetti } from '../utils/helpers';
import LoadingState from '../components/LoadingState';
import './CodingChallenge.css';

export default function CodingChallenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    setLoading(true);
    try {
      const data = await getChallengeById(id);
      setChallenge(data.challenge);
      setCode(data.challenge.starterCode || '');
      setEvaluation(null);
    } catch (err) {
      console.error('Failed to load challenge:', err);
      setError('Challenge could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunOrSubmit = async () => {
    const token = localStorage.getItem('cq_token');
    if (!token) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitChallenge(id, code);
      setEvaluation(res);
      if (res.allPassed && res.xpEarned > 0) {
        triggerConfetti();
      }
    } catch (err) {
      console.error('Error submitting code:', err);
      setError('Evaluation service error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetCode = () => {
    if (challenge?.starterCode) {
      setCode(challenge.starterCode);
      setEvaluation(null);
    }
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading code editor environment..."
        subtitle="Initializing runtime compiler & test runners..."
      />
    );
  }

  if (error || !challenge) {
    return (
      <LoadingState
        error={error || 'Challenge not found with specified identifier.'}
        onRetry={fetchChallenge}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            {challenge.difficulty} Difficulty
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>+{challenge.xpReward || 50} XP</span>
          </span>
        </div>
      </div>

      {/* TWO-COLUMN SPLIT: Left Problem Spec, Right Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* LEFT COLUMN: Problem Description */}
        <div className="lg:col-span-5 cq-card rounded-3xl p-6 space-y-6 overflow-y-auto max-h-[750px]">
          <div>
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
              Python Challenge
            </span>
            <h1 className="font-heading text-2xl font-bold text-slate-900 mt-1">
              {challenge.title}
            </h1>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Problem Statement
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {challenge.problem}
            </p>
          </div>

          {challenge.inputFormat && (
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase">Input Format</h4>
              <p className="text-xs text-slate-600 font-mono bg-slate-100 p-2.5 rounded-xl">
                {challenge.inputFormat}
              </p>
            </div>
          )}

          {challenge.outputFormat && (
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase">Output Format</h4>
              <p className="text-xs text-slate-600 font-mono bg-slate-100 p-2.5 rounded-xl">
                {challenge.outputFormat}
              </p>
            </div>
          )}

          {challenge.constraints && (
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase">Constraints</h4>
              <p className="text-xs text-slate-600 font-mono bg-slate-100 p-2.5 rounded-xl">
                {challenge.constraints}
              </p>
            </div>
          )}

          {/* Test cases sample preview */}
          {challenge.testCases?.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Sample Test Cases
              </h4>
              <div className="space-y-2">
                {challenge.testCases.filter(tc => !tc.hidden).map((tc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase">
                      {tc.description || `Sample ${idx + 1}`}
                    </div>
                    <div>Input: <code className="font-mono text-purple-700">{tc.input}</code></div>
                    <div>Expected: <code className="font-mono text-emerald-700">{tc.expectedOutput}</code></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Code Editor + Test Case Output */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Editor Header */}
          <div className="cq-card rounded-3xl p-4 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-400" />
              <span className="font-mono text-xs font-semibold text-slate-300">
                solution.py (Python 3)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetCode}
                className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleRunOrSubmit}
                disabled={submitting}
                className="px-5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <span>Evaluating...</span>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run & Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Textarea Code Input */}
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex-1 flex flex-col min-h-[350px]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              placeholder="# Write your Python solution code here..."
              className="w-full h-full min-h-[350px] p-5 coding-editor-textarea text-xs sm:text-sm resize-none focus:ring-0 border-0"
            />
          </div>

          {/* TEST RESULTS CONSOLE */}
          {evaluation && (
            <div
              className={`cq-card rounded-3xl p-5 space-y-4 border ${
                evaluation.allPassed ? 'bg-emerald-50/60 border-emerald-300' : 'bg-rose-50/60 border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {evaluation.allPassed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <h4 className="font-heading text-sm font-bold text-slate-900">
                    {evaluation.feedback}
                  </h4>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono font-bold">
                  <span>Score: {evaluation.score}%</span>
                  {evaluation.allPassed && (
                    <span className="text-amber-600 flex items-center gap-0.5">
                      <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                      +{evaluation.xpEarned} XP
                    </span>
                  )}
                </div>
              </div>

              {/* Individual test cases breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(evaluation.testResults || []).map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      tr.passed ? 'bg-white border-emerald-200 text-emerald-900' : 'bg-white border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="font-semibold truncate">{tr.description}</div>
                      <div className="text-[11px] text-slate-500 font-mono truncate">
                        Output: {tr.actualOutput}
                      </div>
                    </div>
                    {tr.passed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
