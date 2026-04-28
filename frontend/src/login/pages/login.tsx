import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginBackground } from '../components/LoginBackground';
import { LoginBrandPanel } from '../components/LoginBrandPanel';
import { LoginForm } from '../components/LoginForm';
import { LoginStatusOverlay } from '../components/LoginStatusOverlay';
import type { AuthFormData } from '../types';
import { useAuth } from '../../auth/AuthContext';
import type { UserRole } from '../../auth/auth.types';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const normalizedEmail = formData.email.trim().toLowerCase();
    const role: UserRole = normalizedEmail.includes('admin') ? 'ADMIN' : 'USER';

    // Simulamos una llamada a la API compleja (ej. autenticación en base de datos)
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      login({ email: normalizedEmail, role });

      // Reiniciamos el estado de éxito después de mostrar la animación
      setTimeout(() => {
        setIsSuccess(false);
        if (role === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }, 2000);
    }, 3000);
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center overflow-hidden relative font-sans">
      <LoginBackground />

      {/* --- CONTENEDOR PRINCIPAL --- */}
      <div className="relative z-10 w-full max-w-5xl md:h-162.5 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-neutral-900/40 backdrop-blur-2xl m-4">
        <LoginBrandPanel isLogin={isLogin} />

        {/* --- PANEL DERECHO (Formularios) --- */}
        <div className="w-full md:w-7/12 p-8 md:p-14 relative flex items-center justify-center">
          <LoginStatusOverlay isLoading={isLoading} isSuccess={isSuccess} />

          {/* Formulario (key para forzar re-render y animaciones al cambiar de modo) */}
          <LoginForm
            key={isLogin ? 'login' : 'signup'}
            isLogin={isLogin}
            isLoading={isLoading}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onToggleMode={toggleMode}
          />
        </div>
      </div>
    </div>
  );
}