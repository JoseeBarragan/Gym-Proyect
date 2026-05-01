import { FC, useState } from 'react';
import { useClaseReservas } from './useReservas';

const ReservasAdminPage: FC = () => {
  const [claseId, setClaseId] = useState('');
  const [searchId, setSearchId] = useState<string | null>(null);

  const { data: reservas, isLoading, isError } = useClaseReservas(searchId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchId(claseId.trim() || null);
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1 className="admin-title">Gestión de Reservas</h1>
      </div>

      <div className="admin-card">
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Ingresa el ID de una clase específica para ver sus reservas. (El backend actualmente solo provee listados por clase o socio individual).
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            className="admin-form-group" 
            style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="Introduce ID de la clase..." 
            value={claseId}
            onChange={e => setClaseId(e.target.value)}
          />
          <button type="submit" className="admin-btn admin-btn-primary">
            Buscar
          </button>
        </form>

        {isLoading && <p>Buscando...</p>}
        {isError && <p style={{ color: 'var(--danger-color)' }}>Error al buscar reservas para esa clase. ¿El ID es correcto?</p>}

        {reservas && (
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
                      <span className="admin-badge" style={{ backgroundColor: res.estadoReserva === 'Reservada' ? 'var(--primary-color)' : 'var(--danger-color)' }}>
                        {res.estadoReserva}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reservas.length === 0 && <p style={{ marginTop: '1rem', textAlign: 'center' }}>No hay reservas para esta clase.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservasAdminPage;
