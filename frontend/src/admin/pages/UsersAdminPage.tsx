import { UserList } from '../features/users/UserList';
import { Plus } from 'lucide-react';

export function UsersAdminPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="admin-card admin-header-flex">
        <div>
          <h1 className="admin-page-title">Gestión de Usuarios</h1>
          <p className="admin-page-subtitle">Administra los usuarios registrados en el sistema.</p>
        </div>
        <button className="admin-btn-primary">
          <Plus size={18} />
          Nuevo Usuario
        </button>
      </div>

      <UserList />
    </div>
  );
}
