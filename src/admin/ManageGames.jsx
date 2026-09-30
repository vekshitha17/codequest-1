import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { getGames } from '../services/gameService';
import {
  adminCreateGame,
  adminUpdateGame,
  adminDeleteGame,
} from '../services/adminService';
import './ManageGames.css';

export default function ManageGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    world: 'python',
    type: 'list-treasure-hunt',
    topicId: 'py_1',
    instructions: '',
    xpReward: 20,
  });
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const data = await getGames();
      setGames(data.games || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingGame(null);
    setFormData({
      title: '',
      world: 'python',
      type: 'guess-output',
      topicId: 'py_1',
      instructions: '',
      xpReward: 20,
    });
    setIsModalOpen(true);
    setMsg({ text: '', type: '' });
  };

  const handleOpenEdit = (game) => {
    setEditingGame(game);
    setFormData({
      title: game.title || '',
      world: game.world || 'python',
      type: game.type || 'guess-output',
      topicId: game.topicId || 'py_1',
      instructions: game.instructions || '',
      xpReward: game.xpReward || 20,
    });
    setIsModalOpen(true);
    setMsg({ text: '', type: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this minigame?')) return;
    try {
      await adminDeleteGame(id);
      setGames(games.filter((g) => (g._id || g.id) !== id));
      setMsg({ text: 'Game removed from database', type: 'success' });
    } catch (e) {
      setMsg({ text: 'Failed to delete game', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    try {
      if (editingGame) {
        const res = await adminUpdateGame(editingGame._id || editingGame.id, formData);
        setGames(
          games.map((g) =>
            (g._id || g.id) === (editingGame._id || editingGame.id) ? res.game : g
          )
        );
        setMsg({ text: 'Game updated successfully!', type: 'success' });
      } else {
        const res = await adminCreateGame(formData);
        setGames([...games, res.game]);
        setMsg({ text: 'New arcade game created!', type: 'success' });
      }
      setIsModalOpen(false);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Error saving game', type: 'error' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-pink-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Minigame</span>
        </button>
      </div>

      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Arcade Minigames Management ({games.length})
          </h1>
          <p className="text-xs text-slate-500">
            CRUD control for interactive educational puzzle simulators.
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
            Loading minigames...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="pb-3 px-3">Title</th>
                  <th className="pb-3 px-3">Type</th>
                  <th className="pb-3 px-3">World</th>
                  <th className="pb-3 px-3">Topic ID</th>
                  <th className="pb-3 px-3">Questions</th>
                  <th className="pb-3 px-3">XP Reward</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {games.map((g) => (
                  <tr key={g._id || g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{g.title}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-pink-700">{g.type}</td>
                    <td className="py-3 px-3 capitalize">{g.world}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{g.topicId}</td>
                    <td className="py-3 px-3 font-mono">{g.questions?.length || 0}</td>
                    <td className="py-3 px-3 font-mono text-amber-600 font-bold">+{g.xpReward || 20}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(g)}
                          className="p-1.5 text-slate-400 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                          title="Edit Game"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(g._id || g.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Game"
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

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 admin-modal-backdrop">
          <div className="cq-card rounded-3xl p-6 max-w-lg w-full space-y-4 bg-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {editingGame ? 'Edit Minigame' : 'Create New Minigame'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Game Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  <label className="font-semibold text-slate-700">Simulator Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="guess-output">Guess Output</option>
                    <option value="list-treasure-hunt">List Treasure Hunt</option>
                    <option value="fix-code">Fix The Code Bug</option>
                    <option value="stack-tower">Stack Tower</option>
                    <option value="queue-line">Queue Gate</option>
                    <option value="binary-search">Binary Search</option>
                    <option value="sorting-match">Sorting Match</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Linked Topic ID</label>
                <input
                  type="text"
                  required
                  value={formData.topicId}
                  onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Player Instructions</label>
                <textarea
                  rows="3"
                  required
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl resize-none"
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
                  className="px-5 py-2 rounded-xl font-bold text-white bg-pink-600 hover:bg-pink-700"
                >
                  {editingGame ? 'Update Game' : 'Save Game'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
