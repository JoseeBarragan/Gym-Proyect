import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '../home/pages/HomePage';
import LoginPage from '../login/pages/login';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { AdminLayout } from '../admin/layout/AdminLayout';
import { DashboardPage } from '../admin/pages/DashboardPage';
import { UsersAdminPage } from '../admin/pages/UsersAdminPage';
import { ClasesAdminPage } from '../admin/pages/ClasesAdminPage';
import PagosAdminPage from '../admin/features/pagos/PagosAdminPage';
import SettingsAdminPage from '../admin/pages/SettingsAdminPage';
import { InstructorLayout } from '../instructor/layout/InstructorLayout';
import { InstructorClassesPage } from '../instructor/pages/InstructorClassesPage';
import { InstructorStudentsPage } from '../instructor/pages/InstructorStudentsPage';
import { InstructorHistoryPage } from '../instructor/pages/InstructorHistoryPage';
import { SocioLayout, SocioClassesPage, SocioReservasPage, SocioMembresiasPage } from '../socio';
import { ProfilePage } from '../profile/pages/ProfilePage';
import { PaymentSuccessPage } from '../pages/payment/SuccessPage';
import { PaymentCancelPage } from '../pages/payment/CancelPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
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
        <Route path="payments" element={<PagosAdminPage />} />
        <Route path="settings" element={<SettingsAdminPage />} />
      </Route>
      <Route
        path="/instructor"
        element={
          <ProtectedRoute requiredRole="Instructor">
            <InstructorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstructorClassesPage />} />
        <Route path="students" element={<InstructorStudentsPage />} />
        <Route path="history" element={<InstructorHistoryPage />} />
      </Route>
      <Route
        path="/socio"
        element={
          <ProtectedRoute requiredRole="Socio">
            <SocioLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SocioClassesPage />} />
        <Route path="reservas" element={<SocioReservasPage />} />
        <Route path="membresias" element={<SocioMembresiasPage />} />
      </Route>
<Route
 path="/profile"
 element={
 <ProtectedRoute>
 <ProfilePage />
 </ProtectedRoute>
 }
 />
<Route path="/payment/success" element={<PaymentSuccessPage />} />
<Route path="/payment/cancel" element={<PaymentCancelPage />} />
<Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
