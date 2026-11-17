import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KERALA_COLLEGES } from '../constants/colleges';
import { ITEM_CATEGORIES, ITEM_CONDITIONS } from '../constants/categories';
import { FaPlus, FaWhatsapp, FaCheck } from 'react-icons/fa';

export default function AddProduct() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'books',
    college: 'cet',
    condition: 'Like New / Barely Used',
    dealType: 'sell', // sell, swap, free
    price: '',
    description: '',
    imageUrl: '',
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    meetupLocation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, dispatch allAPI.uploadItemAPI(formData)
    setTimeout(() => {
      navigate('/products');
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8 text-center space-y-2">
        <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800 border border-sky-200">
          Kerala Campus Marketplace
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          List an Item for Sell or Swap
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Pass your drafters, KTU books, or calculators directly to juniors on your campus. Free to list!
        </p>
      </div>

      {submitted ? (
        <div className="bg-white p-10 rounded-3xl border border-sky-200 text-center shadow-lg shadow-sky-500/10 space-y-4 max-w-md mx-auto">
          <div className="h-16 w-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-2xl mx-auto">
            <FaCheck />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Item Listed Successfully!</h2>
          <p className="text-sm text-slate-500">
            Students on your campus can now reach out to you directly on WhatsApp.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Section 1: Item Basic Details */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Item Information
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Listing Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Omega Mini Drafter with Board Clips + Bag"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 outline-none focus:border-sky-500"
                >
                  {ITEM_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Item Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 outline-none focus:border-sky-500"
                >
                  {ITEM_CONDITIONS.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Deal Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Listing Type *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'sell', label: '💰 Sell for ₹' },
                  { id: 'swap', label: '🔄 Swap / Exchange' },
                  { id: 'free', label: '🎁 Free Giveaway' }
                ].map(type => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setFormData(p => ({ ...p, dealType: type.id }))}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition ${
                      formData.dealType === type.id
                        ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {formData.dealType === 'sell' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Expected Price (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="350"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm font-bold text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Image Link / Photo URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Paste image link (e.g. from Unsplash or image host)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description / Condition Details
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Mention semester, branch, included accessories, or swap preferences..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Section 2: College & Campus Meetup */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Campus Location & Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your College / Campus *
                </label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                >
                  {KERALA_COLLEGES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>📍 {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Campus Meetup Spot
                </label>
                <input
                  type="text"
                  name="meetupLocation"
                  value={formData.meetupLocation}
                  onChange={handleChange}
                  placeholder="e.g. College Canteen, Library Porch, LH Gate"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="sellerName"
                  required
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="Rahul S."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1 text-emerald-600">
                  <FaWhatsapp /> WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="sellerPhone"
                  required
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  placeholder="9847123456"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="sellerEmail"
                  value={formData.sellerEmail}
                  onChange={handleChange}
                  placeholder="student@college.edu"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 hover:shadow-xl transition duration-200 flex items-center justify-center gap-2"
            >
              <FaPlus />
              <span>Post Listing Now</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
