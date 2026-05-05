import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth.context';
import { Calendar, History, LogOut, Users } from 'lucide-react';
import '../instructor.css';

export function InstructorLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/login', { replace: true });
  };

  const NAV_ITEMS = [
    { name: 'Mis Clases', path: '/instructor', icon: Calendar },
    { name: 'Estudiantes', path: '/instructor/students', icon: Users },
    { name: 'Historial', path: '/instructor/history', icon: History },
  ];

  return (
    <div className="instructor-layout">
      <aside className="instructor-sidebar">
        <div className="instructor-sidebar-header">
          <h2 className="instructor-sidebar-title">Gym Instructor</h2>
        </div>

        <nav className="instructor-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `instructor-nav-item ${isActive ? 'active' : ''}`
                }
                end={item.path === '/instructor'}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="instructor-sidebar-footer">
          <button onClick={handleLogout} className="instructor-logout-btn">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="instructor-main">
        <div className="instructor-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
