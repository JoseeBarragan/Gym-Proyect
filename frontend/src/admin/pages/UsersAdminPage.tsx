import { useState } from 'react';
import { UserList } from '../features/users/UserList';
import { UserFormModal } from '../features/users/UserFormModal';
import { useCreateUser, useUpdateUser } from '../features/users/useUsers';
import type { UserItem } from '../features/users/useUsers';
import { Plus } from 'lucide-react';

export function UsersAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const handleOpenModal = (user?: UserItem) => {
    setEditingUser(user || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (data: any) => {
    if (editingUser) {
      // Remover campos que no se pueden actualizar por PATCH como email si no queremos, o id.
      // El id es idUsuario o id.
      const id = editingUser.id;
      updateUserMutation.mutate({ id, data: { nombre: data.nombre, apellido: data.apellido, telefono: data.telefono, email: data.email } }, {
        onSuccess: () => handleCloseModal()
      });
    } else {
      createUserMutation.mutate(data, {
        onSuccess: () => handleCloseModal()
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="admin-card admin-header-flex">
        <div>
          <h1 className="admin-page-title">Gestión de Usuarios</h1>
          <p className="admin-page-subtitle">Administra los usuarios registrados en el sistema.</p>
        </div>
        <button className="admin-btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Nuevo Usuario
        </button>
      </div>

      <UserList onEdit={handleOpenModal} />
      <UserFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        user={editingUser} 
      />
    </div>
  );
}
