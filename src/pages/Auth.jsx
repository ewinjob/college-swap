import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaCheckCircle, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { KERALA_COLLEGES } from '../constants/colleges';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: 'cet',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth success
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-sky-500/10 space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 mb-1">
            <FaGraduationCap className="text-2xl" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back, Student!' : 'Join CampusSwap Kerala'}
          </h2>
          <p className="text-xs text-slate-500">
            {isLogin 
              ? 'Sign in to manage your listings and connect with buyers'
              : 'Sign up with your college to swap and sell items on campus'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`py-2 rounded-lg transition ${
              isLogin ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`py-2 rounded-lg transition ${
              !isLogin ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {!isLogin && (
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul S. Kumar"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                />
                <FaUser className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              College Email / Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu or gmail.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
              />
              <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Your Kerala College
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
              >
                {KERALA_COLLEGES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>📍 {c.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
              />
              <FaLock className="absolute left-3 top-3 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 transition"
          >
            {isLogin ? 'Sign In to CampusSwap' : 'Create Free Student Account'}
          </button>
        </form>

        {/* Benefits footer */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-sky-500 text-xs shrink-0" />
            <span>Connect directly on WhatsApp with zero middleman fee</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-sky-500 text-xs shrink-0" />
            <span>Campus-verified student community across Kerala</span>
          </div>
        </div>

      </div>
    </div>
  );
}
