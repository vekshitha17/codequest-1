import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Gamepad2,
  HelpCircle,
  Code,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Lock,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { getTopicById } from '../services/topicService';
import { recordProgress, getTopicProgress } from '../services/progressService';
import { triggerConfetti } from '../utils/helpers';
import LoadingState from '../components/LoadingState';
import './Topic.css';

export default function Topic() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('explanation'); // 'explanation' | 'examples' | 'mistakes'
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopicData();
  }, [id]);

  const fetchTopicData = async () => {
    setLoading(true);
    try {
      const data = await getTopicById(id);
      setTopic(data.topic);

      // Check user topic progress
      const token = localStorage.getItem('cq_token');
      if (token) {
        try {
          const progData = await getTopicProgress(id);
          setProgress(progData.progress);
        } catch (e) {}
      }
      setError('');
    } catch (err) {
      console.error('Error fetching topic:', err);
      setError('Topic not found or could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTopic = async () => {
    const token = localStorage.getItem('cq_token');
    if (!token) {
      navigate('/login');
      return;
    }

    setCompleting(true);
    try {
      const res = await recordProgress({
        topicId: id,
        markTopicCompleted: true,
        world: topic.world,
      });
      triggerConfetti();
      setProgress(res.progress);
      setTopic({ ...topic, isCompleted: true });
    } catch (e) {
      console.error('Failed to complete topic:', e);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading topic lesson..."
        subtitle="Retrieving curriculum theory, code examples, and practice challenges..."
      />
    );
  }

  if (error || !topic) {
    return (
      <LoadingState
        error={error || 'Topic not found with specified identifier.'}
        onRetry={fetchTopicData}
      />
    );
  }

  const isCompleted = topic.isCompleted || progress?.completed;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to={`/worlds/${topic.world}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {topic.world === 'python' ? 'Python World' : topic.world === 'dsa' ? 'DSA Citadel' : 'Adventure Realm'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Conquered</span>
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>+{topic.xpReward || 20} XP</span>
          </span>
        </div>
      </div>

      {/* TOPIC HERO HEADER */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Level {topic.level} · Topic #{topic.order}
          </span>
          <span className="text-xs font-medium text-slate-500">
            Difficulty: <strong className="text-slate-700">{topic.difficulty}</strong>
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
          {topic.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {topic.description}
        </p>

        {/* 4 MANDATORY ACTION BUTTONS */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 1. LEARN (Scroll to explanation) */}
          <button
            onClick={() => {
              setActiveTab('explanation');
              document.getElementById('lesson-content')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>LEARN</span>
          </button>

          {/* 2. PLAY GAME */}
          {topic.gameId ? (
            <Link
              to={`/games/${topic.gameId}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-pink-600" />
              <span>PLAY GAME</span>
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 bg-slate-100 cursor-not-allowed"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>GAME SOON</span>
            </button>
          )}

          {/* 3. TAKE QUIZ */}
          {topic.quizId ? (
            <Link
              to={`/quizzes/${topic.quizId}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>TAKE QUIZ</span>
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 bg-slate-100 cursor-not-allowed"
            >
              <HelpCircle className="w-4 h-4" />
              <span>QUIZ SOON</span>
            </button>
          )}

          {/* 4. CODING CHALLENGE */}
          {topic.challengeId ? (
            <Link
              to={`/challenges/${topic.challengeId}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
            >
              <Code className="w-4 h-4 text-teal-600" />
              <span>CHALLENGE</span>
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 bg-slate-100 cursor-not-allowed"
            >
              <Code className="w-4 h-4" />
              <span>CHALLENGE</span>
            </button>
          )}
        </div>
      </div>

      {/* LEARNING OBJECTIVES */}
      {topic.objectives?.length > 0 && (
        <div className="cq-card rounded-2xl p-6 bg-slate-50/80 border border-slate-200/80 space-y-3">
          <h3 className="font-heading text-sm font-bold text-slate-800 uppercase tracking-wider">
            Target Learning Objectives
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {topic.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* TABS NAVIGATION */}
      <div id="lesson-content" className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('explanation')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'explanation'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Lesson & Syntax
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'examples'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Code Examples ({topic.examples?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'mistakes'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Key Points & Pitfalls
        </button>
      </div>

      {/* TAB CONTENT: 1. EXPLANATION & SYNTAX */}
      {activeTab === 'explanation' && (
        <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-slate-900">
              In-Depth Concept Explanation
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {topic.explanation}
            </p>
          </div>

          {topic.syntax && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Official Syntax Definition
              </h4>
              <div className="p-4 rounded-2xl code-preview-box font-mono text-xs overflow-x-auto shadow-inner">
                <pre>{topic.syntax}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. CODE EXAMPLES */}
      {activeTab === 'examples' && (
        <div className="space-y-4">
          {(topic.examples || []).map((ex, idx) => (
            <div key={idx} className="cq-card rounded-2xl p-6 space-y-3">
              <h4 className="font-heading text-base font-bold text-slate-900">
                {ex.title || `Example ${idx + 1}`}
              </h4>

              <div className="rounded-2xl code-preview-box p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <pre>{ex.code}</pre>
              </div>

              {ex.output && (
                <div className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-sans font-semibold mb-1">
                    Standard Output:
                  </span>
                  <pre className="whitespace-pre-wrap">{ex.output}</pre>
                </div>
              )}

              {ex.notes && (
                <p className="text-xs text-slate-500 italic">
                  💡 {ex.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: 3. IMPORTANT POINTS & COMMON MISTAKES */}
      {activeTab === 'mistakes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key points */}
          <div className="cq-card rounded-2xl p-6 space-y-3 bg-emerald-50/40 border-emerald-200/80">
            <h4 className="font-heading text-sm font-bold text-emerald-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Crucial Key Points</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {(topic.keyPoints || []).map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="cq-card rounded-2xl p-6 space-y-3 bg-rose-50/40 border-rose-200/80">
            <h4 className="font-heading text-sm font-bold text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Common Pitfalls to Avoid</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {(topic.commonMistakes || []).map((mst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>{mst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* FOOTER: TOPIC COMPLETION ACTION */}
      <div className="cq-card rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-heading text-base font-bold text-slate-900">
            Conquered this lesson?
          </h4>
          <p className="text-xs text-slate-600">
            Mark as complete to claim your +{topic.xpReward || 20} XP and unlock the next lesson in the curriculum.
          </p>
        </div>

        <button
          onClick={handleCompleteTopic}
          disabled={completing || isCompleted}
          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
            isCompleted
              ? 'bg-emerald-600 text-white cursor-default shadow-emerald-500/20'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-purple-500/25 transform hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Topic Conquered!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{completing ? 'Completing...' : 'Complete Topic & Earn XP'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
