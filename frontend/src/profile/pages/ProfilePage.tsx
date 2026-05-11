import { useEffect, useMemo, useState } from 'react';
import { Save, ShieldCheck, User2, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/auth.context';
import { getProfile, updateProfile, type ProfileData, type UpdateProfilePayload } from '../api/profileApi';
import '../profile.css';

type StatusKind = 'idle' | 'saving' | 'success' | 'error';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [status, setStatus] = useState<StatusKind>('idle');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasena: '',
    repetirContrasena: '',
  });

  const resolvedUserId = useMemo(() => {
    const candidate = user as Usuario & { idUsuario: string };
    return candidate.idUsuario ?? profile?.idUsuario;
  }, [profile?.idUsuario, user]);

  useEffect(() => {
    if (!user) return;
    console.log(user)

    const candidate = user as Usuario & { idUsuario: string };


    void (async () => {
      try {
        const data = await getProfile(candidate.idUsuario);
        setProfile(data);
        setFormData((prev) => ({
          ...prev,
          email: data.email ?? '',
          nombre: data.nombre ?? '',
          apellido: data.apellido ?? '',
          telefono: data.telefono ?? '',
        }));
      } catch (error) {
        console.log('Error fetching profile:', error);
        setProfile({
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          telefono: '',
          tipoUsuario: user.tipoUsuario,
        });
        setFormData((prev) => ({
          ...prev,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
        }));
      }
    })();
  }, [user]);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resolvedUserId) {
      setStatus('error');
      setMessage('No pudimos obtener tu ID de usuario. Inicia sesion nuevamente.');
      toast.error('No se pudo obtener tu ID de usuario.');
      return;
    }

    if (formData.contrasena && formData.contrasena !== formData.repetirContrasena) {
      setStatus('error');
      setMessage('Las contrasenas no coinciden.');
      return;
    }

    const payload: UpdateProfilePayload = {
      email: formData.email.trim() || undefined,
      nombre: formData.nombre.trim() || undefined,
      apellido: formData.apellido.trim() || undefined,
      telefono: formData.telefono.trim() || undefined,
    };

    if (formData.contrasena.trim()) {
      payload.contrasena = formData.contrasena.trim();
    }

    setStatus('saving');
    setMessage('');

    try {
      const updated = await updateProfile(resolvedUserId, payload);
      setProfile((prev) => ({
        ...prev,
        ...updated,
        telefono: updated.telefono ?? prev?.telefono ?? '',
      }));
      setFormData((prev) => ({
        ...prev,
        contrasena: '',
        repetirContrasena: '',
      }));
      setStatus('success');
      setMessage('Perfil actualizado correctamente.');
      toast.success('Perfil actualizado correctamente.');
    } catch (error) {
      console.log('Error updating profile:', error);
      setStatus('error');
      setMessage('No se pudo actualizar el perfil. Intenta nuevamente.');
      toast.error('No se pudo actualizar el perfil.');
    }
  };

  const roleLabel = profile?.tipoUsuario ?? user?.tipoUsuario ?? 'Usuario';
  const initials = `${profile?.nombre?.[0] ?? user?.nombre?.[0] ?? ''}${
    profile?.apellido?.[0] ?? user?.apellido?.[0] ?? ''
  }`;

  return (
    <div className="profile-page min-h-screen relative overflow-hidden">
      <div className="profile-bg" />
      <div className="profile-grid" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6">
          <section className="profile-card p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Perfil</p>
                <h1 className="text-3xl sm:text-4xl font-semibold mt-2">Tus datos</h1>
              </div>
              <span className="profile-chip px-3 py-1 rounded-full text-xs font-semibold">{roleLabel}</span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-2xl font-semibold">
                {initials || 'PG'}
              </div>
              <div>
                <p className="text-lg font-medium">
                  {profile?.nombre ?? user?.nombre} {profile?.apellido ?? user?.apellido}
                </p>
                <p className="profile-soft text-sm">{profile?.email ?? user?.email}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm profile-soft">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-cyan-300" />
                <span>Acceso seguro y encriptado</span>
              </div>
              <div className="flex items-center gap-3">
                <User2 size={18} className="text-amber-300" />
                <span>Actualiza tu informacion cuando quieras</span>
              </div>
              {!resolvedUserId && (
                <div className="flex items-center gap-3 profile-warm border rounded-xl px-3 py-2 text-xs">
                  <span>
                    Tu sesion no incluye ID de usuario. Si no puedes guardar cambios, vuelve a iniciar sesion.
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="profile-card p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Editar informacion</h2>
                <p className="profile-soft text-sm mt-1">Mantene tu perfil siempre actualizado.</p>
              </div>
              {status === 'success' && <span className="text-xs text-emerald-300">Guardado</span>}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2 text-sm">
                  <span className="profile-soft">Nombre</span>
                  <div className="relative">
                    <User2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formData.nombre}
                      onChange={(event) => handleChange('nombre', event.target.value)}
                      className="profile-field w-full rounded-xl pl-9 pr-3 py-2"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="profile-soft">Apellido</span>
                  <div className="relative">
                    <User2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formData.apellido}
                      onChange={(event) => handleChange('apellido', event.target.value)}
                      className="profile-field w-full rounded-xl pl-9 pr-3 py-2"
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </label>
              </div>

              <label className="space-y-2 text-sm block">
                <span className="profile-soft">Correo</span>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className="profile-field w-full rounded-xl pl-9 pr-3 py-2"
                    placeholder="correo@powergym.com"
                    required
                  />
                </div>
              </label>

              <label className="space-y-2 text-sm block">
                <span className="profile-soft">Telefono</span>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(event) => handleChange('telefono', event.target.value)}
                    className="profile-field w-full rounded-xl pl-9 pr-3 py-2"
                    placeholder="11 1234 5678"
                  />
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2 text-sm">
                  <span className="profile-soft">Nueva contrasena</span>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      value={formData.contrasena}
                      onChange={(event) => handleChange('contrasena', event.target.value)}
                      className="profile-field w-full rounded-xl pl-9 pr-3 py-2"
                      placeholder="Opcional"
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="profile-soft">Repetir contrasena</span>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      value={formData.repetirContrasena}
                      onChange={(event) => handleChange('repetirContrasena', event.target.value)}
                      className="profile-field w-full rounded-xl pl-9 pr-3 py-2"
                      placeholder="Opcional"
                    />
                  </div>
                </label>
              </div>

              {message && (
                <div className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-emerald-300'}`}>
                  {message}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="profile-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
                  disabled={status === 'saving'}
                >
                  <Save size={18} />
                  {status === 'saving' ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
