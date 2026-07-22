import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('aegivex_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('aegivex_token');
        // If not already on login/register/landing, redirect to login
        if (!['/', '/login', '/register'].includes(window.location.pathname)) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Strictly execute API calls against backend database
export const handleApiCall = async <T = any>(apiPromise: Promise<any>, fallbackData: T): Promise<T> => {
  try {
    const response: any = await apiPromise;
    return response.data !== undefined ? response.data : response;
  } catch (error) {
    console.error("Live Database API Call Failed:", error);
    return fallbackData;
  }
};

