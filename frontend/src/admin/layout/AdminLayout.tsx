import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth.context';
import { Users, CalendarDays, CreditCard, LayoutDashboard, LogOut } from 'lucide-react';
import '../admin.css';

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout()
    navigate('/login', { replace: true });
  };

  const NAV_ITEMS = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Usuarios', path: '/admin/users', icon: Users },
    { name: 'Clases', path: '/admin/classes', icon: CalendarDays },
    { name: 'Pagos', path: '/admin/payments', icon: CreditCard },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-title">Gym Admin</h2>
        </div>
        
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `admin-nav-item ${isActive ? 'active' : ''}`
                }
                end={item.path === '/admin'}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
