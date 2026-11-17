import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowLeft,
  FaShareAlt
} from 'react-icons/fa';
import { getWhatsAppLink, getMailtoLink } from '../utils/contactSeller';
import { formatCurrency } from '../utils/formatCurrency';

// Sample product for display / preview
const SAMPLE_PRODUCT = {
  id: '1',
  title: 'Omega Mini Drafter with Board Clips + Protective Carrying Case',
  price: 380,
  originalPrice: 850,
  isFree: false,
  isSwap: false,
  category: 'Drawing Tools',
  college: 'Govt. Model Engineering College (MEC), Kochi',
  condition: 'Like New (Used for 1 semester only)',
  image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
  description: 'Original Omega mini drafter in flawless condition. Both scale arms are completely intact with no cracks or markings. Used gently during KTU S1/S2 Engineering Graphics at MEC. Comes with original protective canvas carry bag and 4 stainless steel drafting board clips.',
  sellerName: 'Arjun S. Kumar',
  sellerDepartment: 'B.Tech Mechanical Engineering, S5',
  sellerPhone: '9847123456',
  sellerEmail: 'arjun.mec@gmail.com',
  meetupLocation: 'MEC Canteen or Library steps (Any working day 1 PM - 4:30 PM)',
  postedDate: '17 Nov 2026',
  views: 42
};

export default function ProductDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // In production, fetch item by id using allAPI; fallback to sample
  const product = SAMPLE_PRODUCT;

  const whatsappUrl = getWhatsAppLink(product.sellerPhone, product.title, product.college);
  const emailUrl = getMailtoLink(product.sellerEmail, product.title, product.college);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 font-semibold text-sky-700 hover:text-sky-800 transition"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to All Listings</span>
        </Link>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs transition"
        >
          <FaShareAlt className="text-xs" />
          <span>{copied ? 'Link Copied!' : 'Share Listing'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md shadow-sky-500/5">
            <div className="relative aspect-4/3 w-full bg-slate-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-slate-900/85 px-3.5 py-1.5 text-sm font-bold text-white shadow-md">
                  {formatCurrency(product.price, product.isFree, product.isSwap)}
                </span>
              </div>
            </div>
          </div>

          {/* Campus Meetup Note Card */}
          <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
            <h4 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1">
              <span>📍</span> Suggested Campus Meetup Spot:
            </h4>
            <p className="text-xs text-sky-800 leading-relaxed">
              {product.meetupLocation}
            </p>
          </div>
        </div>

        {/* Right Column: Item Information & Seller Action */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Specs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800 border border-sky-200">
                {product.category}
              </span>
              <span className="text-xs text-slate-400">
                Posted {product.postedDate}
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-black text-slate-900">
                {formatCurrency(product.price, product.isFree, product.isSwap)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* College & Condition */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <FaMapMarkerAlt className="text-sky-500 shrink-0" />
                <span className="font-semibold">{product.college}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <FaCheckCircle className="text-sky-500 shrink-0" />
                <span>Condition: <strong>{product.condition}</strong></span>
              </div>
            </div>

            {/* Primary Action: Direct WhatsApp Connect */}
            <div className="pt-4 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg transition duration-200"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat with Seller on WhatsApp</span>
              </a>

              <a
                href={emailUrl}
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 text-slate-700 font-bold py-3 px-4 text-xs transition"
              >
                <FaEnvelope className="text-slate-500" />
                <span>Send Email Inquiry</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              No middleman fee • Direct student-to-student peer deal
            </p>

          </div>

          {/* Seller Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Seller Profile
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-linear-to-tr from-sky-500 to-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-sky-500/20">
                {product.sellerName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  {product.sellerName}
                  <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    Verified Student
                  </span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {product.sellerDepartment}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Item Description
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Safety Tips */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <FaShieldAlt className="text-sky-600" />
              <span>Campus Trading Safety Advice</span>
            </div>
            <p>
              Meet during college hours in daylight. Check the condition of the scales, drafter screw, or calculator screen before transferring money via Google Pay / Paytm / UPI.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
