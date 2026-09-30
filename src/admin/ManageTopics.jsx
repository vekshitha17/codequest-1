import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { getTopics } from '../services/topicService';
import {
  adminCreateTopic,
  adminUpdateTopic,
  adminDeleteTopic,
} from '../services/adminService';
import './ManageTopics.css';

export default function ManageTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    world: 'python',
    level: 1,
    order: 1,
    difficulty: 'Beginner',
    description: '',
    explanation: '',
    syntax: '',
    xpReward: 20,
  });
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const data = await getTopics();
      setTopics(data.topics || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingTopic(null);
    setFormData({
      title: '',
      world: 'python',
      level: 1,
      order: topics.length + 1,
      difficulty: 'Beginner',
      description: '',
      explanation: '',
      syntax: '',
      xpReward: 20,
    });
    setIsModalOpen(true);
    setMsg({ text: '', type: '' });
  };

  const handleOpenEdit = (topic) => {
    setEditingTopic(topic);
    setFormData({
      title: topic.title || '',
      world: topic.world || 'python',
      level: topic.level || 1,
      order: topic.order || 1,
      difficulty: topic.difficulty || 'Beginner',
      description: topic.description || '',
      explanation: topic.explanation || '',
      syntax: topic.syntax || '',
      xpReward: topic.xpReward || 20,
    });
    setIsModalOpen(true);
    setMsg({ text: '', type: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this topic from MongoDB?')) return;
    try {
      await adminDeleteTopic(id);
      setTopics(topics.filter((t) => (t._id || t.id) !== id));
      setMsg({ text: 'Topic deleted successfully from database', type: 'success' });
    } catch (e) {
      setMsg({ text: 'Failed to delete topic', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    try {
      if (editingTopic) {
        const res = await adminUpdateTopic(editingTopic._id || editingTopic.id, formData);
        setTopics(
          topics.map((t) =>
            (t._id || t.id) === (editingTopic._id || editingTopic.id) ? res.topic : t
          )
        );
        setMsg({ text: 'Topic updated successfully!', type: 'success' });
      } else {
        const res = await adminCreateTopic(formData);
        setTopics([...topics, res.topic]);
        setMsg({ text: 'New topic created in MongoDB!', type: 'success' });
      }
      setIsModalOpen(false);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Error saving topic', type: 'error' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Topic</span>
        </button>
      </div>

      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Curriculum Topics Management ({topics.length})
          </h1>
          <p className="text-xs text-slate-500">
            Admin CRUD operations connecting directly to MongoDB Topic collection.
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
            Loading topics list...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="pb-3 px-3">Order</th>
                  <th className="pb-3 px-3">Title</th>
                  <th className="pb-3 px-3">World</th>
                  <th className="pb-3 px-3">Level</th>
                  <th className="pb-3 px-3">Difficulty</th>
                  <th className="pb-3 px-3">XP</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topics.map((t) => (
                  <tr key={t._id || t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-500">#{t.order || 1}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{t.title}</td>
                    <td className="py-3 px-3 capitalize">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {t.world}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">Lvl {t.level}</td>
                    <td className="py-3 px-3">{t.difficulty}</td>
                    <td className="py-3 px-3 font-mono text-amber-600 font-bold">
                      +{t.xpReward || 20}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                          title="Edit Topic"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id || t.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Topic"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 admin-modal-backdrop">
          <div className="cq-card rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 bg-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {editingTopic ? 'Edit Topic Document' : 'Create New Curriculum Topic'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Topic Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Dynamic Programming Memoization"
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
                  <label className="font-semibold text-slate-700">Level (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Short Description</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of the learning objectives"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Detailed Explanation</label>
                <textarea
                  rows="4"
                  required
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Full educational text and concepts..."
                  className="w-full px-3 py-2 border rounded-xl resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Syntax Template</label>
                <input
                  type="text"
                  value={formData.syntax}
                  onChange={(e) => setFormData({ ...formData, syntax: e.target.value })}
                  placeholder="e.g. def fn(args): return val"
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700"
                >
                  {editingTopic ? 'Update Topic' : 'Create Topic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
