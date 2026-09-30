import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users as UsersIcon, ArrowLeft, Shield, Mail, Award, CheckCircle } from 'lucide-react';
import { getAdminUsers } from '../services/adminService';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAdminUsers();
      setUsers(data.users || []);
    } catch (e) {
      console.error('Failed to load users:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Total Registered: {users.length}
        </span>
      </div>

      <div className="cq-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Registered Student Directory
          </h1>
          <p className="text-xs text-slate-500">
            All user accounts stored persistently in MongoDB Atlas. Normal students cannot edit administrative roles.
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs font-semibold text-slate-500">
            Querying MongoDB user documents...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="pb-3 px-3">Username</th>
                  <th className="pb-3 px-3">Email Address</th>
                  <th className="pb-3 px-3">Role</th>
                  <th className="pb-3 px-3">Level</th>
                  <th className="pb-3 px-3">Total XP</th>
                  <th className="pb-3 px-3">Conquered Topics</th>
                  <th className="pb-3 px-3">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id || u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {u.username}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono">
                      {u.email}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">
                      Lv.{u.level || 1}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-600 font-bold">
                      {u.xp || 0} XP
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {(u.completedTopics || []).length}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Initial'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
