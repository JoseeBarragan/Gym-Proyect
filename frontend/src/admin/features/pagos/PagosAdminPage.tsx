import { PagoList } from './PagoList';
import "../../admin.css"

export function PagosAdminPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="admin-card admin-header-flex">
        <div>
          <h1 className="admin-page-title">Historial de Pagos</h1>
          <p className="admin-page-subtitle">Visualiza el historial de todos los pagos registrados en el sistema.</p>
        </div>
      </div>
      <PagoList />
    </div>
  );
}

export default PagosAdminPage;
