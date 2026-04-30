import { Users, CalendarDays, Wallet, CreditCard } from 'lucide-react';

export function DashboardPage() {
  const stats = [
    { label: 'Usuarios Totales', value: '1,245', icon: Users, color: '#3b82f6' },
    { label: 'Clases Hoy', value: '12', icon: CalendarDays, color: '#10b981' },
    { label: 'Ingresos del Mes', value: '$12,400', icon: CreditCard, color: '#6366f1' },
    { label: 'Membresías Activas', value: '892', icon: Wallet, color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 className="admin-page-title">Panel de Control</h1>
      
      <div className="dashboard-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-card dashboard-stat-card">
              <div 
                className="dashboard-stat-icon" 
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="dashboard-stat-label">{stat.label}</p>
                <p className="dashboard-stat-value">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-card" style={{ minHeight: '400px' }}>
        <h2 className="admin-page-title" style={{ fontSize: '1.125rem' }}>Actividad Reciente</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', color: '#64748b' }}>
          <p>Selecciona una categoría en el menú lateral para gestionar los datos.</p>
        </div>
      </div>
    </div>
  );
}
