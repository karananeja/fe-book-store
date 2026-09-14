import { AuthUser } from '@/utils/types';
import { apiGet, apiPost } from './api-client';

export type AuthResponse = {
  msg: string;
  info: { token: string; user: AuthUser };
};

export type MeResponse = {
  msg: string;
  info: AuthUser;
};

export const registerUser = (body: {
  name: string;
  email: string;
  password: string;
}) => apiPost('/auth/register', body) as Promise<AuthResponse>;

export const loginUser = (body: { email: string; password: string }) =>
  apiPost('/auth/login', body) as Promise<AuthResponse>;

export const getMe = () => apiGet('/auth/me') as Promise<MeResponse>;
