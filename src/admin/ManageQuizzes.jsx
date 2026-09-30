import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { getQuizzes } from '../services/quizService';
import {
  adminCreateQuiz,
  adminUpdateQuiz,
  adminDeleteQuiz,
} from '../services/adminService';
import './ManageQuizzes.css';

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    world: 'python',
    topicId: 'py_1',
    passingPercentage: 70,
    xpReward: 20,
    questions: [
      {
        id: 'q_custom_1',
        question: 'What is the output of print(len([10, 20]))?',
        options: ['1', '2', '3', 'Error'],
        correctAnswer: 1,
        explanation: 'len() returns the number of items in the list, which is 2.',
      },
    ],
  });
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getQuizzes();
      setQuizzes(data.quizzes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingQuiz(null);
    setFormData({
      title: '',
      world: 'python',
      topicId: 'py_1',
      passingPercentage: 70,
      xpReward: 20,
      questions: [
        {
          id: 'q_custom_1',
          question: 'Sample question text?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'Option A is correct.',
        },
      ],
    });
    setIsModalOpen(true);
    setMsg({ text: '', type: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this quiz document?')) return;
    try {
      await adminDeleteQuiz(id);
      setQuizzes(quizzes.filter((q) => (q._id || q.id) !== id));
      setMsg({ text: 'Quiz deleted successfully', type: 'success' });
    } catch (e) {
      setMsg({ text: 'Failed to delete quiz', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    try {
      if (editingQuiz) {
        const res = await adminUpdateQuiz(editingQuiz._id || editingQuiz.id, formData);
        setQuizzes(
          quizzes.map((q) =>
            (q._id || q.id) === (editingQuiz._id || editingQuiz.id) ? res.quiz : q
          )
        );
        setMsg({ text: 'Quiz updated successfully!', type: 'success' });
      } else {
        const res = await adminCreateQuiz(formData);
        setQuizzes([...quizzes, res.quiz]);
        setMsg({ text: 'New quiz added to MongoDB!', type: 'success' });
      }
      setIsModalOpen(false);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Error saving quiz', type: 'error' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Quiz</span>
        </button>
      </div>

      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Quizzes Management ({quizzes.length})
          </h1>
          <p className="text-xs text-slate-500">
            4-option multiple-choice evaluations and grading thresholds.
          </p>
        </div>

        {msg.text && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
              msg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {msg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-xs font-semibold text-slate-500">
            Loading quizzes...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="pb-3 px-3">Title</th>
                  <th className="pb-3 px-3">World</th>
                  <th className="pb-3 px-3">Topic ID</th>
                  <th className="pb-3 px-3">Questions Count</th>
                  <th className="pb-3 px-3">Passing %</th>
                  <th className="pb-3 px-3">XP Reward</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizzes.map((q) => (
                  <tr key={q._id || q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{q.title}</td>
                    <td className="py-3 px-3 capitalize">{q.world}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{q.topicId}</td>
                    <td className="py-3 px-3 font-mono">{q.questions?.length || 0} MCQs</td>
                    <td className="py-3 px-3 font-mono">{q.passingPercentage || 70}%</td>
                    <td className="py-3 px-3 font-mono text-amber-600 font-bold">+{q.xpReward || 20}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDelete(q._id || q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Quiz"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 admin-modal-backdrop">
          <div className="cq-card rounded-3xl p-6 max-w-lg w-full space-y-4 bg-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Create Topic Quiz Document
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Quiz Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Loops & Iterations Quiz"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">World</label>
                  <select
                    value={formData.world}
                    onChange={(e) => setFormData({ ...formData, world: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="python">Python</option>
                    <option value="dsa">DSA</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Topic ID</label>
                  <input
                    type="text"
                    required
                    value={formData.topicId}
                    onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Passing Percentage (e.g. 70)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={formData.passingPercentage}
                  onChange={(e) => setFormData({ ...formData, passingPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-700"
                >
                  Save Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
