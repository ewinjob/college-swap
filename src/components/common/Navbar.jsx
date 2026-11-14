import { useState } from "react";
import { Link } from "react-router-dom";




export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
        aria-label="Main"
      >
        {/* Brand */}
        <a href="/" className="flex items-center  text-lg font-bold text-slate-900">
          <span className="grid h-8 w-12 place-items-center rounded-xl bg-blue-500 text-white">
            CAM
          </span>
          swa<span className="text-blue-500">PUS</span>
        </a>


        {/* Desktop actions */}
<div className="hidden items-center gap-3 md:flex">
  <div className="flex w-60 items-center space-x-2 rounded-full border border-gray-300 bg-white px-2 py-1 shadow-md transition-all duration-300 focus-within:w-72 focus-within:ring-2 focus-within:ring-blue-400">
    <input
      type="text"
      placeholder="Search..."
      className="grow bg-transparent text-gray-700 outline-none placeholder-gray-400"
    />
    <button
      type="button"
      className="rounded-full bg-blue-500 px-2 py-1 text-white transition hover:bg-blue-600"
    >
      <span>🔍</span>
    </button>
  </div>

  <Link
   to={'/auth'}
    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
  >
    Log in
  </Link>
</div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">

          

          <div className="flex gap-3 pt-2">
            <a
              href="/login"
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}