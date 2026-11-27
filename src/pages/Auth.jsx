import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  FaGraduationCap, FaCheckCircle, FaLock, FaEnvelope,
  FaUser, FaPhone, FaExclamationCircle
} from 'react-icons/fa';
import { KERALA_COLLEGES } from '../constants/colleges';
import { validateEmail, validatePassword, validatePhone } from '../utils/validators';
import { registerAPI, loginAPI, googleLoginAPI } from '../services/apiService';
import { showSuccessAlert, showErrorAlert, showToast } from '../utils/alerts';

// ─── Helper: save auth session after successful DB response ─────────────────
function saveSession(token, userData) {
  sessionStorage.setItem('token', token);
  localStorage.setItem('token', token);
  localStorage.setItem('currentUser', JSON.stringify(userData));
}

export default function Auth() {
  const [searchParams]  = useSearchParams();
  const redirectPath    = searchParams.get('redirect') || '/profile';
  const [isLogin, setIsLogin]           = useState(true);
  const [loading, setLoading]           = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors]             = useState({});
  const [serverMsg, setServerMsg]       = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:      '',
    email:     '',
    password:  '',
    college:   '',
    collegeId: '',
    phone:     ''
  });

  // ── Form field change ─────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setServerMsg('');
  };

  const handleCollegeChange = (e) => {
    const selected = KERALA_COLLEGES.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      collegeId: e.target.value,
      college:   selected ? selected.name : ''
    }));
  };

  // ── Client-side validation ────────────────────────────────────────────────
  const validateAuthForm = () => {
    const errs = {};
    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;

    const passErr = validatePassword(formData.password);
    if (passErr) errs.password = passErr;

    if (!isLogin) {
      if (!formData.name || formData.name.trim().length < 3)
        errs.name = 'Full name must be at least 3 characters.';

      const phoneErr = validatePhone(formData.phone);
      if (phoneErr) errs.phone = phoneErr;

      if (!formData.college) errs.college = 'Please select your Kerala college.';
    }
    return errs;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // 1. EMAIL / PASSWORD  — Register & Login  (saves to MongoDB)
  // ══════════════════════════════════════════════════════════════════════════
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAuthForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setServerMsg('');

    try {
      if (isLogin) {
        // ── LOGIN ────────────────────────────────────────────────────────
        const res = await loginAPI({ email: formData.email, password: formData.password });

        const { user, token } = res.data;
        saveSession(token, user);

        showToast(`Welcome back, ${user.name.split(' ')[0]}! 🎓`);
        navigate(redirectPath);

      } else {
        // ── REGISTER ─────────────────────────────────────────────────────
        const res = await registerAPI({
          name:      formData.name.trim(),
          email:     formData.email,
          password:  formData.password,
          college:   formData.college,
          collegeId: formData.collegeId,
          phone:     formData.phone
        });

        const { user, token } = res.data;
        saveSession(token, user);

        await showSuccessAlert(
          'Account Created! 🎓',
          `Welcome to CollegeSwap Kerala, ${user.name.split(' ')[0]}! Your account is now active.`
        );
        navigate(redirectPath);
      }

    } catch (err) {
      // Show the exact error message from the backend
      const msg =
        err?.response?.data?.error ||
        (err?.request
          ? '⚠️ Cannot reach server. Make sure the backend is running on port 5000.'
          : 'Something went wrong. Please try again.');

      setServerMsg(msg);
      showErrorAlert(isLogin ? 'Sign In Failed' : 'Registration Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // 2. GOOGLE OAUTH  — popup → real profile → saves to MongoDB
  // ══════════════════════════════════════════════════════════════════════════
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setServerMsg('');
      try {
        // Step 1: Fetch real Google profile with the access token
        const profileRes = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const { name, email, picture } = profileRes.data;

        // Step 2: Send to backend — creates user in MongoDB if new, or logs in
        const res = await googleLoginAPI({
          name,
          email,
          avatar:    picture,
          college:   '',
          collegeId: ''
        });

        const { user, token, isNewUser } = res.data;
        saveSession(token, user);

        if (isNewUser) {
          await showSuccessAlert(
            'Google Account Created! 🎓',
            `Welcome to CollegeSwap Kerala, ${user.name.split(' ')[0]}! Your profile has been saved.`
          );
        } else {
          showToast(`Welcome back, ${user.name.split(' ')[0]}! 🎓`);
        }

        navigate(redirectPath);

      } catch (err) {
        const msg =
          err?.response?.data?.error ||
          (err?.request
            ? '⚠️ Cannot reach server. Make sure the backend is running on port 5000.'
            : 'Could not complete Google sign-in. Please try again.');

        setServerMsg(msg);
        showErrorAlert('Google Sign-In Failed', msg);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: (err) => {
      console.error('Google OAuth popup error:', err);
      setGoogleLoading(false);
      showErrorAlert('Google Sign-In Cancelled', 'The Google sign-in popup was closed or blocked.');
    }
  });

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    googleLogin();
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-sky-500/10 space-y-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 mb-1">
            <FaGraduationCap className="text-2xl" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back, Student!' : 'Join CampusSwap Kerala'}
          </h2>
          <p className="text-xs text-slate-500">
            {isLogin
              ? 'Sign in to access your secure student dashboard'
              : 'Create your account — data is securely saved to our database'}
          </p>
        </div>

        {/* ── Google Button ───────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 shadow-xs transition duration-200 cursor-pointer disabled:opacity-70"
        >
          {googleLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google Student Account</span>
            </>
          )}
        </button>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Or with email
          </span>
          <div className="border-t border-slate-200 w-full" />
        </div>

        {/* ── Tab Switcher ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setErrors({}); setServerMsg(''); }}
            className={`py-2 rounded-lg transition cursor-pointer ${
              isLogin ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setErrors({}); setServerMsg(''); }}
            className={`py-2 rounded-lg transition cursor-pointer ${
              !isLogin ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* ── Server / Backend Error Message ───────────────────────────────── */}
        {serverMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
            <FaExclamationCircle className="shrink-0 mt-0.5" />
            <span>{serverMsg}</span>
          </div>
        )}

        {/* ── Form ────────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">

          {/* Full Name (Register only) */}
          {!isLogin && (
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul S. Kumar"
                  className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition ${
                    errors.name
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white'
                  }`}
                />
                <FaUser className="absolute left-3 top-3 text-slate-400" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu or gmail.com"
                className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition ${
                  errors.email
                    ? 'border-red-400 bg-red-50/30'
                    : 'border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white'
                }`}
              />
              <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                <FaExclamationCircle /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone + College (Register only) */}
          {!isLogin && (
            <>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Mobile (+91) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9847123456"
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition ${
                      errors.phone
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white'
                    }`}
                  />
                  <FaPhone className="absolute left-3 top-3 text-slate-400" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Your Kerala College *
                </label>
                <select
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleCollegeChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
                >
                  {KERALA_COLLEGES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>📍 {c.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition ${
                  errors.password
                    ? 'border-red-400 bg-red-50/30'
                    : 'border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white'
                }`}
              />
              <FaLock className="absolute left-3 top-3 text-slate-400" />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                <FaExclamationCircle /> {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700 transition cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </>
            ) : (
              <span>{isLogin ? 'Sign In to CampusSwap' : 'Create Free Student Account'}</span>
            )}
          </button>
        </form>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-sky-500 text-xs shrink-0" />
            <span>Passwords hashed with bcrypt — stored securely in MongoDB</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-sky-500 text-xs shrink-0" />
            <span>Google login auto-saves profile to database with JWT session</span>
          </div>
        </div>

      </div>
    </div>
  );
}
