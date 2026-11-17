import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  FaSearch, 
  FaWhatsapp, 
  FaDraftingCompass, 
  FaCalculator, 
  FaBook, 
  FaTshirt, 
  FaBed, 
  FaBicycle,
  FaPlus
} from 'react-icons/fa';
import ProductCard from '../components/cards/ProductCard';
import { KERALA_COLLEGES } from '../constants/colleges';

// Sample Featured Kerala Listings with real items students need
const SAMPLE_LISTINGS = [
  {
    id: '1',
    title: 'Omega Mini Drafter with Canvas Bag + Clips',
    price: 380,
    isFree: false,
    isSwap: false,
    category: 'Drawing Tools',
    college: 'Govt. Model Engineering College (MEC)',
    collegeId: 'mec',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Arjun K.',
    sellerPhone: '9847123456',
    postedTime: '1 hr ago'
  },
  {
    id: '2',
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    price: 650,
    isFree: false,
    isSwap: false,
    category: 'Calculators',
    college: 'College of Engineering Trivandrum (CET)',
    collegeId: 'cet',
    condition: 'Gently Used',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Sneha Nair',
    sellerPhone: '9447123456',
    postedTime: '3 hrs ago'
  },
  {
    id: '3',
    title: 'KTU S3 Computer Science Core Subjects Bundle (4 Books)',
    price: 0,
    isFree: false,
    isSwap: true,
    category: 'KTU Books',
    college: 'TKM College of Engineering',
    collegeId: 'tkm',
    condition: 'Used (Good Condition)',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Fahad M.',
    sellerPhone: '9895123456',
    postedTime: 'Yesterday'
  },
  {
    id: '4',
    title: 'White Lab Apron (Size L) + Chemistry Safety Goggles',
    price: 150,
    isFree: false,
    isSwap: false,
    category: 'Lab Aprons',
    college: 'Govt. Engineering College (GEC) Thrissur',
    collegeId: 'gect',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Ananya P.',
    sellerPhone: '9744123456',
    postedTime: '2 days ago'
  },
  {
    id: '5',
    title: 'Hero Sprint 21-Speed Bicycle (Hostel Commute)',
    price: 2400,
    isFree: false,
    isSwap: false,
    category: 'Bicycles',
    college: 'CUSAT (Cochin University)',
    collegeId: 'cusat',
    condition: 'Used (Good Condition)',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Vishnu Das',
    sellerPhone: '9633123456',
    postedTime: 'Just now'
  },
  {
    id: '6',
    title: 'Electric Kettle 1.5L + Study Desk Lamp',
    price: 499,
    isFree: false,
    isSwap: false,
    category: 'Hostel Essentials',
    college: 'National Institute of Technology (NIT) Calicut',
    collegeId: 'nitc',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Devika R.',
    sellerPhone: '9562123456',
    postedTime: '4 hrs ago'
  }
];

const CATEGORIES = [
  { id: 'drawing-tools', label: 'Mini Drafter & Tools', count: '140+ items', icon: FaDraftingCompass, color: 'from-sky-500 to-blue-600' },
  { id: 'calculators', label: 'fx-991EX Calculators', count: '95+ items', icon: FaCalculator, color: 'from-blue-600 to-indigo-600' },
  { id: 'books', label: 'KTU Textbooks & Notes', count: '320+ items', icon: FaBook, color: 'from-cyan-500 to-sky-600' },
  { id: 'lab-uniform', label: 'Lab Coats & Aprons', count: '80+ items', icon: FaTshirt, color: 'from-sky-600 to-indigo-500' },
  { id: 'hostel', label: 'Hostel Gear & Lamps', count: '210+ items', icon: FaBed, color: 'from-amber-500 to-orange-500' },
  { id: 'bicycles', label: 'Bicycles & Rides', count: '45+ items', icon: FaBicycle, color: 'from-teal-500 to-emerald-600' },
];

