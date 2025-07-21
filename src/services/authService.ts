import api from './api';
import type { LoginData, SignUpData, AuthResponse } from './types/auth';
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('auth/login/', data);
  return response.data;
};

export const signup = async (data: SignUpData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('auth/signup/', data);
  return response.data;
};
