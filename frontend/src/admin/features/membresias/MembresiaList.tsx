import type { FC } from 'react';
import { useMembresias } from './useMembresias';

export const MembresiaList: FC = () => {
  const { data: membresias, isLoading, isError } = useMembresias();

  if (isLoading) return <p>Cargando membresías...</p>;
  if (isError) return <p style={{ color: 'var(--danger-color)' }}>Error al cargar membresías. Posiblemente el backend aún no implemente GET /membership.</p>;

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID Socio</th>
            <th>ID Tipo (Plan)</th>
            <th>Inicio</th>
            <th>Vencimiento</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {membresias?.map(mem => (
            <tr key={mem.idMembresia}>
              <td>{mem.idSocio.substring(0,8)}...</td>
              <td>{mem.idTipoMembresia.substring(0,8)}...</td>
              <td>{new Date(mem.fechaInico).toLocaleDateString()}</td>
              <td>{new Date(mem.fechaVencimiento).toLocaleDateString()}</td>
              <td>
                <span 
                  className="admin-badge" 
                  style={{ backgroundColor: mem.estadoMembresia === 'Activa' ? 'var(--success-color)' : 'var(--danger-color)' }}
                >
                  {mem.estadoMembresia}
                </span>
              </td>
            </tr>
          ))}
          {(!membresias || membresias.length === 0) && (
            <tr><td colSpan={5} style={{textAlign: "center"}}>No hay membresías registradas</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
