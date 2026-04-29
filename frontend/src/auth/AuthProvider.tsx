import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './auth.context';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      login: async ({ email, password }: { email: string; password: string }) => {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contrasena: password }),
        });

        if (!res.ok) {
          throw new Error('Credenciales inválidas');
        }

        localStorage.setItem("accessToken", JSON.stringify(await res.json()));

        return ;
      },
      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
          localStorage.removeItem("accessToken");

        } finally {
          setUser(null);
        }
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
