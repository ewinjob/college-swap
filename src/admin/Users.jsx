import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getAllUsersAPI } from '../services/apiService';

export default function Users() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsersAPI();
        if (res?.data) setStudents(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredStudents = students.filter(s => 
    (s.name || '').toLowerCase().includes(query.toLowerCase()) || 
    (s.college || '').toLowerCase().includes(query.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Registered College Students</h1>
          <p className="text-xs text-slate-400 mt-1">Manage student accounts and campus verification badges.</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by student name, college or email..."
          className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-sky-500"
        />
        <FaSearch className="absolute left-3 top-3 text-slate-500 text-xs" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="pb-3 font-bold">Student Name</th>
              <th className="pb-3 font-bold">Email</th>
              <th className="pb-3 font-bold">Campus</th>
              <th className="pb-3 font-bold">Branch & Sem</th>
              <th className="pb-3 font-bold">Auth Type</th>
              <th className="pb-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {loading ? (
              <tr><td colSpan="6" className="py-6 text-center text-slate-400">Loading students from database...</td></tr>
            ) : filteredStudents.map(student => (
              <tr key={student._id || student.id} className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 font-bold text-white flex items-center gap-2">
                  {student.avatar ? (
                    <img src={student.avatar} alt={student.name} className="h-7 w-7 rounded-full object-cover" />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-sky-900 text-sky-300 flex items-center justify-center font-bold text-xs">
                      {(student.name || 'S').charAt(0)}
                    </div>
                  )}
                  <span>{student.name}</span>
                </td>
                <td className="py-3.5 text-slate-400">{student.email}</td>
                <td className="py-3.5 text-slate-400 max-w-[180px] truncate">📍 {student.college || 'Not set'}</td>
                <td className="py-3.5 text-slate-300">{[student.branch, student.semester].filter(Boolean).join(' • ') || '—'}</td>
                <td className="py-3.5 font-bold text-sky-400">{student.isGoogleUser ? 'Google OAuth' : 'Email / JWT'}</td>
                <td className="py-3.5">
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold border bg-sky-950 text-sky-400 border-sky-800">
                    Verified Student
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
