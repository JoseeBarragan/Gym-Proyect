import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '../login/pages/login';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { AdminLayout } from '../admin/layout/AdminLayout';
import { DashboardPage } from '../admin/pages/DashboardPage';
import { UsersAdminPage } from '../admin/pages/UsersAdminPage';
import { PlaceholderAdminPage } from '../admin/pages/PlaceholderAdminPage';

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
        <Route path="classes" element={<PlaceholderAdminPage title="Gestión de Clases" description="Administra horarios, asignación de instructores y cupos." />} />
        <Route path="memberships" element={<PlaceholderAdminPage title="Gestión de Membresías" description="Controla los tipos de membresías y el estado de cada cliente." />} />
        <Route path="payments" element={<PlaceholderAdminPage title="Gestión de Pagos" description="Visualiza ingresos, transacciones de Stripe y reembolsos." />} />
        <Route path="reservations" element={<PlaceholderAdminPage title="Gestión de Reservas" description="Ver y cancelar las reservas de las clases." />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
