import { Activity, Dumbbell } from 'lucide-react';

export function LoginBackground() {
  return (
    <>
      {/* --- FONDOS ANIMADOS (Blobs de color) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-emerald-600/20 rounded-full blur-[100px] animate-blob" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-cyan-600/20 rounded-full blur-[120px] animate-blob"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-75 h-75 bg-indigo-600/20 rounded-full blur-[80px] animate-blob"
        style={{ animationDelay: '4s' }}
      />

      {/* Elementos flotantes de fondo */}
      <Dumbbell
        className="absolute top-[15%] right-[10%] text-white/5 w-24 h-24 animate-float"
        style={{ animationDelay: '0s' }}
      />
      <Activity
        className="absolute bottom-[20%] left-[8%] text-white/5 w-32 h-32 animate-float"
        style={{ animationDelay: '1.5s' }}
      />
    </>
  );
}