export default function Home() {
  const context = useOutletContext() || {};
  const { selectedCollege = 'all', setSelectedCollege = () => {} } = context;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabCollege, setActiveTabCollege] = useState('all');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (selectedCollege !== 'all') params.append('college', selectedCollege);
    navigate(`/products?${params.toString()}`);
  };

  // Filter listings based on selected campus tab
  const filteredListings = activeTabCollege === 'all'
    ? SAMPLE_LISTINGS
    : SAMPLE_LISTINGS.filter(item => item.collegeId === activeTabCollege);

  const topCollegeTabs = [
    { id: 'all', name: 'All Kerala' },
    { id: 'cet', name: 'CET Trivandrum' },
    { id: 'mec', name: 'MEC Kochi' },
    { id: 'tkm', name: 'TKM Kollam' },
    { id: 'gect', name: 'GEC Thrissur' },
    { id: 'nitc', name: 'NIT Calicut' },
    { id: 'cusat', name: 'CUSAT' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION (Sky Blue Combined Theme) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/90 via-blue-50/30 to-white pt-12 pb-20 border-b border-slate-200/60">
        
        {/* Soft Background Accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-900 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                <span>🌴 Kerala&apos;s Campus Marketplace • 50+ Engineering & Arts Colleges</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                Buy, Sell & Swap College Gear on <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600">Your Campus.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect directly with seniors and batchmates at <strong>CET, MEC, TKM, CUSAT, GEC</strong> and other colleges. Buy used KTU drafters, calculators, textbooks, and hostel essentials without courier fees.
              </p>

              {/* Search + College Combo Box */}
              <form 
                onSubmit={handleSearchSubmit} 
                className="mx-auto lg:mx-0 max-w-2xl bg-white p-2.5 rounded-2xl shadow-xl shadow-sky-500/10 border border-slate-200 flex flex-col sm:flex-row gap-2"
              >
                {/* College Selector inside Search */}
                <div className="sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 sm:pr-2">
                  <select
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="w-full h-full bg-transparent text-xs font-bold text-slate-700 py-2 px-3 outline-none cursor-pointer"
                  >
                    {KERALA_COLLEGES.map(c => (
                      <option key={c.id} value={c.id}>📍 {c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Search Text Input */}
                <div className="flex-1 relative flex items-center">
                  <FaSearch className="absolute left-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drafter, fx-991EX, S3 KTU books..."
                    className="w-full py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 transition"
                >
                  Search
                </button>
              </form>

              {/* Quick Filter Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs">
                <span className="font-semibold text-slate-500">Popular:</span>
                {['Mini Drafter', 'Casio fx-991EX', 'KTU S3 Books', 'Lab Apron', 'Cycle'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/products?search=${encodeURIComponent(tag)}`);
                    }}
                    className="rounded-full bg-white border border-slate-200/80 px-3 py-1 font-medium text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Showcase: Floating Visual Student Swap Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                
                {/* Main Card (Mini Drafter) */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-500/10">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80" 
                      alt="Omega Mini Drafter"
                      className="h-full w-full object-cover" 
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      ₹380 <span className="line-through text-slate-400 font-normal ml-1">₹850</span>
                    </span>
                    <span className="absolute top-3 right-3 rounded-full bg-sky-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
                      Like New
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                      Engineering Graphics
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      Omega Mini Drafter + Board Clips
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>📍</span> Model Engineering College (MEC), Kochi
                    </p>
                  </div>

                  {/* Student Seller + Direct WhatsApp Connect Demo */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                        A
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800 leading-none">Arjun S.</p>
                        <p className="text-[10px] text-slate-400">Mech, S5 • Verified Student</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 text-xs font-bold shadow-sm shadow-emerald-500/30">
                      <FaWhatsapp className="text-sm" />
                      <span>Chat on WhatsApp</span>
                    </div>
                  </div>
                </div>

                {/* Floating Junior-Senior Dialogue Pill */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-2xl bg-slate-900 p-3.5 text-white shadow-xl flex items-center gap-3 border border-slate-800 max-w-[260px]">
                  <div className="h-9 w-9 rounded-full bg-sky-500 flex items-center justify-center font-bold text-white shrink-0">
                    🤝
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-bold text-sky-400">Meet at College Canteen</p>
                    <p className="text-slate-300 text-[11px]">Inspect first, pay via UPI!</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Browse by Essentials
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Everything KTU engineering, medical, and arts students need for the semester.
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/10 transition duration-200"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition duration-300 mb-3`}>
                  <Icon />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-sky-600 transition">
                  {cat.label}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 mt-1">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED LISTINGS + KERALA CAMPUS TAB FILTER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Live Campus Listings
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Active items posted by students across Kerala colleges.
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Browse All {SAMPLE_LISTINGS.length}+ Items</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Campus Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {topCollegeTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabCollege(tab.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTabCollege === tab.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-sky-700'
              }`}
            >
              📍 {tab.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredListings.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No items currently listed for this campus.</p>
            <Link
              to="/add-product"
              className="mt-3 inline-block rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
            >
              Be the first to post for this campus!
            </Link>
          </div>
        )}
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Simple & Student-Friendly
            </span>
            <h2 className="text-3xl font-extrabold mt-2">
              How CampusSwap Works
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              No middleman, no delivery delays, zero commission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 font-black text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-lg text-white">Find or Post an Item</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Filter by your Kerala college. Need a drafter or KTU notes? Find someone in your college who is selling or swapping.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-lg flex items-center justify-center">
                <FaWhatsapp />
              </div>
              <h3 className="font-bold text-lg text-white">Connect via WhatsApp</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Click one button to message the seller on WhatsApp with a pre-filled item inquiry. No cumbersome in-app chats.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 font-black text-lg flex items-center justify-center">
                🤝
              </div>
              <h3 className="font-bold text-lg text-white">Meet at Campus & Pay</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Meet at your campus canteen, library, or hostel gate. Check the item condition in person and pay via UPI or cash.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER (Sky Blue combined theme) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 p-8 sm:p-12 text-white shadow-xl shadow-sky-600/15">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              Semester Moving Out?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Pass on your tools and books to your juniors!
            </h2>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              Don&apos;t leave your drafters, KTU guides, and lab coats locked in your hostel room. Turn them into quick cash or swap with fellow students.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/add-product"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-800 shadow-md hover:bg-sky-50 transition"
              >
                <FaPlus className="text-xs" />
                <span>Post an Item in 2 Mins</span>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition"
              >
                <span>Browse All Items</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
