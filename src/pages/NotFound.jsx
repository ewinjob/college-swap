import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
      <div className="h-16 w-16 rounded-3xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl shadow-sm">
        <FaGraduationCap />
      </div>
      <span className="text-6xl font-black text-slate-900">404</span>
      <h1 className="text-2xl font-bold text-slate-800">Campus Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-sm">
        The item or page you are looking for has either been swapped or removed.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:from-sky-600 hover:to-blue-700 transition shadow-md shadow-sky-500/20"
      >
        Back to Campus Home
      </Link>
    </div>
  );
}
