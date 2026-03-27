/**
 * Axios API client with request/response interceptors.
 * Automatically injects Authorization header from stored token.
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
  : 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});


// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only runs client-side; SSR callers should pass tokens explicitly.
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Token is invalid/expired. Clear persistent auth state
        useAuthStore.getState().clearAuth();
        
        // Show a helpful message
        toast.error('Session expired. Please log in again.', { id: 'session-expired-toast' });
        
        // Redirect
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } else if (error.response?.status && error.response.status >= 500) {
      if (typeof window !== 'undefined') {
        toast.error('Server error. Please try again later.', { id: 'server-error-toast' });
      }
    } else if (error.code === 'ERR_NETWORK') {
      if (typeof window !== 'undefined') {
        toast.error('Network error. Check your connection.', { id: 'network-error-toast' });
      }
    }
    
    return Promise.reject(error);
  },
);

export default apiClient;
