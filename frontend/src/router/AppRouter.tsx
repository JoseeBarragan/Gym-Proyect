import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '../login/pages/login';
import AdminPage from '../admin/pages/AdminPage';
import { RequireAdmin } from '../auth/RequireAdmin';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
