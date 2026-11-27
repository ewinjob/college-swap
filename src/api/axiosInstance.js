import axios from 'axios';

// In development: Vite proxy forwards /api/* → http://localhost:5000/api/*  (no CORS)
// In production:  set VITE_BACKEND_URL to your deployed backend URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor: attach JWT token automatically ──────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: surface backend error messages clearly ─────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      // Server replied with an error status (4xx / 5xx)
      console.error(`[API ${err.response.status}]`, err.response.data?.error || err.message);
    } else if (err.request) {
      // Request made but no response — server is probably down
      console.error('[API] No response from server. Is the backend running on port 5000?');
    } else {
      console.error('[API] Request error:', err.message);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
