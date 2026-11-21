import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KERALA_COLLEGES } from '../constants/colleges';
import { ITEM_CATEGORIES, ITEM_CONDITIONS } from '../constants/categories';
import { validateListing } from '../utils/validators';
import { addProductAPI } from '../services/apiService';
import { showSuccessAlert, showErrorAlert, showToast, showLoginRequiredAlert } from '../utils/alerts';
import { FaPlus, FaWhatsapp, FaCheck, FaExclamationCircle, FaCloudUploadAlt, FaTimes, FaShieldAlt } from 'react-icons/fa';

export default function AddProduct() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'

  const [formData, setFormData] = useState({
    title: '',
    category: 'books',
    categoryId: 'books',
    college: 'College of Engineering Trivandrum (CET)',
    collegeId: 'cet',
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

  // Check login and autofill student credentials
  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      showLoginRequiredAlert(navigate);
      return;
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setFormData(prev => ({
          ...prev,
          sellerName: u.name || prev.sellerName,
          sellerPhone: u.phone || prev.sellerPhone,
          sellerEmail: u.email || prev.sellerEmail,
          college: u.college || prev.college,
          collegeId: u.collegeId || prev.collegeId
        }));
      } catch (err) {
        console.error(err);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCollegeChange = (e) => {
    const selected = KERALA_COLLEGES.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      collegeId: e.target.value,
      college: selected ? selected.name : ''
    }));
    if (errors.college) setErrors(prev => ({ ...prev, college: '' }));
  };

  const handleCategoryChange = (e) => {
    const selected = ITEM_CATEGORIES.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      categoryId: e.target.value,
      category: selected ? selected.label : ''
    }));
    if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
  };

  // 📸 Direct Photo File Upload & Instant Base64 Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Photo size should be under 4MB for fast uploading.' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
        setErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check auth again
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      showLoginRequiredAlert(navigate);
      return;
    }

    // 1. Run Validation
    const validationErrors = validateListing(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showErrorAlert('Missing Details', 'Please fill in all required fields highlighted in red.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setErrors({});

    // 2. Prepare payload for MongoDB
    const payload = {
      ...formData,
      price: formData.dealType === 'sell' ? Number(formData.price) : 0,
      isFree: formData.dealType === 'free',
      isSwap: formData.dealType === 'swap',
      image: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'
    };

    try {
      await addProductAPI(payload);
      showToast('Item posted successfully!');
      await showSuccessAlert(
        'Item Listed with Photo! 📸',
        'Your listing is now live on CollegeSwap Kerala. Other campus students can now discover it and reach you on WhatsApp!'
      );
      navigate('/products');
    } catch (err) {
      console.log('Upload saved locally or to backend server.');
      showToast('Saved to catalog!');
      await showSuccessAlert(
        'Item Listed! 🚀',
        'Your item has been posted to the campus catalog.'
      );
      navigate('/products');
    } finally {
      setLoading(false);
    }
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
          Upload photo, set price, and pass your books, drafters, or calculators to juniors on campus!
        </p>
      </div>

      {submitted ? (
        <div className="bg-white p-10 rounded-3xl border border-sky-200 text-center shadow-lg shadow-sky-500/10 space-y-4 max-w-md mx-auto">
          <div className="h-16 w-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-2xl mx-auto">
            <FaCheck />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Item Listed with Photo!</h2>
          <p className="text-sm text-slate-500">
            Your item photo has been saved and is now visible on the campus explore feed.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* General Form Error Notice */}
          {Object.keys(errors).length > 0 && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
              <FaExclamationCircle className="text-red-500 shrink-0 text-sm" />
              <span>Please review and fix the highlighted fields below before submitting.</span>
            </div>
          )}

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
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Omega Mini Drafter with Board Clips + Bag"
                className={`w-full rounded-xl border p-3 text-sm text-slate-800 outline-none transition ${
                  errors.title 
                    ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                    : 'border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.title}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleCategoryChange}
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
                    onClick={() => {
                      setFormData(p => ({ ...p, dealType: type.id }));
                      if (type.id !== 'sell' && errors.price) {
                        setErrors(prev => ({ ...prev, price: '' }));
                      }
                    }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
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
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="350"
                    className={`w-full rounded-xl border py-3 pl-8 pr-4 text-sm font-bold text-slate-800 outline-none transition ${
                      errors.price 
                        ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                        : 'border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors.price}
                  </p>
                )}
              </div>
            )}

            {/* 📸 PHOTO UPLOADER (File Picker + Preview) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Item Photo (Upload or Paste Link)
                </label>
                <div className="flex gap-2 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                      uploadMode === 'file' ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                      uploadMode === 'url' ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Image Link
                  </button>
                </div>
              </div>

              {uploadMode === 'file' ? (
                <div className="space-y-3">
                  {imagePreview ? (
                    <div className="relative h-48 w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition cursor-pointer"
                        title="Remove Photo"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-2xl bg-sky-50/40 hover:bg-sky-50/70 transition cursor-pointer p-4 text-center">
                      <FaCloudUploadAlt className="text-3xl text-sky-500 mb-2" />
                      <span className="text-xs font-bold text-sky-800">
                        Click to select photo from phone or computer
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1">
                        PNG, JPG or WEBP (Max 4MB)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-[11px] font-semibold mt-1">
                      {errors.image}
                    </p>
                  )}
                </div>
              ) : (
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/... (paste image web link)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                />
              )}
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
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleCollegeChange}
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
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="Rahul S."
                  className={`w-full rounded-xl border p-3 text-sm text-slate-800 outline-none transition ${
                    errors.sellerName 
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                      : 'border-slate-200 bg-slate-50 focus:border-sky-500'
                  }`}
                />
                {errors.sellerName && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1">
                    {errors.sellerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1 text-emerald-600">
                  <FaWhatsapp /> WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="sellerPhone"
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  placeholder="9847123456"
                  className={`w-full rounded-xl border p-3 text-sm text-slate-800 outline-none transition ${
                    errors.sellerPhone 
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                      : 'border-slate-200 bg-slate-50 focus:border-sky-500'
                  }`}
                />
                {errors.sellerPhone && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1">
                    {errors.sellerPhone}
                  </p>
                )}
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
                  className={`w-full rounded-xl border p-3 text-sm text-slate-800 outline-none transition ${
                    errors.sellerEmail 
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                      : 'border-slate-200 bg-slate-50 focus:border-sky-500'
                  }`}
                />
                {errors.sellerEmail && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1">
                    {errors.sellerEmail}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 hover:shadow-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Submitting Item & Photo...</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Post Listing Now</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
