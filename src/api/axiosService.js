import axiosInstance from './axiosInstance';

const axiosService = {
  get: (url, params) => axiosInstance.get(url, params ? { params } : undefined),
  post: (url, body, headers) => axiosInstance.post(url, body, headers ? { headers } : undefined),
  put: (url, body, headers) => axiosInstance.put(url, body, headers ? { headers } : undefined),
  patch: (url, body, headers) => axiosInstance.patch(url, body, headers ? { headers } : undefined),
  delete: (url) => axiosInstance.delete(url),
};

export default axiosService;
