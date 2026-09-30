import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Trophy,
  Sparkles,
  Shield,
  Award,
  CheckCircle,
  Save,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../services/authService';
import XPBadge from '../components/XPBadge';
import { calculateLevel, getLevelTitle } from '../utils/helpers';
import './Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('robot_avatar_1');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const avatarOptions = [
    { id: 'robot_avatar_1', name: 'Pixel Bot', color: 'from-purple-500 to-indigo-500' },
    { id: 'robot_avatar_2', name: 'Cyber Knight', color: 'from-pink-500 to-rose-500' },
    { id: 'robot_avatar_3', name: 'Matrix Wizard', color: 'from-emerald-500 to-teal-500' },
    { id: 'robot_avatar_4', name: 'Quantum Sage', color: 'from-amber-400 to-orange-500' },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile();
      setProfile(data.user);
      setUsername(data.user.username);
      setAvatar(data.user.avatar || 'robot_avatar_1');
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await updateUserProfile({
        username: username.trim(),
        avatar,
      });
      setProfile({ ...profile, ...res.user });
      setMsg({ text: 'Profile successfully updated!', type: 'success' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile.';
      setMsg({ text: errorMsg, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto animate-bounce">
            <User className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-slate-700">Loading adventurer profile...</p>
        </div>
      </div>
    );
  }

  const level = calculateLevel(profile?.xp || 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <XPBadge xp={profile?.xp || 0} level={level} />
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl border-purple-200/80">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-purple-500/25">
            {profile?.username?.charAt(0).toUpperCase() || 'C'}
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-amber-400 text-amber-950 font-bold text-[10px] rounded-full shadow-xs">
            Lv.{level}
          </div>
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              {profile?.username}
            </h1>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 capitalize">
              {profile?.role || 'student'}
            </span>
          </div>

          <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>{profile?.email}</span>
          </p>

          <p className="text-xs font-semibold text-slate-700">
            Codex Rank: <strong className="text-purple-700">{getLevelTitle(level)}</strong>
          </p>
        </div>
      </div>

      {/* EDIT PROFILE FORM */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900">
            Adventurer Customization
          </h2>
          <p className="text-xs text-slate-500">
            Update your handle and select your preferred avatar badge
          </p>
        </div>

        {msg.text && (
          <div
            className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
              msg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {msg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <Shield className="w-4 h-4 text-rose-600" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-1.5 max-w-md">
            <label className="text-xs font-semibold text-slate-700">
              Adventurer Handle / Alias
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            />
          </div>

          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              Select Avatar Persona
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {avatarOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setAvatar(opt.id)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all profile-avatar-option cursor-pointer ${
                    avatar === opt.id
                      ? 'border-purple-600 bg-purple-50 shadow-xs'
                      : 'border-slate-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${opt.color} text-white flex items-center justify-center font-bold mx-auto mb-2 text-sm shadow-xs`}
                  >
                    {opt.name.charAt(0)}
                  </div>
                  <div className="text-xs font-semibold text-slate-800">{opt.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>

      {/* ACHIEVEMENTS DISPLAY */}
      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading text-lg font-bold text-slate-900">
          Earned Badges & Feats ({profile?.achievements?.length || 0})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(profile?.achievements || []).map((achKey) => (
            <div
              key={achKey}
              className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-slate-900 capitalize">
                  {achKey.replace('_', ' ')}
                </h4>
                <p className="text-[11px] text-slate-500">Unlocked and stored in MongoDB</p>
              </div>
            </div>
          ))}

          {(!profile?.achievements || profile.achievements.length === 0) && (
            <div className="p-6 text-center text-slate-500 text-xs col-span-3">
              No badges unlocked yet. Complete your first topic or quiz to unlock achievements!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
