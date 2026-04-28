import { Dumbbell, User } from 'lucide-react';

interface LoginBrandPanelProps {
  isLogin: boolean;
}

export function LoginBrandPanel({ isLogin }: LoginBrandPanelProps) {
  return (
    <div className="hidden md:flex md:w-5/12 bg-linear-to-br from-neutral-900 to-black p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
      {/* Overlay gradient interior */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />

      <div className="relative z-10 flex items-center gap-3 animate-slide-up">
        <div className="p-3 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-xl shadow-lg shadow-emerald-500/20">
          <Dumbbell className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
          FitCore<span className="text-emerald-500">.</span>
        </span>
      </div>

      <div className="relative z-10 animate-slide-up delay-200">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {isLogin ? 'Forja tu' : 'Desata tu'} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
            mejor versión.
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          El sistema de gestión de élite para administradores y atletas. Control total, métricas en tiempo real y rendimiento absoluto.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-gray-500 animate-slide-up delay-400">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center"
            >
              <User className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
        <p>+10k Entrenadores activos</p>
      </div>
    </div>
  );
}
