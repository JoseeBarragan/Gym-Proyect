export function PlaceholderAdminPage({ title, description }: { title: string, description: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="admin-card">
        <h1 className="admin-page-title">{title}</h1>
        <p className="admin-page-subtitle">{description}</p>
      </div>

      <div className="admin-card" style={{ padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <p style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: '1rem' }}>Esta sección se encuentra en desarrollo.</p>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Aquí se integrarán los endpoints de la API correspondientes a <code style={{ backgroundColor: '#2d323e', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>{title}</code>.</p>
        </div>
      </div>
    </div>
  );
}
