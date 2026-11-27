import { useState, useEffect } from 'react';
import { FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllProductsAPI, deleteProductAPI } from '../services/apiService';
import { formatCurrency } from '../utils/formatCurrency';
import { showConfirmAlert, showToast, showErrorAlert } from '../utils/alerts';

export default function AdminProducts() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getAllProductsAPI();
        if (res?.data) setItems(res.data);
      } catch (err) {
        console.error('Failed to fetch admin products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await showConfirmAlert({
      title: 'Admin Moderation: Delete Listing?',
      text: 'This listing will be permanently removed from the student marketplace.',
      confirmButtonText: 'Yes, Remove Item',
      cancelButtonText: 'Keep Item',
      icon: 'warning'
    });

    if (confirmed) {
      try {
        await deleteProductAPI(id);
        setItems(prev => prev.filter(item => (item._id || item.id) !== id));
        showToast('Item removed by admin', 'success');
      } catch (err) {
        showErrorAlert('Delete Failed', err?.response?.data?.error || 'Sign in first to delete listings.');
      }
    }
  };

  const filteredItems = items.filter(i => 
    (i.title || '').toLowerCase().includes(query.toLowerCase()) || 
    (i.college || '').toLowerCase().includes(query.toLowerCase())
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
            {loading ? (
              <tr><td colSpan="7" className="py-6 text-center text-slate-400">Loading listings from database...</td></tr>
            ) : filteredItems.map(item => {
              const itemId = item._id || item.id;
              return (
              <tr key={itemId} className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 font-bold text-white max-w-200px truncate">{item.title}</td>
                <td className="py-3.5 text-slate-400">{item.category}</td>
                <td className="py-3.5 text-slate-400 max-w-160px truncate">📍 {item.college}</td>
                <td className="py-3.5 font-bold text-emerald-400">{formatCurrency(item.price, item.isFree, item.isSwap)}</td>
                <td className="py-3.5 text-slate-300 font-mono text-[11px]">+91 {item.sellerPhone}</td>
                <td className="py-3.5">
                  <span className="rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                    {item.status || 'Active'}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDelete(itemId)}
                    className="rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 p-2 transition cursor-pointer"
                    title="Delete item"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
