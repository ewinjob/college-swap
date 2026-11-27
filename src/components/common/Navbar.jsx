import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KERALA_COLLEGES } from "../../constants/colleges";
import { FaPlus, FaSearch, FaGraduationCap, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { showLoginRequiredAlert, showConfirmAlert, showToast } from "../../utils/alerts";

export default function Navbar({ selectedCollege, onSelectCollege }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setAuthVersion] = useState(0);
  const navigate = useNavigate();
  useLocation(); // Re-render Navbar on route changes so auth state stays fresh

  const token = sessionStorage.getItem('token') || localStorage.getItem('token') || null;
  let user = null;
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) user = JSON.parse(savedUser);
  } catch {
    user = null;
  }

  useEffect(() => {
    const syncAuth = () => setAuthVersion((v) => v + 1);
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handlePostClick = (e) => {
    if (!token) {
      e.preventDefault();
      showLoginRequiredAlert(navigate);
    }
  };

  const handleLogout = async () => {
    const confirmed = await showConfirmAlert({
      title: 'Log out of CampusSwap?',
      text: 'You will need to sign in again to post or manage your listings.',
      confirmButtonText: 'Yes, Log Out',
      cancelButtonText: 'Stay Logged In',
      icon: 'question'
    });

    if (confirmed) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setAuthVersion((v) => v + 1);
      showToast('Logged out successfully', 'info');
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition duration-200">
              <FaGraduationCap className="text-xl" />
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-black text-xl tracking-tight text-slate-900 leading-none">
                Campus<span className="text-sky-500">Swap</span>
              </div>
              <span className="text-[10px] font-bold text-sky-600 tracking-wider uppercase">
                Kerala 🌴
              </span>
            </div>
          </Link>

          {/* Kerala College Selector Dropdown (Desktop) */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <select
                value={selectedCollege || 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  onSelectCollege && onSelectCollege(val);
                  navigate(val === 'all' ? '/products' : `/products?college=${encodeURIComponent(val)}`);
                }}
                className="appearance-none rounded-full border border-sky-200 bg-sky-50/70 py-1.5 pl-3.5 pr-8 text-xs font-bold text-sky-900 shadow-xs outline-none hover:bg-sky-100/80 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition cursor-pointer"
              >
                {KERALA_COLLEGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    📍 {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-sky-600">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, drafters, calculators, cycles..."
              className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
            <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          </div>
        </form>

        {/* Desktop Nav Links & Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/products"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/60 transition"
          >
            Explore Items
          </Link>

          {/* 🌟 Conditional Navigation: IF TOKEN ? SHOW PROFILE WITH GOOGLE PICTURE : SHOW LOGIN */}
          {token ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 py-1 pl-1 pr-3 text-xs font-bold text-slate-800 transition shadow-xs"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'Student'}
                    className="h-7 w-7 rounded-full object-cover border border-sky-300 shadow-xs"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0) : 'S'}
                  </div>
                )}
                <span className="truncate max-w-[110px]">
                  {user?.name ? user.name.split(' ')[0] : 'Profile'}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition cursor-pointer"
                title="Logout"
              >
                <FaSignOutAlt className="text-sm" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/60 transition"
            >
              Log in
            </Link>
          )}

          {/* Post / Sell Item CTA */}
          <Link
            to="/add-product"
            onClick={handlePostClick}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg transition duration-200"
          >
            <FaPlus className="text-xs" />
            <span>Post an Item</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-6 md:hidden shadow-lg space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search KTU books, drafters, aprons..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-800 outline-none focus:border-sky-500"
            />
            <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
          </form>

          {/* Mobile College Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Select Your College:
            </label>
            <select
              value={selectedCollege || 'all'}
              onChange={(e) => {
                onSelectCollege && onSelectCollege(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm font-medium text-slate-800"
            >
              {KERALA_COLLEGES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg border border-slate-200 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Browse All
            </Link>

            {/* Mobile: IF TOKEN ? SHOW PROFILE : SHOW SIGN IN */}
            {token ? (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 py-2.5 text-center text-xs font-bold text-sky-800"
              >
                {user?.avatar && (
                  <img src={user.avatar} alt="Profile" className="h-4 w-4 rounded-full object-cover" />
                )}
                <span>My Profile</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-slate-200 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign In
              </Link>
            )}
          </div>

          <Link
            to="/add-product"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handlePostClick(e);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-sky-700"
          >
            <FaPlus />
            Post Item / Swap
          </Link>

          {token && (
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="w-full text-center text-xs font-bold text-red-500 py-1"
            >
              Logout of CollegeSwap
            </button>
          )}
        </div>
      )}
    </header>
  );
}
