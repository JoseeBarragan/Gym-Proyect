import { FC } from 'react';
import { useClaseReservas } from './useReservas';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idClase: string | null;
  claseNombre?: string;
}

export const ReservasModal: FC<Props> = ({ isOpen, onClose, idClase, claseNombre }) => {
  const { data: reservas, isLoading, isError } = useClaseReservas(idClase);

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content" style={{ maxWidth: '600px' }}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Reservas - {claseNombre}</h2>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        
        {isLoading && <p>Cargando reservas...</p>}
        {isError && <p style={{ color: 'var(--danger-color)' }}>Error al cargar reservas. (403 si no eres admin)</p>}
        {reservas && reservas.length === 0 && <p>No hay reservas activas para esta clase.</p>}
        
        {reservas && reservas.length > 0 && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Socio (ID)</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(res => (
                  <tr key={res.idReserva}>
                    <td>{res.idSocio}</td>
                    <td>{new Date(res.fechaReserva).toLocaleDateString()}</td>
                    <td>
                      <span className="admin-badge" style={{ backgroundColor: 'var(--primary-color)' }}>
                        {res.estadoReserva}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="admin-modal-footer">
          <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
