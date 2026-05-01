import { FC } from 'react';
import { PagoList } from './PagoList';

const PagosAdminPage: FC = () => {
  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1 className="admin-title">Gestión de Pagos</h1>
      </div>

      <div className="admin-card">
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          *Nota: Requiere que el backend implemente el endpoint GET /payment para completarse.
        </p>
        <PagoList />
      </div>
    </div>
  );
};

export default PagosAdminPage;
