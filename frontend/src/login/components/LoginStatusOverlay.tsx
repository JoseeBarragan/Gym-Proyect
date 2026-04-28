import { CheckCircle2 } from 'lucide-react';

interface LoginStatusOverlayProps {
  isLoading: boolean;
  isSuccess: boolean;
}

export function LoginStatusOverlay({ isLoading, isSuccess }: LoginStatusOverlayProps) {
  if (!isLoading && !isSuccess) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur-md rounded-r-3xl transition-all duration-500">
      {isLoading ? (
        <div className="flex flex-col items-center animate-scale-in">
          <div className="premium-loader mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] rounded-full" />
          <h3 className="text-xl font-semibold text-white tracking-wide animate-pulse">Sincronizando Sistema...</h3>
          <p className="text-gray-400 mt-2 text-sm">Autenticando credenciales</p>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-scale-in">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-[expandWidth_0.5s_ease-out]" />
            <CheckCircle2 className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-wide">¡Acceso Concedido!</h3>
          <p className="text-emerald-400 mt-2 text-sm">Preparando tu entorno de entrenamiento</p>
        </div>
      )}
    </div>
  );
}
