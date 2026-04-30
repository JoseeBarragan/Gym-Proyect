import { useUsers, UserItem } from './useUsers';
import { Mail, Shield, User } from 'lucide-react';

export function UserList() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Cargando usuarios...</div>;
  if (isError) return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>Error al cargar usuarios.</div>;

  return (
    <div className="admin-card admin-table-container" style={{ padding: 0 }}>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: UserItem) => (
            <tr key={user.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: '#1e3a8a', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                  <span style={{ fontWeight: 500, color: '#f8fafc' }}>
                    {user.name || user.nombre || 'Sin nombre'} {user.apellido || ''}
                  </span>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                  <Mail size={14} />
                  <span style={{ fontSize: '0.875rem' }}>{user.email}</span>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={14} color={(user.role || user.tipoUsuario) === 'Administrador' ? '#818cf8' : '#94a3b8'} />
                  <span className={`role-badge ${(user.role || user.tipoUsuario) === 'Administrador' ? 'role-admin' : 'role-user'}`}>
                    {user.role || user.tipoUsuario || 'Socio'}
                  </span>
                </div>
              </td>
              <td>
                <button className="action-btn">
                  Editar
                </button>
              </td>
            </tr>
          ))}
          {(!users || users.length === 0) && (
            <tr>
              <td colSpan={4} className="admin-table-empty">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
