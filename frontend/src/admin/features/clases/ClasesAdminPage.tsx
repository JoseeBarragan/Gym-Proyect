import { useState } from 'react';
import type { FC } from 'react';
import { ClaseList } from './ClaseList';
import { ClaseFormModal } from './ClaseFormModal';
import type { ClaseItem } from './useClases';

const ClasesAdminPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claseToEdit, setClaseToEdit] = useState<ClaseItem | null>(null);

  const handleAdd = () => {
    setClaseToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (clase: ClaseItem) => {
    setClaseToEdit(clase);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1 className="admin-title">Gestión de Clases</h1>
        <button className="admin-btn admin-btn-primary" onClick={handleAdd}>
          Nueva Clase
        </button>
      </div>

      <div className="admin-card">
        <ClaseList onEdit={handleEdit} />
      </div>

      <ClaseFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        claseToEdit={claseToEdit} 
      />
    </div>
  );
};

export default ClasesAdminPage;
