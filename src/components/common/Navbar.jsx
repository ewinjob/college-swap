import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KERALA_COLLEGES } from "../../constants/colleges";
import { FaPlus, FaSearch, FaGraduationCap } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({ selectedCollege, onSelectCollege }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition duration-200">
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
                onChange={(e) => onSelectCollege && onSelectCollege(e.target.value)}
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

          <Link
            to="/auth"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/60 transition"
          >
            Login
          </Link>

          {/* Post / Sell Item CTA */}
          <Link
            to="/add-product"
            className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg transition duration-200"
          >
            <FaPlus className="text-xs" />
            <span>Post an Item</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
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
              className="rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Browse All
            </Link>
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
          </div>

          <Link
            to="/add-product"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-sky-700"
          >
            <FaPlus />
            Post Item / Swap
          </Link>
        </div>
      )}
    </header>
  );
}
