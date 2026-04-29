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

  const userRole = (jwtDecode(localStorage.getItem("accessToken") ?? "") as Usuario).tipoUsuario

  if (!userRole) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
