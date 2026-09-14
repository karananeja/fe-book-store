import { createContext, useMemo, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  setAuthStorage,
} from '@/services/api-client';
import { getMe, loginUser, registerUser } from '@/services/auth-connect';
import { AuthUser } from '@/utils/types';

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(
    () => getStoredUser() as AuthUser | null
  );
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [isLoading, setIsLoading] = useState<boolean>(!!getStoredToken());

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    getMe()
      .then((res) => {
        if (!cancelled) {
          setUser(res.info);
          setAuthStorage(token, res.info);
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearAuthStorage();
          setUser(null);
          setToken(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser({ email, password });
    setAuthStorage(res.info.token, res.info.user);
    setToken(res.info.token);
    setUser(res.info.user);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await registerUser({ name, email, password });
      setAuthStorage(res.info.token, res.info.user);
      setToken(res.info.token);
      setUser(res.info.user);
    },
    []
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
    }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
