/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { AuthUser, UserRole } from './auth.types';
import { readStoredUser, writeStoredUser } from './auth.storage';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (params: { email: string; role: UserRole }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      login: ({ email, role }) => {
        const nextUser: AuthUser = { email, role };
        setUser(nextUser);
        writeStoredUser(nextUser);
      },
      logout: () => {
        setUser(null);
        writeStoredUser(null);
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
