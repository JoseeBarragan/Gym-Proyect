import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from './auth.types';
import { jwtDecode } from 'jwt-decode';

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: UserRole;
}) {
  const location = useLocation();

  const token = localStorage.getItem('accessToken');
  let userRole: UserRole | null = null;
  try {
    if (token) {
      userRole = (jwtDecode<Usuario>(token).tipoUsuario as UserRole) ?? null;
    }
  } catch {
    userRole = null;
  }

  if (!userRole) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
