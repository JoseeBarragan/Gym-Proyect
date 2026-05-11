import { useState } from 'react';
import { Menu, X, User, Dumbbell, Calendar, LayoutDashboard, CreditCard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/auth.context';

const homeNavItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Características', href: '#features' },
  { name: 'Membresías', href: '#membresias' },
  { name: 'Clases', href: '#clases' },
  { name: 'Testimonios', href: '#testimonios' },
];

const socioNavItems = [
  { name: 'Clases', href: '/socio', icon: Calendar },
  { name: 'Mis Reservas', href: '/socio/reservas', icon: LayoutDashboard },
  { name: 'Membresías', href: '/socio/membresias', icon: CreditCard },
];

type SNavItem = typeof socioNavItems[0];

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
      <path
        d="M12 20C12 20 14 14 20 14C26 14 28 20 28 20C28 20 26 26 20 26C14 26 12 20 12 20Z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="4" fill="white" />
    </svg>
    <span className="text-lg sm:text-xl font-bold tracking-wider">POWER<span className="text-blue-500">GYM</span></span>
  </div>
);

interface HeaderProps {
  variant?: 'home' | 'socio';
}

export function Header({ variant = 'home' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isSocioRoute = variant === 'socio' || location.pathname.startsWith('/socio');
  const currentNavItems = isSocioRoute ? socioNavItems : homeNavItems;

  const handleSocioAccess = () => {
    if (isAuthenticated && user?.tipoUsuario === 'Socio') {
      navigate('/socio');
    } else if (isAuthenticated) {
      alert('Tu usuario no tiene permisos de socio. Por favor inicia sesión con una cuenta de socio.');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div className="relative max-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="shrink-0 transition-transform hover:scale-105 duration-300"
              style={{ mixBlendMode: 'difference' }}
            >
              <div className="text-white">
                <Logo />
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" style={{ mixBlendMode: 'difference' }}>
              {currentNavItems.map((item: any) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:text-blue-500 text-white"
                  style={{ color: 'white' }}
                >
                  {'icon' in item && item.icon ? (
                    <item.icon size={18} />
                  ) : null}
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Profile & Socio Access Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated && user?.tipoUsuario === 'Socio' ? (
                <></>
              ) : (
                <button
                  onClick={handleSocioAccess}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  style={{ mixBlendMode: 'normal' }}
                >
                  <Dumbbell className="w-4 h-4" />
                  <span>Área Socio</span>
                </button>
              )}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{ mixBlendMode: 'difference' }}
                  >
                    <div className="text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{user?.nombre} {user?.apellido}</span>
                    </div>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{ mixBlendMode: 'difference' }}
                  >
                    <div className="text-white flex items-center gap-2">
                      <span>Cerrar sesion</span>
                    </div>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{ mixBlendMode: 'difference' }}
                >
                  <div className="text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Acceder</span>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300"
              style={{ mixBlendMode: 'difference' }}
            >
              <div className="text-white">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'rgb(17, 17, 17)',
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Logo />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4">
            {currentNavItems.map((item: any) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg mb-2 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800 space-y-3">
            {isAuthenticated && user?.tipoUsuario === 'Socio' ? (
              <>
                <div className="text-white text-sm mb-2">
                  {user?.nombre} {user?.apellido}
                </div>
                {socioNavItems.map((item: SNavItem) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </a>
                ))}
              </>
            ) : (
              <button
                onClick={handleSocioAccess}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors"
              >
                <Dumbbell className="w-5 h-5" />
                <span>Área Socio</span>
              </button>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                <span>Cerrar sesion</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Acceder</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
