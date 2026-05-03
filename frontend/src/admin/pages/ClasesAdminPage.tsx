import { useState } from 'react';
import { ClaseList } from '../features/clases/ClaseList';
import { ClaseFormModal } from '../features/clases/ClaseFormModal';
import { useClases } from '../features/clases/useClases';
import type { ClaseItem } from '../features/clases/useClases';
import { Plus } from 'lucide-react';

export function ClasesAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClase, setEditingClase] = useState<ClaseItem | null>(null);

  const {createClase, updateClase} = useClases();

  const handleOpenModal = (clase?: ClaseItem) => {
    setEditingClase(clase || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClase(null);
  };

  const handleSubmit = (data: ClaseItem | Partial<ClaseItem>) => {
    if (editingClase && editingClase.idClase) {
      const partialData = data as Partial<ClaseItem>;
      updateClase.mutate({...partialData, idClase: editingClase.idClase }, {
        onSuccess: () => handleCloseModal()
      });
    } else {
      const claseData = data as ClaseItem;
      createClase.mutate(claseData, {
        onSuccess: () => handleCloseModal()
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="admin-card admin-header-flex">
        <div>
          <h1 className="admin-page-title">Gestión de Clases</h1>
          <p className="admin-page-subtitle">Administra los horarios, instructores y disciplinas.</p>
        </div>
        <button className="admin-btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Nueva Clase
        </button>
      </div>

      <ClaseList onEdit={handleOpenModal} />
      <ClaseFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        claseToEdit={editingClase} 
        onSubmit={handleSubmit}
      />
    </div>
  );
}
