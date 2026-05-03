import { useState } from 'react';
import type { FC } from 'react';
import { useClases } from './useClases';
import type { ClaseItem } from './useClases';
import { Trash2, Edit } from 'lucide-react';

interface Props {
  onEdit: (clase: ClaseItem) => void;
}

export const ClaseList: FC<Props> = ({ onEdit }) => {
  const { data: clases, isLoading, isError, removeClase } = useClases();
  
  // Delete Modal State
  const [claseToDelete, setClaseToDelete] = useState<ClaseItem | null>(null);

  if (isLoading) return <p>Cargando clases...</p>;
  if (isError) return <p style={{ color: 'var(--danger-color)' }}>Error al cargar clases.</p>;

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Instructor ID</th>
            <th>Descripción</th>
            <th>Día / Horario</th>
            <th>Cupo / Duración</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases?.map(clase => (
            <tr key={clase.idClase}>
              <td>{clase.nombre}</td>
              <td>{clase.idInstructor.substring(0, 8)}...</td>
              <td>{clase.descripcion}</td>
              <td>{clase.dia} - {clase.horario}</td>
              <td>{clase.cupo} cupos / {clase.duracionMinutos} min.</td>
              <td>
                <span 
                  className="admin-badge" 
                  style={{ backgroundColor: clase.activa ? 'var(--success-color)' : 'var(--danger-color)' }}
                >
                  {clase.activa ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button 
                    className="admin-btn admin-btn-primary" 
                    onClick={() => onEdit(clase)}
                    title="Editar"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Edit size={16} /> Editar
                  </button>
                  <button 
                    className="admin-btn admin-btn-danger" 
                    onClick={() => setClaseToDelete(clase)}
                    title="Eliminar"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {claseToDelete && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>¿Eliminar Clase?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              ¿Estás seguro de que deseas eliminar permanentemente la clase <strong>{claseToDelete.nombre}</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button 
                className="admin-btn admin-btn-secondary" 
                onClick={() => setClaseToDelete(null)}
              >
                Cancelar
              </button>
              <button 
                className="admin-btn admin-btn-danger" 
                onClick={() => {
                  removeClase.mutate(claseToDelete.idClase);
                  setClaseToDelete(null);
                }}
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
