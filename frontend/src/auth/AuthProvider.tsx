import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { jwtDecode } from 'jwt-decode';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000';
const ACCESS_TOKEN_KEY = 'accessToken';

type LoginResponse = { token: string };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;

    try {
      return jwtDecode<Usuario>(token);
    } catch {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      return null;
    }
  });

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      login: async ({ email, password }: { email: string; password: string }) => {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contrasena: password }),
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Credenciales inválidas');
        }

        const data = (await res.json()) as LoginResponse;
        localStorage.setItem(ACCESS_TOKEN_KEY, data.token);

        const decoded = jwtDecode<Usuario>(data.token);
        setUser(decoded);
        return decoded;
      },
      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
          localStorage.removeItem(ACCESS_TOKEN_KEY);

        } finally {
          setUser(null);
        }
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
