import type { FC } from 'react';
import { usePagos } from './usePagos';
import { CreditCard, Calendar, Hash, CheckCircle, Tag, Search, DollarSign } from 'lucide-react';
import { useState, useMemo } from 'react';

export const PagoList: FC = () => {
  const { data: pagos, isLoading, isError } = usePagos();
  const [filterId, setFilterId] = useState('');

  const filteredPagos = useMemo(() => {
    if (!pagos) return [];
    if (!filterId) return pagos;
    return pagos.filter(p => p.idPago.toLowerCase().includes(filterId.toLowerCase()) || p.idMembresia.toLowerCase().includes(filterId.toLowerCase()));
  }, [pagos, filterId]);

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Cargando pagos...</div>;
  if (isError) return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>Error al cargar pagos.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0f1115', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #2d323e', flex: '1', minWidth: '200px' }}>
          <Search size={16} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Buscar por ID de pago o ID membresía..." 
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
          />
        </div>
      </div>

      <div className="admin-card admin-table-container" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pago</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Método</th>
              <th>Estado</th>
              <th>ID Membresía</th>
            </tr>
          </thead>
          <tbody>
            {filteredPagos.map(pago => (
              <tr key={pago.idPago}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc', fontWeight: 500 }}>
                    <Hash size={14} color="#94a3b8" />
                    <span title={pago.idPago}>{pago.idPago.substring(0,8)}...</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#60a5fa', fontWeight: 600 }}>
                    <DollarSign size={14} />
                    {pago.monto.toLocaleString('es-AR')}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                    <Calendar size={14} />
                    <span style={{ fontSize: '0.875rem' }}>{new Date(pago.fechaPago).toLocaleString()}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                    <CreditCard size={14} />
                    <span>{pago.metodoPago}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={14} color={pago.estadoPago === 'COMPLETADO' ? '#4ade80' : '#94a3b8'} />
                    <span className="role-badge" style={{ backgroundColor: pago.estadoPago === 'COMPLETADO' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(148, 163, 184, 0.1)', color: pago.estadoPago === 'COMPLETADO' ? '#4ade80' : '#94a3b8' }}>
                      {pago.estadoPago ? pago.estadoPago.charAt(0).toUpperCase() + pago.estadoPago.slice(1).toLowerCase() : 'Desconocido'}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                    <Tag size={14} />
                    <span title={pago.idMembresia}>{pago.idMembresia.substring(0,8)}...</span>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPagos.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  No hay pagos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
