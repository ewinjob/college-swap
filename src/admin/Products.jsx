import { useState } from 'react';
import { FaTrash, FaCheckCircle, FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([
    { id: '1', title: 'Omega Mini Drafter with Bag', college: 'Govt. Model Engineering College (MEC)', price: '₹380', category: 'Drawing Tools', sellerPhone: '9847123456', status: 'Approved' },
    { id: '2', title: 'Casio fx-991EX Calculator', college: 'College of Engineering Trivandrum (CET)', price: '₹650', category: 'Calculators', sellerPhone: '9447123456', status: 'Approved' },
    { id: '3', title: 'KTU S3 CS Core Books Bundle', college: 'TKM College of Engineering', price: 'Swap Only', category: 'Books', sellerPhone: '9895123456', status: 'Approved' },
    { id: '4', title: 'White Lab Apron (Size L)', college: 'Govt. Engineering College Thrissur', price: '₹150', category: 'Lab Apron', sellerPhone: '9744123456', status: 'Approved' },
    { id: '5', title: 'Hero Sprint 21-Speed Bicycle', college: 'CUSAT Kochi', price: '₹2,400', category: 'Bicycles', sellerPhone: '9633123456', status: 'Approved' }
  ]);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) || 
    i.college.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Manage Listings</h1>
          <p className="text-xs text-slate-400 mt-1">Review, approve, or remove student marketplace listings.</p>
        </div>
        <Link
          to="/add-product"
          className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2 text-xs font-bold text-white transition shadow-sm w-fit"
        >
          <FaPlus className="text-[10px]" />
          <span>Upload Item as Admin</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title or college..."
          className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500"
        />
        <FaSearch className="absolute left-3 top-3 text-slate-500 text-xs" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="pb-3 font-bold">Item Title</th>
              <th className="pb-3 font-bold">Category</th>
              <th className="pb-3 font-bold">Campus</th>
              <th className="pb-3 font-bold">Price / Deal</th>
              <th className="pb-3 font-bold">WhatsApp Contact</th>
              <th className="pb-3 font-bold">Status</th>
              <th className="pb-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredItems.map(item => (
              <tr key={item.id} className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 font-bold text-white max-w-200px truncate">{item.title}</td>
                <td className="py-3.5 text-slate-400">{item.category}</td>
                <td className="py-3.5 text-slate-400 max-w-160px truncate">📍 {item.college}</td>
                <td className="py-3.5 font-bold text-emerald-400">{item.price}</td>
                <td className="py-3.5 text-slate-300 font-mono text-[11px]">+91 {item.sellerPhone}</td>
                <td className="py-3.5">
                  <span className="rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 p-2 transition"
                    title="Delete item"
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
