/**
 * useAuth — convenience hook wrapping the Zustand auth store.
 * login()  → sets tokens in store + sets cookie presence flag for middleware
 * logout() → clears store + removes cookie presence flag
 */
'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/api/auth.api';
import type { LoginRequest } from '@/types/auth.types';
import { AxiosError } from 'axios';

// ─── Cookie helpers (client-side) ─────────────────────────────────────────────
const AUTH_COOKIE = 'auth_token_presence';

function setAuthCookie() {
  // Expires in 7 days; SameSite=Lax is sufficient for this presence flag
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${AUTH_COOKIE}=1; path=/; expires=${expires}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const router = useRouter();
  const store = useAuthStore();

  const login = async (payload: LoginRequest) => {
    useAuthStore.setState({ isLoading: true });
    try {
      const res = await authApi.login(payload);

      if (res.success) {
        store.setTokens(res.data.token, res.data.refreshToken);
        store.setUser(res.data.user);
        setAuthCookie(); // let middleware know the user is authenticated
        toast.success(`Welcome back, ${res.data.user.firstName}!`);
        router.push('/dashboard');
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message =
        axiosErr.response?.data?.message ?? 'Invalid credentials. Please try again.';
      toast.error(message);
    } finally {
      useAuthStore.setState({ isLoading: false });
    }
  };

  const logout = async () => {
    useAuthStore.setState({ isLoading: true });
    try {
      await authApi.logout();
    } catch {
      // swallow — always clear local state
    } finally {
      store.clearAuth();
      clearAuthCookie();
      useAuthStore.setState({ isLoading: false });
      toast.success('You have been signed out.');
      router.push('/login');
    }
  };

  return {
    user: store.user,
    token: store.token,
    isLoading: store.isLoading,
    isAuthenticated: !!store.token,
    isHydrated: store.isHydrated,
    error: store.error,
    login,
    logout,
    fetchMe: store.fetchMe,
  };
}
