import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FaGhost, 
  FaBoxOpen, 
  FaUsers, 
  FaExclamationTriangle, 
  FaChartPie, 
  FaArrowLeft,
  FaPlus
} from 'react-icons/fa';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/ghost', icon: FaChartPie },
    { label: 'Manage Products', path: '/ghost/products', icon: FaBoxOpen },
    { label: 'Registered Students', path: '/ghost/users', icon: FaUsers },
    { label: 'Reports / Flags', path: '/ghost/reports', icon: FaExclamationTriangle }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3 px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-500/30 text-lg">
              <FaGhost />
            </span>
            <div>
              <h2 className="font-black text-base tracking-tight text-white flex items-center gap-1.5">
                Campus<span className="text-sky-400">Swap</span>
              </h2>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                Ghost Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Return to live website */}
        <div className="pt-6 border-t border-slate-800/80">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <FaArrowLeft className="text-xs" />
            <span>Return to Live Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">Kerala Campus Node Active</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/add-product"
              className="flex items-center gap-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition"
            >
              <FaPlus className="text-[10px]" />
              <span>Upload Swap Item</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-sky-950 border border-sky-500 text-sky-200 text-xs font-bold flex items-center justify-center">
              👻
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 md:p-8 bg-slate-900">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
