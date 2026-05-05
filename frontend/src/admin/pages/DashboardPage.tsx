import { useMemo } from 'react';
import { Users, CalendarDays, Wallet, CreditCard, PlayCircle, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useUsers } from '../features/users/useUsers';
import { usePagos } from '../features/pagos/usePagos';
import { useClases } from '../features/clases/useClases';

export function DashboardPage() {
  const { data: users, isLoading: loadingUsers } = useUsers();
  const { data: pagos, isLoading: loadingPagos } = usePagos();
  const { data: clases, isLoading: loadingClases } = useClases();

  const loading = loadingUsers || loadingPagos || loadingClases;

  // Procesar ingresos por mes
  const ingresosData = useMemo(() => {
    if (!pagos) return [];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const today = new Date();
    
    // Obtenemos los últimos 6 meses (incluyendo el actual)
    const result: { name: string; month: number; year: number; ingresos: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push({ name: months[d.getMonth()], month: d.getMonth(), year: d.getFullYear(), ingresos: 0 });
    }

    pagos.forEach(pago => {
      const d = new Date(pago.fechaPago);
      const target = result.find(r => r.month === d.getMonth() && r.year === d.getFullYear());
      if (target) {
        target.ingresos += pago.monto;
      }
    });

    return result;
  }, [pagos]);

  // Ingresos del mes actual
  const ingresosDelMes = ingresosData.length > 0 ? ingresosData[ingresosData.length - 1].ingresos : 0;

  // Clases de Hoy
  const clasesHoy = useMemo(() => {
    if (!clases) return [];
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayName = days[new Date().getDay()];
    // Filtramos las clases que coinciden con el día de hoy
    return clases.filter(c => c.dia === todayName).slice(0, 4); // Mostramos hasta 4
  }, [clases]);

  // Últimos Usuarios Registrados (Actividad Reciente)
  // Como no hay endpoint de actividad genérico, listamos los últimos usuarios y pagos simulando actividad
  const actividadReciente = useMemo(() => {
    const act: { id: string; usuario: string; accion: string; tiempo: string }[] = [];
    if (users && users.length > 0) {
      const latestUsers = [...users].reverse().slice(0, 3); // Simulamos últimos 3
      latestUsers.forEach((u, idx) => {
        act.push({ id: `usr-${idx}`, usuario: `${u.nombre || ''} ${u.apellido || ''}`.trim() || u.email, accion: 'Se registró como ' + u.tipoUsuario, tiempo: 'Recientemente' });
      });
    }
    if (pagos && pagos.length > 0) {
      const latestPagos = [...pagos].sort((a,b) => new Date(b.fechaPago).getTime() - new Date(a.fechaPago).getTime()).slice(0, 2);
      latestPagos.forEach((p, idx) => {
        act.push({ id: `pago-${idx}`, usuario: `Pago del plan`, accion: `Completó un pago de $${p.monto}`, tiempo: new Date(p.fechaPago).toLocaleDateString() });
      });
    }
    return act.slice(0, 5);
  }, [users, pagos]);

  // Usuarios totales (Socios)
  const totalSocios = users?.filter(u => u.tipoUsuario === 'Socio').length || 0;

  // Distribución de usuarios para el gráfico
  const userDistribution = useMemo(() => {
    if (!users) return [];
    let socios = 0;
    let admins = 0;
    let instructores = 0;
    
    users.forEach(u => {
      if (u.tipoUsuario === 'Socio') socios++;
      else if (u.tipoUsuario === 'Administrador') admins++;
      else if (u.tipoUsuario === 'Instructor') instructores++;
    });

    return [
      { name: 'Socios', value: socios, color: '#f59e0b' },
      { name: 'Instructores', value: instructores, color: '#10b981' },
      { name: 'Admins', value: admins, color: '#3b82f6' }
    ].filter(d => d.value > 0);
  }, [users]);

  const stats = [
    { label: 'Usuarios Totales', value: users?.length || 0, icon: Users, color: '#3b82f6' },
    { label: 'Socios Activos', value: totalSocios, icon: Wallet, color: '#f59e0b' },
    { label: 'Clases Hoy', value: clasesHoy.length, icon: CalendarDays, color: '#10b981' },
    { label: 'Ingresos del Mes', value: `$${ingresosDelMes}`, icon: CreditCard, color: '#6366f1' },
  ];

  if (loading) {
    return <div style={{ color: '#f8fafc' }}>Cargando datos del dashboard...</div>;
  }

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Columna Izquierda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="admin-card">
            <h2 className="admin-page-title" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Ingresos - Últimos 6 meses</h2>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ingresosData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d323e" />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1a1d24', borderColor: '#2d323e', color: '#f8fafc', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="ingresos" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="admin-page-title" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Actividad Reciente</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {actividadReciente.map((act) => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #2d323e' }}>
                  <div style={{ backgroundColor: '#1e293b', padding: '0.5rem', borderRadius: '9999px', color: '#94a3b8' }}>
                    <PlayCircle size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#f8fafc', fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>{act.usuario}</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.1rem 0 0 0' }}>{act.accion}</p>
                  </div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{act.tiempo}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Columna Derecha */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="admin-card">
            <h2 className="admin-page-title" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Clases de Hoy</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {clasesHoy.map((clase) => (
                <div key={clase.idClase} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f1115', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #2d323e' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ height: '3rem', width: '3rem', borderRadius: '0.5rem', backgroundColor: '#1e3a8a', color: '#60a5fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{clase.horario}</span>
                    </div>
                    <div>
                      <p style={{ color: '#f8fafc', fontWeight: 600, margin: 0 }}>{clase.nombre}</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Inst: {clase.idInstructor}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Cupos Disp.</p>
                    <p style={{ color: '#10b981', fontWeight: 600, margin: '0.1rem 0 0 0' }}>{clase.cupo}</p>
                  </div>
                </div>
              ))}
              {clasesHoy.length === 0 && (
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No hay clases programadas para hoy.</p>
              )}
            </div>
          </div>

          <div className="admin-card">
            <h2 className="admin-page-title" style={{ fontSize: '1.125rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChartIcon size={20} color="#6366f1" />
              Distribución de Usuarios
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1d24', borderColor: '#2d323e', color: '#f8fafc', borderRadius: '0.5rem' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                {userDistribution.map((entry, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: entry.color }}></div>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{entry.name}: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{entry.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
