import { useState } from 'react';
import { FaBoxOpen, FaGraduationCap, FaWhatsapp, FaTrash } from 'react-icons/fa';

export default function Dashboard() {
  const [items, setItems] = useState([
    { id: '1', title: 'Omega Mini Drafter with Bag', college: 'Govt. Model Engineering College (MEC)', price: '₹380', seller: 'Arjun K.', status: 'Active' },
    { id: '2', title: 'Casio fx-991EX Calculator', college: 'College of Engineering Trivandrum (CET)', price: '₹650', seller: 'Sneha Nair', status: 'Active' },
    { id: '3', title: 'KTU S3 CS Core Books', college: 'TKM College of Engineering', price: 'Swap', seller: 'Fahad M.', status: 'Active' },
    { id: '4', title: 'White Lab Apron (Size L)', college: 'GEC Thrissur', price: '₹150', seller: 'Ananya P.', status: 'Active' }
  ]);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white">Ghost Admin Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor campus marketplace activity and manage listings across Kerala colleges.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Listings</span>
            <FaBoxOpen className="text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{items.length + 18}</div>
          <div className="text-[11px] text-sky-400 font-semibold">+12 items this week</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Colleges</span>
            <FaGraduationCap className="text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">16 Campuses</div>
          <div className="text-[11px] text-slate-400">CET, MEC, TKM, CUSAT leading</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">WhatsApp Clicks</span>
            <FaWhatsapp className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">342 Leads</div>
          <div className="text-[11px] text-emerald-400 font-semibold">Direct student peer chats</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Platform Cut</span>
            <span className="text-slate-500 font-bold">₹0</span>
          </div>
          <div className="text-2xl font-black text-sky-400">100% Free</div>
          <div className="text-[11px] text-slate-400">Non-profit student network</div>
        </div>

      </div>

      {/* Recent Listings Management Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Live Kerala Listings</h2>
          <span className="text-xs text-slate-400">Showing {items.length} items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="pb-3 font-bold">Item Title</th>
                <th className="pb-3 font-bold">Campus / College</th>
                <th className="pb-3 font-bold">Price / Deal</th>
                <th className="pb-3 font-bold">Student Seller</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3.5 font-bold text-white max-w-[200px] truncate">{item.title}</td>
                  <td className="py-3.5 text-slate-400 max-w-[180px] truncate">📍 {item.college}</td>
                  <td className="py-3.5 font-bold text-sky-400">{item.price}</td>
                  <td className="py-3.5 text-slate-300">{item.seller}</td>
                  <td className="py-3.5">
                    <span className="rounded-full bg-sky-950 text-sky-400 border border-sky-800/80 px-2 py-0.5 text-[10px] font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 p-1.5 transition"
                      title="Remove item"
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

    </div>
  );
}
