import type { FC } from 'react';

const PlaceholderAdminPage: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1 className="admin-title">{title}</h1>
      </div>
      <div className="admin-card">
        <p style={{ color: "var(--text-secondary)" }}>
          Esta sección ({title}) se encuentra en desarrollo o el backend no provee endpoints administrativos para la misma.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderAdminPage;
