import axiosService from '../api/axiosService';

// ==========================================
// 1. PRODUCT APIs
// ==========================================

// Add / Upload a new swap item with photo (Protected by JWT)
export const addProductAPI = async (reqBody) => {
  return await axiosService('POST', '/api/products', reqBody, {
    'Content-Type': 'application/json'
  });
};

// Get all swap items with optional search & college query params (Public)
export const getAllProductsAPI = async (search = '', college = 'all') => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append('search', search);
  if (college && college !== 'all') queryParams.append('college', college);

  const url = queryParams.toString() ? `/api/products?${queryParams.toString()}` : '/api/products';
  return await axiosService('GET', url, '', {});
};

// Get single product details by MongoDB _id (Public)
export const getProductByIdAPI = async (id) => {
  return await axiosService('GET', `/api/products/${id}`, '', {});
};

// Get current logged-in student's own uploaded listings (Protected by JWT)
export const getUserProductsAPI = async () => {
  return await axiosService('GET', '/api/user-products', '', {});
};

// Delete a product by id (Protected by JWT / Admin action)
export const deleteProductAPI = async (id) => {
  return await axiosService('DELETE', `/api/products/${id}`, {}, {});
};


// ==========================================
// 2. USER AUTHENTICATION & PROFILE APIs
// ==========================================

// Register student (Returns user profile + JWT token)
export const registerAPI = async (reqBody) => {
  return await axiosService('POST', '/api/register', reqBody, {
    'Content-Type': 'application/json'
  });
};

// Login student (Returns user profile + JWT token)
export const loginAPI = async (reqBody) => {
  return await axiosService('POST', '/api/login', reqBody, {
    'Content-Type': 'application/json'
  });
};

// Google OAuth Login with Profile Picture
export const googleLoginAPI = async (reqBody) => {
  return await axiosService('POST', '/api/google-login', reqBody, {
    'Content-Type': 'application/json'
  });
};

// Get authenticated student profile (Protected by JWT)
export const getProfileAPI = async () => {
  return await axiosService('GET', '/api/profile', '', {});
};

// Get all students (Admin portal)
export const getAllUsersAPI = async () => {
  return await axiosService('GET', '/api/users', '', {});
};
