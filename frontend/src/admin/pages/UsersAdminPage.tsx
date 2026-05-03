import { useState } from 'react';
import { UserList } from '../features/users/UserList';
import { UserFormModal } from '../features/users/UserFormModal';
import { useCreateUser, useUpdateUser } from '../features/users/useUsers';
import type { UserItem } from '../features/users/useUsers';
import { Plus } from 'lucide-react';
import "../admin.css"

export function UsersAdminPage() {
  const [editingUser, setEditingUser] = useState<UserItem | null | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false)

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const handleOpenModal = (user?: UserItem) => {
    setEditingUser(user ?? null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingUser(undefined);
    setOpenModal(false);
  };

  const handleSubmit = (data: UserItem | Partial<UserItem>, id: string) => {
    if (editingUser) {
      // Remover campos que no se pueden actualizar por PATCH como email si no queremos, o id.
      // El id es idUsuario o id.
      const { contrasena, ...restData } = data
      const partialData = contrasena !== "" ? { ...data as Partial<UserItem> } : { ...restData as Partial<UserItem>}
      updateUserMutation.mutate({ id, data: partialData }, {
        onSuccess: () => handleCloseModal()
      });
    } else {
      const userData = data as UserItem
      createUserMutation.mutate(userData, {
        onSuccess: () => handleCloseModal()
      });
    }
    handleCloseModal();
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
          Nuevo Instructor
        </button>
      </div>

      <UserList onEdit={handleOpenModal} />
      {openModal && (
        <UserFormModal 
          key={editingUser?.idUsuario ?? 'new'}
          isOpen={openModal}
          onClose={handleCloseModal} 
          onSubmit={handleSubmit} 
          user={editingUser} 
        />
      )}
    </div>
  );
}
