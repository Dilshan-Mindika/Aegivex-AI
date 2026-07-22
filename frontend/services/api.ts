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

// Helper for local mock responses if backend is restarting or offline
export const handleApiCall = async <T>(apiPromise: Promise<T>, fallbackData: T): Promise<T> => {
  try {
    const response: any = await apiPromise;
    return response.data || response;
  } catch (error) {
    console.warn("Backend API unavailable or error occurred, operating with responsive engine fallback:", error);
    return fallbackData;
  }
};
