import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginBackground } from '../components/LoginBackground';
import { LoginBrandPanel } from '../components/LoginBrandPanel';
import { LoginForm } from '../components/LoginForm';
import { LoginStatusOverlay } from '../components/LoginStatusOverlay';
import type { AuthFormData } from '../types';
import { useAuth } from '../../auth/auth.context';

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
    apellido: '',
    telefono: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  void (async () => {
    setIsLoading(true);

    try {
      const normalizedEmail = formData.email.trim();
      console.log("normalizedEmail", normalizedEmail)
      if (!isLogin) {
        console.log("registrando")
        const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: normalizedEmail,
            contrasena: formData.password,
            nombre: formData.name,
            apellido: formData.apellido,
            telefono: formData.telefono,
          }),
          credentials: 'include',
        });

        if (!res.ok) {
          const error = await res.json().catch(() => ({ message: 'Error al registrarse' }));
          throw new Error(error.message || 'Error al registrarse');
        }

        console.log("respuesta", res)

        const loginRes = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail, contrasena: formData.password }),
          credentials: 'include',
        });

        if (!loginRes.ok) {
          throw new Error('Credenciales inválidas');
        }

        await login({ email: normalizedEmail, password: formData.password });

        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          navigate('/home');
        }, 800);
      } else {
        console.log("logueando")
        const user = await login({ email: normalizedEmail, password: formData.password });

        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          if (user.tipoUsuario === 'Administrador') {
            navigate('/admin');
          }
          else if (user.tipoUsuario === 'Instructor') {
            navigate('/instructor');
          }
          else if (user.tipoUsuario === 'Socio') {
            navigate('/home');
          }
          else {
            navigate('/login');
          }
        }, 800);
      }
    } catch {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  })();
};

const toggleMode = () => {
  setIsLogin((prev) => !prev);
  setFormData({ name: '', email: '', password: '', apellido: '', telefono: '' });
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