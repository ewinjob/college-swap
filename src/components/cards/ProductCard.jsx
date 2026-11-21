import { Link } from 'react-router-dom';
import { FaWhatsapp, FaMapMarkerAlt, FaExchangeAlt } from 'react-icons/fa';
import { getWhatsAppLink } from '../../utils/contactSeller';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ProductCard({ product }) {
  const {
    title = '',
    price = 0,
    isFree = false,
    isSwap = false,
    category = '',
    college = '',
    condition = '',
    image = '',
    sellerName = '',
    sellerPhone = '',
    postedTime = ''
  } = product || {};

  const productId = product?._id || product?.id || '1';
  const whatsappUrl = getWhatsAppLink(sellerPhone, title, college);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 overflow-hidden">
      
      {/* Image Container */}
      <Link to={`/products/${productId}`} className="relative block aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-md ${
            isFree 
              ? 'bg-sky-500 text-white' 
              : isSwap 
              ? 'bg-amber-500 text-white' 
              : 'bg-slate-900/85 text-white'
          }`}>
            {isSwap && <FaExchangeAlt className="inline mr-1 text-[10px]" />}
            {formatCurrency(price, isFree, isSwap)}
          </span>
        </div>

        {/* Condition Badge */}
        {condition && (
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-xs backdrop-blur-md border border-slate-100">
              {condition}
            </span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        
        {/* Category & College */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-bold uppercase tracking-wider text-sky-600 text-[10px]">
            {category}
          </span>
          <span className="text-[11px] text-slate-400">{postedTime}</span>
        </div>

        {/* Title */}
        <Link to={`/products/${productId}`} className="group-hover:text-sky-600 transition">
          <h3 className="line-clamp-2 font-bold text-slate-900 text-base leading-snug mb-2">
            {title}
          </h3>
        </Link>

        {/* College Location Tag */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4 bg-sky-50/50 rounded-lg p-2 border border-sky-100/60">
          <FaMapMarkerAlt className="shrink-0 text-sky-500 text-xs" />
          <span className="truncate font-medium">{college}</span>
        </div>

        {/* Card Footer: Seller info + WhatsApp Action Button */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
              {sellerName ? sellerName.charAt(0) : 'S'}
            </div>
            <span className="text-xs font-medium text-slate-700 truncate max-w-[90px]">
              {sellerName}
            </span>
          </div>

          {/* Quick WhatsApp Connect */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Chat directly on WhatsApp"
            className="flex items-center gap-1.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white px-3 py-1.5 text-xs font-bold border border-emerald-200 hover:border-emerald-600 shadow-xs transition duration-200"
          >
            <FaWhatsapp className="text-sm text-emerald-500 group-hover:text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
