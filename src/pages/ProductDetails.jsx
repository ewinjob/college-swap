import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowLeft,
  FaShareAlt,
  FaExchangeAlt,
  FaTag,
  FaClock
} from 'react-icons/fa';
import { ALL_PRODUCTS } from '../utils/allProducts';
import { getWhatsAppLink, getMailtoLink } from '../utils/contactSeller';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from '../components/cards/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // Find the matching product from ALL_PRODUCTS by ID
  const product = ALL_PRODUCTS.find((p) => String(p.id) === String(id));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If product is not found
  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
        <div className="text-5xl">🔍</div>
        <h1 className="text-2xl font-black text-slate-900">Item Not Found</h1>
        <p className="text-sm text-slate-500">
          The listing with ID #{id} doesn&apos;t exist or has already been swapped by another student.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-blue-700 transition"
        >
          <FaArrowLeft />
          <span>Browse All Available Campus Items</span>
        </Link>
      </div>
    );
  }

  // Fallbacks for richer display if optional keys are omitted
  const sellerEmail = product.sellerEmail || `${product.sellerName?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'student'}@gmail.com`;
  const meetupLocation = product.meetupLocation || `${product.college} - Main College Canteen or Central Library steps`;
  const description = product.description || `Original ${product.title} in ${product.condition} condition. Well-maintained and used for campus studies. Ideal for semester coursework, exams, and lab sessions at ${product.college}. Available for direct pickup on campus.`;
  const originalPrice = product.originalPrice || (product.price > 0 ? Math.round(product.price * 1.8) : null);

  const whatsappUrl = getWhatsAppLink(product.sellerPhone, product.title, product.college);
  const emailUrl = getMailtoLink(sellerEmail, product.title, product.college);

  // Find other items from the same college or category (excluding current item)
  const relatedProducts = ALL_PRODUCTS.filter(
    (item) => String(item.id) !== String(product.id) && 
    (item.collegeId === product.collegeId || item.categoryId === product.categoryId)
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500 gap-3 border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-sky-600 font-semibold transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-sky-600 font-semibold transition">Listings</Link>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-150px sm:max-w-xs">{product.category}</span>
          <span>/</span>
          <span className="font-bold text-slate-900 truncate max-w-200px">{product.title}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs hover:border-sky-300 transition"
        >
          <FaShareAlt className="text-xs" />
          <span>{copied ? 'Link Copied!' : 'Share Listing'}</span>
        </button>
      </div>

      {/* 2. Main Product View Section (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Showcase & Meetup Badge */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md shadow-sky-500/5 relative">
            <div className="relative aspect-4/3 w-full bg-slate-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />

              {/* Price / Deal Overlay Badge */}
              <div className="absolute top-4 left-4">
                <span className={`rounded-full px-4 py-1.5 text-sm font-black shadow-lg backdrop-blur-md ${
                  product.isFree
                    ? 'bg-sky-500 text-white'
                    : product.isSwap
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-900/90 text-white'
                }`}>
                  {product.isSwap && <FaExchangeAlt className="inline mr-1.5 text-xs" />}
                  {formatCurrency(product.price, product.isFree, product.isSwap)}
                </span>
              </div>

              {/* Condition Badge */}
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md border border-slate-200">
                  ✨ {product.condition}
                </span>
              </div>
            </div>
          </div>

          {/* Campus Meetup Note Card */}
          <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 space-y-1.5">
            <h4 className="font-bold text-sky-950 text-sm flex items-center gap-2">
              <span className="text-base">📍</span> Suggested Campus Meetup Spot:
            </h4>
            <p className="text-xs text-sky-900 leading-relaxed font-medium">
              {meetupLocation}
            </p>
            <p className="text-[11px] text-sky-700/80 pt-1">
              • Agree with the seller on a convenient time between classes or during lunch break.
            </p>
          </div>

          {/* Campus Safety Tips */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <FaShieldAlt className="text-sky-600 text-sm" />
              <span>Campus Safety Guidelines</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px]">
              <li>Meet in daylight in busy campus zones (canteen, library porch, department lobby).</li>
              <li>Always inspect the item (screws on drafter, buttons on calculator) before paying.</li>
              <li>Pay using UPI (Google Pay, Paytm) or cash directly upon inspection.</li>
            </ul>
          </div>

        </div>

        {/* Right Column: Specs, Seller Info & Direct CTAs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Title, Price & Details */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
            
            {/* Category & Posted Date */}
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-full bg-sky-100 px-3 py-1 font-bold uppercase tracking-wider text-sky-800 border border-sky-200 text-[10px]">
                {product.category}
              </span>
              <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                <FaClock className="text-[10px]" />
                <span>Posted {product.postedTime || 'recently'}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 pt-1 border-b border-slate-100 pb-4">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {formatCurrency(product.price, product.isFree, product.isSwap)}
              </span>
              {originalPrice && !product.isFree && !product.isSwap && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{originalPrice}
                  </span>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    Save {Math.round(((originalPrice - product.price) / originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Campus & Key Specs Grid */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <FaMapMarkerAlt className="text-sky-500 shrink-0 text-sm" />
                <span className="font-bold">{product.college}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <FaTag className="text-sky-500 shrink-0 text-sm" />
                <span>Condition: <strong className="text-slate-900">{product.condition}</strong></span>
              </div>
            </div>

            {/* Primary Action: Direct WhatsApp Connect */}
            <div className="pt-2 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg transition duration-200"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat with {product.sellerName} on WhatsApp</span>
              </a>

              <a
                href={emailUrl}
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 text-slate-700 font-bold py-3 px-4 text-xs transition"
              >
                <FaEnvelope className="text-slate-500 text-sm" />
                <span>Send Email Inquiry</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              No middleman fee • Direct student-to-student deal
            </p>

          </div>

          {/* Seller Profile Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Student Seller Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-linear-to-tr from-sky-500 to-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
                {product.sellerName ? product.sellerName.charAt(0) : 'S'}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 flex-wrap">
                  <span>{product.sellerName}</span>
                  <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    Verified Student
                  </span>
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {product.college}
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  📞 +91 {product.sellerPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Item Description Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Item Description & Notes
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

        </div>

      </div>

      {/* 3. Related / More Items Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                More Items You Might Like
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Similar items and other listings from {product.college}.
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
