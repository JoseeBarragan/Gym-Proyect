import type { ChangeEvent, FormEvent } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import type { AuthFormData } from '../types';

interface LoginFormProps {
  isLogin: boolean;
  isLoading: boolean;
  formData: AuthFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onToggleMode: () => void;
}

export function LoginForm({
  isLogin,
  isLoading,
  formData,
  onChange,
  onSubmit,
  onToggleMode,
}: LoginFormProps) {
  return (
    <div className="w-full max-w-md">
      {/* Cabecera del formulario */}
      <div className="mb-10 text-center md:text-left animate-slide-up">
        <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Bienvenido de nuevo' : 'Únete a la élite'}</h2>
        <p className="text-gray-400">
          {isLogin
            ? 'Ingresa tus credenciales para acceder a tu panel.'
            : 'Crea tu cuenta de FitCore Manager hoy mismo.'}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Campo Nombre (Solo para Registro) */}
        {!isLogin && (
          <div className="input-wrapper animate-slide-up delay-100 bg-white/5 rounded-xl border border-white/5 p-1 transition-colors focus-within:bg-white/10">
            <div className="flex items-center px-4 py-3">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                name="name"
                required
                placeholder="Nombre Completo"
                value={formData.name}
                onChange={onChange}
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 font-medium"
              />
            </div>
          </div>
        )}

        {/* Campo Correo */}
        <div
          className={`input-wrapper animate-slide-up ${isLogin ? 'delay-100' : 'delay-200'} bg-white/5 rounded-xl border border-white/5 p-1 transition-colors focus-within:bg-white/10`}
        >
          <div className="flex items-center px-4 py-3">
            <Mail className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              required
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={onChange}
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 font-medium"
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div
          className={`input-wrapper animate-slide-up ${isLogin ? 'delay-200' : 'delay-300'} bg-white/5 rounded-xl border border-white/5 p-1 transition-colors focus-within:bg-white/10`}
        >
          <div className="flex items-center px-4 py-3">
            <Lock className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              required
              placeholder="Contraseña"
              value={formData.password}
              onChange={onChange}
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 font-medium"
            />
          </div>
        </div>

        {/* Opciones extra (Recuperar contraseña) */}
        {isLogin && (
          <div className="flex justify-end animate-slide-up delay-300">
            <button
              type="button"
              className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full group relative overflow-hidden rounded-xl p-0.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-slide-up delay-400`}
        >
          <span className="absolute inset-0 bg-linear-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-size-[200%_auto] animate-[spinCustom_3s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-neutral-900 rounded-[10px] px-6 py-4 flex items-center justify-center gap-2 transition-colors group-hover:bg-neutral-900/80">
            <span className="font-bold text-white tracking-wide">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </form>

      {/* Toggle Login/Signup */}
      <div className="mt-8 text-center animate-slide-up delay-400">
        <p className="text-gray-400">
          {isLogin ? '¿No tienes una cuenta de gimnasio?' : '¿Ya eres miembro del club?'}
          <button
            onClick={onToggleMode}
            className="ml-2 font-semibold text-white hover:text-cyan-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            type="button"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
