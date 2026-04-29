import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '../login/pages/login';
import AdminPage from '../admin/pages/AdminPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="Administrador">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
