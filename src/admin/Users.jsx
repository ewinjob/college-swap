import { useState } from 'react';
import { FaUserCheck, FaTrash, FaSearch, FaShieldAlt } from 'react-icons/fa';

export default function Users() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState([
    { id: '1', name: 'Arjun S. Kumar', email: 'arjun.mec@gmail.com', college: 'Govt. Model Engineering College (MEC)', branch: 'Mechanical S5', listings: 3, verified: true },
    { id: '2', name: 'Sneha Nair', email: 'sneha.cet@gmail.com', college: 'College of Engineering Trivandrum (CET)', branch: 'ECE S3', listings: 2, verified: true },
    { id: '3', name: 'Fahad Mohammed', email: 'fahad.tkm@gmail.com', college: 'TKM College of Engineering', branch: 'CSE S7', listings: 4, verified: true },
    { id: '4', name: 'Ananya Pradeep', email: 'ananya.gec@gmail.com', college: 'Govt. Engineering College Thrissur', branch: 'Civil S3', listings: 1, verified: false },
    { id: '5', name: 'Vishnu Das', email: 'vishnu.cusat@gmail.com', college: 'CUSAT Kochi', branch: 'Safety & Fire S5', listings: 2, verified: true }
  ]);

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.college.toLowerCase().includes(query.toLowerCase()) ||
    s.email.toLowerCase().includes(query.toLowerCase())
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
              <th className="pb-3 font-bold">Active Listings</th>
              <th className="pb-3 font-bold">Status</th>
              <th className="pb-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 font-bold text-white flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-sky-900 text-sky-300 flex items-center justify-center font-bold text-xs">
                    {student.name.charAt(0)}
                  </div>
                  <span>{student.name}</span>
                </td>
                <td className="py-3.5 text-slate-400">{student.email}</td>
                <td className="py-3.5 text-slate-400 max-w-[180px] truncate">📍 {student.college}</td>
                <td className="py-3.5 text-slate-300">{student.branch}</td>
                <td className="py-3.5 font-bold text-sky-400">{student.listings} items</td>
                <td className="py-3.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                    student.verified 
                      ? 'bg-sky-950 text-sky-400 border-sky-800' 
                      : 'bg-amber-950 text-amber-400 border-amber-800'
                  }`}>
                    {student.verified ? 'Verified Student' : 'Pending Verification'}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 p-2 transition"
                    title="Remove user"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
