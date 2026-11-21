import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaGraduationCap, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaBoxOpen, 
  FaBookmark, 
  FaTrash, 
  FaCheckCircle, 
  FaPlus,
  FaEdit,
  FaSignOutAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { KERALA_COLLEGES } from '../constants/colleges';
import { ALL_PRODUCTS } from '../utils/allProducts';
import { formatCurrency } from '../utils/formatCurrency';
import { getWhatsAppLink } from '../utils/contactSeller';
import { getProfileAPI, getUserProductsAPI, deleteProductAPI } from '../services/apiService';
import { showConfirmAlert, showToast, showSuccessAlert } from '../utils/alerts';

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'saved'
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Default / Logged-in student profile from localStorage or fallback
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Arjun S. Kumar',
      email: 'arjun.mec@gmail.com',
      phone: '9847123456',
      college: 'Govt. Model Engineering College (MEC)',
      collegeId: 'mec',
      branch: 'B.Tech Mechanical Engineering',
      semester: 'Semester 5',
      verified: true
    };
  });

  const [editForm, setEditForm] = useState({ ...user });

  // My listings state
  const [myListings, setMyListings] = useState([
    {
      id: '1',
      title: 'Omega Mini Drafter with Canvas Bag + Clips',
      price: 380,
      isFree: false,
      isSwap: false,
      category: 'Drawing Tools',
      college: 'Govt. Model Engineering College (MEC)',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      postedTime: '1 hr ago'
    },
    {
      id: '7',
      title: 'Complete KTU Engineering Mechanics Solved Papers (2019 Scheme)',
      price: 0,
      isFree: true,
      isSwap: false,
      category: 'KTU Books',
      college: 'Govt. Model Engineering College (MEC)',
      condition: 'Used (Good Condition)',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      postedTime: '5 hrs ago'
    }
  ]);

  // Saved / Wishlist items
  const [savedItems, setSavedItems] = useState([
    ALL_PRODUCTS[1], // Casio fx-991EX
    ALL_PRODUCTS[2]  // KTU S3 CS Books
  ]);

  // Fetch verified profile & user listings from backend if JWT exists
  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) return;

      try {
        const profileRes = await getProfileAPI();
        if (profileRes && profileRes.data) {
          setUser(prev => ({ ...prev, ...profileRes.data }));
          setEditForm(prev => ({ ...prev, ...profileRes.data }));
        }
      } catch (err) {
        console.log('Using local profile data.');
      }

      try {
        const listingsRes = await getUserProductsAPI();
        if (listingsRes && listingsRes.data && listingsRes.data.length > 0) {
          setMyListings(listingsRes.data);
        }
      } catch (err) {
        console.log('Using local user listings.');
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser(editForm);
    localStorage.setItem('currentUser', JSON.stringify(editForm));
    setIsEditing(false);
    setSavedSuccess(true);
    showToast('Profile updated successfully!');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeleteListing = async (id) => {
    const confirmed = await showConfirmAlert({
      title: 'Delete this item listing?',
      text: 'This item will be removed from the college swap catalog.',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      icon: 'warning'
    });

    if (!confirmed) return;

    try {
      await deleteProductAPI(id);
    } catch (err) {
      console.log('Local delete note');
    }
    setMyListings(prev => prev.filter(item => (item._id || item.id) !== id));
    showToast('Listing deleted successfully', 'success');
  };

  const handleToggleSold = (id) => {
    let newStatus = '';
    setMyListings(prev => prev.map(item => {
      const itemId = item._id || item.id;
      if (itemId === id) {
        newStatus = item.status === 'Sold' ? 'Active' : 'Sold';
        return {
          ...item,
          status: newStatus
        };
      }
      return item;
    }));
    showToast(`Listing marked as ${newStatus || 'Updated'}`, 'info');
  };

  const handleRemoveSaved = (id) => {
    setSavedItems(prev => prev.filter(item => (item._id || item.id) !== id));
    showToast('Removed from saved items', 'info');
  };

  const handleLogout = async () => {
    const confirmed = await showConfirmAlert({
      title: 'Log out of CampusSwap?',
      text: 'You will need to sign in again to manage your listings.',
      confirmButtonText: 'Yes, Log Out',
      cancelButtonText: 'Stay Logged In',
      icon: 'question'
    });

    if (confirmed) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      showToast('Logged out successfully', 'info');
      navigate('/auth');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* 1. Profile Banner & Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        
        {/* Soft Background Accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Avatar & Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                {user.name ? user.name.charAt(0) : 'S'}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs shadow-xs" title="Verified Campus Student">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
                <span className="rounded-full bg-sky-50 border border-sky-200 px-3 py-0.5 text-xs font-bold text-sky-800 flex items-center gap-1">
                  <FaShieldAlt className="text-sky-500 text-xs" />
                  JWT Verified Student
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 font-medium">
                <FaMapMarkerAlt className="text-sky-500 shrink-0 text-xs" />
                <span>{user.college}</span>
                {user.branch && <span className="text-slate-400">• {user.branch}</span>}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <FaEnvelope className="text-slate-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <FaWhatsapp />
                  +91 {user.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-sky-300 hover:text-sky-700 px-3.5 py-2 text-xs font-bold text-slate-700 transition cursor-pointer"
            >
              <FaEdit className="text-xs" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <Link
              to="/add-product"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-3.5 py-2 text-xs font-bold shadow-md shadow-sky-500/20 transition"
            >
              <FaPlus className="text-xs" />
              <span>Post New Item</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-3.5 py-2 text-xs font-bold transition cursor-pointer"
              title="End session and log out"
            >
              <FaSignOutAlt className="text-xs" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500" />
            Profile updated successfully!
          </div>
        )}

        {/* Edit Profile Form (Expandable) */}
        {isEditing && (
          <form onSubmit={handleProfileUpdate} className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Phone (+91)
              </label>
              <input
                type="tel"
                required
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                College Campus
              </label>
              <select
                value={editForm.collegeId || 'mec'}
                onChange={(e) => {
                  const selected = KERALA_COLLEGES.find(c => c.id === e.target.value);
                  setEditForm({
                    ...editForm,
                    collegeId: e.target.value,
                    college: selected ? selected.name : editForm.college
                  });
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white"
              >
                {KERALA_COLLEGES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>📍 {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department / Branch
              </label>
              <input
                type="text"
                value={editForm.branch || ''}
                onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                placeholder="e.g. Mechanical, Computer Science"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Current Semester
              </label>
              <input
                type="text"
                value={editForm.semester || ''}
                onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                placeholder="e.g. Semester 5"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 text-xs transition shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'listings'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FaBoxOpen />
          <span>My Uploaded Items ({myListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FaBookmark />
          <span>Saved / Bookmarks ({savedItems.length})</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: My Uploaded Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="text-4xl">📦</div>
              <h3 className="font-bold text-slate-800 text-base">No Items Listed Yet</h3>
              <p className="text-xs text-slate-500">
                You haven&apos;t posted any items yet. Turn your unused textbooks or drafters into cash!
              </p>
              <Link
                to="/add-product"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition"
              >
                <FaPlus className="text-xs" />
                <span>Post Your First Item</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myListings.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} className="flex gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'}
                      alt={item.title}
                      className="h-24 w-24 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                            {item.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            item.status === 'Sold'
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {item.status || 'Active'}
                          </span>
                        </div>
                        <Link to={`/products/${itemId}`} className="font-bold text-slate-900 text-sm hover:text-sky-600 line-clamp-1 mt-0.5">
                          {item.title}
                        </Link>
                        <p className="text-xs font-black text-slate-900 mt-1">
                          {formatCurrency(item.price, item.isFree, item.isSwap)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <button
                          onClick={() => handleToggleSold(itemId)}
                          className="text-slate-600 hover:text-sky-600 font-semibold cursor-pointer"
                        >
                          {item.status === 'Sold' ? 'Mark as Active' : 'Mark as Sold'}
                        </button>
                        <button
                          onClick={() => handleDeleteListing(itemId)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                          title="Delete listing"
                        >
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Saved / Bookmarks */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="text-4xl">🔖</div>
              <h3 className="font-bold text-slate-800 text-base">No Saved Items</h3>
              <p className="text-xs text-slate-500">
                You haven&apos;t saved any items yet. Explore the campus catalog to find gear you like.
              </p>
              <Link
                to="/products"
                className="inline-block rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition"
              >
                Browse Items
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedItems.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} className="flex gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                          {item.category}
                        </span>
                        <Link to={`/products/${itemId}`} className="block font-bold text-slate-900 text-sm hover:text-sky-600 line-clamp-1 mt-0.5">
                          {item.title}
                        </Link>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          📍 {item.college}
                        </p>
                        <p className="text-xs font-black text-slate-900 mt-1">
                          {formatCurrency(item.price, item.isFree, item.isSwap)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <a
                          href={getWhatsAppLink(item.sellerPhone, item.title, item.college)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold"
                        >
                          <FaWhatsapp />
                          <span>Chat on WhatsApp</span>
                        </a>
                        <button
                          onClick={() => handleRemoveSaved(itemId)}
                          className="text-slate-400 hover:text-red-500 text-xs font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
