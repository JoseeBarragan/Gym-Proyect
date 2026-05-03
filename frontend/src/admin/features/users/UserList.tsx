import { useMemo, useState } from 'react';
import { useUsers, useDeleteUser } from './useUsers';
import type { UserItem } from './useUsers';
import { Mail, Shield, User, Trash2, Edit2 } from 'lucide-react';

interface UserListProps {
  onEdit?: (user: UserItem) => void;
}

export function UserList({ onEdit }: UserListProps) {
  const { data: users, isLoading, isError } = useUsers();
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const deleteMutation = useDeleteUser();
  
  const orderUsers = useMemo(() => {
    if (!users) return [];
    return [...users].sort((a, b) => {
      if (a.nombre && b.nombre) {
        return a.nombre.localeCompare(b.nombre);
      }
      return 0;
    });
  }, [users])

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Cargando usuarios...</div>;
  if (isError) return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>Error al cargar usuarios.</div>;


  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
    setUserToDelete(null)
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setUserToDelete(null);
    }
  };

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
          {orderUsers.map((user: UserItem) => (
            <tr key={user.idUsuario}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: '#1e3a8a', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                  <span style={{ fontWeight: 500, color: '#f8fafc' }}>
                    { user.nombre } { user.apellido }
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
                  <Shield size={14} color={(user.tipoUsuario) === 'Administrador' ? '#818cf8' : '#94a3b8'} />
                  <span className={`role-badge ${(user.tipoUsuario) === 'Administrador' ? 'role-admin' : 'role-user'}`}>
                    {user.tipoUsuario}
                  </span>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button className="action-btn" onClick={() => onEdit && onEdit(user)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Edit2 size={14} /> Editar
                  </button>
                  <button className="action-btn" onClick={() => setUserToDelete(user)} style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
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
      {userToDelete && (
        <div className="admin-modal-overlay" onClick={handleOverlayClick}>
          <div className="admin-modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>¿Eliminar Usuario?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              ¿Estás seguro de que deseas eliminar permanentemente al usuario <strong>{userToDelete.email}</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button 
                className="admin-btn admin-btn-secondary" 
                onClick={() => setUserToDelete(null)}
              >
                Cancelar
              </button>
              <button 
                className="admin-btn admin-btn-danger" 
                onClick={() => handleDelete(userToDelete.idUsuario)}
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
