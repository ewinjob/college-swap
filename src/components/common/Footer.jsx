import { Link } from 'react-router-dom';
import { FaGraduationCap, FaWhatsapp, FaInstagram, FaHeart, FaShieldAlt, FaLock } from 'react-icons/fa';
import { KERALA_COLLEGES } from '../../constants/colleges';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-slate-200">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20">
                <FaGraduationCap className="text-lg" />
              </span>
               <div className="font-bold text-xl tracking-tight text-slate-900 leading-none">
               Campus<span className="text-sky-500">Swap</span>
             </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kerala&apos;s dedicated student marketplace. Buy, sell, and swap college textbooks, KTU tools, calculators, and hostel essentials directly with batch-mates on campus.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition"
                title="Join Student WhatsApp Community"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition"
                title="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Popular Swap Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=drawing-tools" className="hover:text-sky-600 transition">
                  📐 Mini Drafter & Drawing Boards
                </Link>
              </li>
              <li>
                <Link to="/products?category=calculators" className="hover:text-sky-600 transition">
                  🧮 Casio fx-991EX / CW Calculators
                </Link>
              </li>
              <li>
                <Link to="/products?category=books" className="hover:text-sky-600 transition">
                  📚 KTU Textbooks & Solved Papers
                </Link>
              </li>
              <li>
                <Link to="/products?category=lab-uniform" className="hover:text-sky-600 transition">
                  🥼 Lab Coats & Workshop Aprons
                </Link>
              </li>
              <li>
                <Link to="/products?category=hostel" className="hover:text-sky-600 transition">
                  🛏️ Hostel Kettles, Lamps & Fans
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Kerala Campuses */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Featured Campuses</h4>
            <ul className="space-y-2.5 text-sm">
              {KERALA_COLLEGES.slice(1, 6).map((c) => (
                <li key={c.id}>
                  <Link to={`/products?college=${c.id}`} className="hover:text-sky-600 transition flex items-center gap-1.5">
                    <span>📍</span>
                    <span className="truncate">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Safety & Trust */}
          <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100">
            <div className="flex items-center gap-2 font-bold text-sky-950 text-sm mb-2">
              <FaShieldAlt className="text-sky-600" />
              <span>Safe Campus Trading</span>
            </div>
            <p className="text-xs text-sky-800 leading-relaxed mb-3">
              Always meet in busy campus spots like the College Canteen, Central Library porch, or Department Lobby. Inspect items before paying via UPI.
            </p>
            <div className="text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-1.5 rounded-lg border border-sky-200">
              ✨ 100% Free • No Commission
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} camswapus Kerala. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="flex items-center gap-1 text-slate-400 hover:text-sky-600 transition"
              title="Admin & Ghost Dashboard"
            >
              <FaLock className="text-[10px]" />
              <span>Admin Portal</span>
            </Link>
            <span className="text-slate-300">•</span>
            <p className="flex items-center gap-1">
              Built with <FaHeart className="text-sky-500 text-xs" /> for students across Kerala.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
