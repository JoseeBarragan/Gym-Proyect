import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth.context';
import { jwtDecode } from 'jwt-decode';

export default function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate(); 

  const user = (jwtDecode(localStorage.getItem("accessToken") ?? "") as Usuario);

  const handleLogout = async () => {
    logout()
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Panel Administrador</h1>
        <p className="text-white/70 mt-2">Sesión: {user.email}</p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
