import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { getChallenges } from '../services/challengeService';
import {
  adminCreateChallenge,
  adminDeleteChallenge,
} from '../services/adminService';
import './ManageChallenges.css';

export default function ManageChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    world: 'python',
    topicId: 'py_1',
    difficulty: 'Easy',
    problem: '',
    starterCode: 'def solve(a):\n    # Write code here\n    pass',
    xpReward: 50,
    testCases: [
      { id: 'tc1', input: '1 2', expectedOutput: '3', description: 'Test Case 1', hidden: false },
    ],
  });
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const data = await getChallenges();
      setChallenges(data.challenges || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      world: 'python',
      topicId: 'py_1',
      difficulty: 'Easy',
      problem: '',
      starterCode: 'def solve(a):\n    pass',
      xpReward: 50,
      testCases: [
        { id: 'tc1', input: '5', expectedOutput: '10', description: 'Test Case 1', hidden: false },
      ],
    });
    setIsModalOpen(true);
    setMsg({ text: '', type: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this challenge?')) return;
    try {
      await adminDeleteChallenge(id);
      setChallenges(challenges.filter((c) => (c._id || c.id) !== id));
      setMsg({ text: 'Challenge deleted successfully from database', type: 'success' });
    } catch (e) {
      setMsg({ text: 'Failed to delete challenge', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    try {
      const res = await adminCreateChallenge(formData);
      setChallenges([...challenges, res.challenge]);
      setMsg({ text: 'Coding challenge created!', type: 'success' });
      setIsModalOpen(false);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Error saving challenge', type: 'error' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Challenge</span>
        </button>
      </div>

      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Coding Challenges Management ({challenges.length})
          </h1>
          <p className="text-xs text-slate-500">
            Automated test-runner problem definitions and constraints.
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
            Loading coding challenges...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="pb-3 px-3">Challenge Title</th>
                  <th className="pb-3 px-3">World</th>
                  <th className="pb-3 px-3">Difficulty</th>
                  <th className="pb-3 px-3">Topic ID</th>
                  <th className="pb-3 px-3">Test Cases</th>
                  <th className="pb-3 px-3">XP Reward</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {challenges.map((c) => (
                  <tr key={c._id || c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{c.title}</td>
                    <td className="py-3 px-3 capitalize">{c.world}</td>
                    <td className="py-3 px-3 font-medium text-teal-700">{c.difficulty}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{c.topicId}</td>
                    <td className="py-3 px-3 font-mono">{c.testCases?.length || 0}</td>
                    <td className="py-3 px-3 font-mono text-amber-600 font-bold">+{c.xpReward || 50}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDelete(c._id || c.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Challenge"
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

      {/* CREATE CHALLENGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 admin-modal-backdrop">
          <div className="cq-card rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 bg-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Create Coding Challenge
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Challenge Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Reverse Linked List"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
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
                  <label className="font-semibold text-slate-700">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
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
                <label className="font-semibold text-slate-700">Problem Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Write a clear statement of the input and expected output"
                  className="w-full px-3 py-2 border rounded-xl resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Starter Python Code</label>
                <textarea
                  rows="3"
                  required
                  value={formData.starterCode}
                  onChange={(e) => setFormData({ ...formData, starterCode: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono resize-none"
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
                  className="px-5 py-2 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700"
                >
                  Save Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
