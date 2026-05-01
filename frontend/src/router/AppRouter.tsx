import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '../login/pages/login';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { AdminLayout } from '../admin/layout/AdminLayout';
import { DashboardPage } from '../admin/pages/DashboardPage';
import { UsersAdminPage } from '../admin/pages/UsersAdminPage';
import { ClasesAdminPage } from '../admin/pages/ClasesAdminPage';
import MembresiasAdminPage from '../admin/features/membresias/MembresiasAdminPage';
import PagosAdminPage from '../admin/features/pagos/PagosAdminPage';
import ReservasAdminPage from '../admin/features/reservas/ReservasAdminPage';
import SettingsAdminPage from '../admin/pages/SettingsAdminPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="Administrador">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersAdminPage />} />
        <Route path="classes" element={<ClasesAdminPage />} />
        <Route path="memberships" element={<MembresiasAdminPage />} />
        <Route path="payments" element={<PagosAdminPage />} />
        <Route path="reservations" element={<ReservasAdminPage />} />
        <Route path="settings" element={<SettingsAdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
