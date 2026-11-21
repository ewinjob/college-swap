import axios from 'axios';

// Base URL points to local Express server (port 5000) or deployed backend URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request Interceptor: Automatically injects JWT Bearer Token if student is logged in
axiosInstance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles standard HTTP error codes
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.response) {
      const status = err.response.status;
      console.log('HTTP Status:', status);
      console.log('Server Error Data:', err.response.data);

      if (status === 401) {
        console.log('🔒 JWT Unauthorized / Token expired.');
      } else if (status === 404) {
        console.log('API endpoint not found');
      } else if (status === 406) {
        console.log('Duplicate entry or validation error');
      } else if (status === 500) {
        console.log('Internal Server Error');
      }
    } else if (err.request) {
      console.log('No response received from backend server. Is the server running on port 5000?');
    } else {
      console.log('Axios error message:', err.message);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
