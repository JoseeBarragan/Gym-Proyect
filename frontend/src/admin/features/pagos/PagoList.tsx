import { FC } from 'react';
import { usePagos } from './usePagos';

export const PagoList: FC = () => {
  const { data: pagos, isLoading, isError } = usePagos();

  if (isLoading) return <p>Cargando pagos...</p>;
  if (isError) return <p style={{ color: 'var(--danger-color)' }}>Error al cargar pagos. Posiblemente el backend aún no implemente GET /payment.</p>;

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID Pago</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Stripe ID</th>
            <th>Estado</th>
            <th>Membresía</th>
          </tr>
        </thead>
        <tbody>
          {pagos?.map(pago => (
            <tr key={pago.idPago}>
              <td>{pago.idPago.substring(0,8)}...</td>
              <td>${pago.monto}</td>
              <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
              <td>{pago.stripePaymentId}</td>
              <td>
                <span 
                  className="admin-badge" 
                  style={{ backgroundColor: pago.estadoPago === 'Completado' ? 'var(--success-color)' : 'var(--danger-color)' }}
                >
                  {pago.estadoPago}
                </span>
              </td>
              <td>{pago.idMembresia.substring(0,8)}...</td>
            </tr>
          ))}
          {(!pagos || pagos.length === 0) && (
            <tr><td colSpan={6} style={{textAlign: "center"}}>No hay pagos registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
