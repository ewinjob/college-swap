import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/cards/ProductCard';
import { KERALA_COLLEGES } from '../constants/colleges';
import { ITEM_CATEGORIES } from '../constants/categories';
import { getAllProductsAPI } from '../services/apiService';
import { FaSearch, FaRedo } from 'react-icons/fa';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const selectedCollege = searchParams.get('college') || 'all';
  const selectedCategory = searchParams.get('category') || 'all';

  const [filterType, setFilterType] = useState('all'); // all, sell, swap, free
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const updateParam = (key, value, defaultVal = '') => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === defaultVal) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  // Fetch all products from MongoDB via Express API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAllProductsAPI();
        if (res && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Could not load products from server. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter live products from MongoDB
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search matching
      const matchesQuery = query.trim() === '' || 
        (item.title || '').toLowerCase().includes(query.toLowerCase()) ||
        (item.category || '').toLowerCase().includes(query.toLowerCase()) ||
        (item.college || '').toLowerCase().includes(query.toLowerCase());

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
  }, [products, query, selectedCollege, selectedCategory, filterType]);

  const resetFilters = () => {
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
            onChange={(e) => updateParam('search', e.target.value, '')}
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
            onChange={(e) => updateParam('college', e.target.value, 'all')}
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
            onChange={(e) => updateParam('category', e.target.value, 'all')}
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

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
          {error}
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-80 rounded-2xl border border-slate-200 bg-white animate-pulse p-4 space-y-3">
              <div className="h-44 rounded-xl bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
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
