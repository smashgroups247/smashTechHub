/**
 * Zustand auth store — single source of truth for authentication state.
 * Persists token + user to localStorage so the session survives page reloads.
 */
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/auth.types';
import { authApi } from '@/lib/api/auth.api';

// ─── State Shape ──────────────────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
  setHydrated: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isHydrated: false,
      error: null,

      setUser: (user) => set({ user }),

      setTokens: (token, refreshToken) => {
        // Mirror to plain localStorage so the Axios interceptor can read them
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_refresh_token', refreshToken);
        set({ token, refreshToken });
      },

      clearAuth: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'auth_token_presence=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
        localStorage.removeItem('auth_user');
        set({ user: null, token: null, refreshToken: null, error: null });
      },

      fetchMe: async () => {
        const { token } = get();
        if (!token) return;

        set({ isLoading: true, error: null });
        try {
          const res = await authApi.me();
          set({ user: res.data });
        } catch (error: any) {
          // Only clear auth on 401s (which the interceptor might have already done)
          // For other errors (500s, network), we keep tokens and set an error state
          if (error?.response?.status === 401) {
            get().clearAuth();
          } else {
            set({ error: 'Failed to fetch user data. Server might be down.' });
          }
          // We can optionally re-throw or handle here
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } catch {
          // Swallow errors — we still want to clear local state
        } finally {
          get().clearAuth();
          set({ isLoading: false });
        }
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
