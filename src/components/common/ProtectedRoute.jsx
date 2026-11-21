import { useEffect } from 'react';
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { FaLock, FaGraduationCap, FaArrowRight, FaSearch } from 'react-icons/fa';
import { showLoginRequiredAlert } from '../../utils/alerts';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Trigger pretty alert automatically if visited unauthenticated
      showLoginRequiredAlert(navigate);
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl border border-sky-100 p-8 sm:p-10 text-center shadow-xl shadow-sky-500/10 space-y-6">
          
          <div className="relative mx-auto h-20 w-20 rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-sky-500/25">
            <FaGraduationCap />
            <span className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-md">
              <FaLock />
            </span>
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold text-sky-800 border border-sky-200">
              Campus Security Gate
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to Post on Campus
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Only verified students at Kerala engineering & arts colleges can list items for sell or swap. Please log in or use Google to continue.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              to={`/auth?redirect=${encodeURIComponent(location.pathname)}`}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 transition"
            >
              <span>Sign In or Continue with Google</span>
              <FaArrowRight className="text-xs" />
            </Link>

            <Link
              to="/products"
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 py-3 px-4 text-xs font-bold text-slate-700 transition"
            >
              <FaSearch className="text-xs" />
              <span>Browse Campus Catalog First</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">
              🌴 CollegeSwap Kerala • Safe student-to-student transactions
            </p>
          </div>

        </div>
      </div>
    );
  }

  return children;
}
