/**
 * Auth API service layer
 * All auth-related HTTP calls live here — components never call apiClient directly.
 */
import apiClient from './client';
import type { LoginRequest, LoginResponse, MeResponse } from '@/types/auth.types';

export const authApi = {
  /** POST /auth/login */
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', payload);
    return data;
  },

  /** GET /auth/me — returns the currently authenticated user */
  me: async (): Promise<MeResponse> => {
    const { data } = await apiClient.get<MeResponse>('/auth/me');
    return data;
  },

  /** POST /auth/logout */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
