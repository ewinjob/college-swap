import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/cards/ProductCard';
import { KERALA_COLLEGES } from '../constants/colleges';
import { ITEM_CATEGORIES } from '../constants/categories';
import { FaSearch, FaRedo } from 'react-icons/fa';

// Initial Mock items across various Kerala campuses
const ALL_PRODUCTS = [
  {
    id: '1',
    title: 'Omega Mini Drafter with Canvas Bag + Clips',
    price: 380,
    isFree: false,
    isSwap: false,
    category: 'Drawing Tools',
    categoryId: 'drawing-tools',
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
    categoryId: 'calculators',
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
    categoryId: 'books',
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
    categoryId: 'lab-uniform',
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
    categoryId: 'bicycles',
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
    categoryId: 'hostel',
    college: 'National Institute of Technology (NIT) Calicut',
    collegeId: 'nitc',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Devika R.',
    sellerPhone: '9562123456',
    postedTime: '4 hrs ago'
  },
  {
    id: '7',
    title: 'Complete KTU Engineering Mechanics Solved Papers (2019 Scheme)',
    price: 0,
    isFree: true,
    isSwap: false,
    category: 'KTU Books',
    categoryId: 'books',
    college: 'Govt. Model Engineering College (MEC)',
    collegeId: 'mec',
    condition: 'Used (Good Condition)',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Gautam V.',
    sellerPhone: '9846123456',
    postedTime: '5 hrs ago'
  },
  {
    id: '8',
    title: 'Arduino Uno Starter Kit + Sensors & Breadboard',
    price: 850,
    isFree: false,
    isSwap: false,
    category: 'Electronics',
    categoryId: 'electronics',
    college: 'Rajagiri School of Engineering (RSET)',
    collegeId: 'rajagiri',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Joel Thomas',
    sellerPhone: '9847987654',
    postedTime: '1 day ago'
  }
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCollege = searchParams.get('college') || 'all';
  const urlCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(urlSearch);
  const [selectedCollege, setSelectedCollege] = useState(urlCollege);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [filterType, setFilterType] = useState('all'); // all, sell, swap, free

  // Filter products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((item) => {
      // Search matching
      const matchesQuery = query.trim() === '' || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.college.toLowerCase().includes(query.toLowerCase());

      // College matching
      const matchesCollege = selectedCollege === 'all' || item.collegeId === selectedCollege;

      // Category matching
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;

      // Deal type matching
      let matchesType = true;
      if (filterType === 'free') matchesType = item.isFree;
      if (filterType === 'swap') matchesType = item.isSwap;
      if (filterType === 'sell') matchesType = !item.isFree && !item.isSwap;

      return matchesQuery && matchesCollege && matchesCategory && matchesType;
    });
  }, [query, selectedCollege, selectedCategory, filterType]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCollege('all');
    setSelectedCategory('all');
    setFilterType('all');
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Explore Campus Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse available college supplies across campuses in Kerala.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items, books, tools..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition"
          />
          <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
        </div>
      </div>

      {/* Filter Row: College + Category + Deal Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* College Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            College / Campus
          </label>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
          >
            {KERALA_COLLEGES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
          >
            {ITEM_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Deal Type Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Listing Type
          </label>
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {[
              { id: 'all', label: 'All' },
              { id: 'sell', label: 'Sell' },
              { id: 'swap', label: 'Swap' },
              { id: 'free', label: 'Free' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`py-1.5 rounded-lg transition ${
                  filterType === type.id
                    ? 'bg-white text-sky-800 shadow-xs border border-sky-100 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Filter Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-sky-300 hover:text-sky-700 py-2 text-xs font-bold text-slate-600 transition"
          >
            <FaRedo className="text-[10px]" />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
        <span>Showing {filteredProducts.length} items</span>
        {selectedCollege !== 'all' && (
          <span className="font-semibold text-sky-700">
            Filtered by campus
          </span>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-slate-900 text-lg">No Items Found</h3>
          <p className="text-xs text-slate-500">
            We couldn&apos;t find any items matching your selected criteria. Try changing your campus or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
