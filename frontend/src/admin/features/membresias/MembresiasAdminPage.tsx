import { FC } from 'react';
import { MembresiaList } from './MembresiaList';

const MembresiasAdminPage: FC = () => {
  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1 className="admin-title">Gestión de Membresías</h1>
      </div>

      <div className="admin-card">
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          *Nota: Requiere que el backend implemente el endpoint GET /membership para completarse.
        </p>
        <MembresiaList />
      </div>
    </div>
  );
};

export default MembresiasAdminPage;
