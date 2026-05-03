import { useForm } from 'react-hook-form';
import type { UserItem } from './useUsers';
import { useEffect } from 'react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserItem | Partial<UserItem>) => void;
  user?: UserItem | undefined | null;
}

export function UserFormModal({ isOpen, onClose, onSubmit, user }: UserFormModalProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: user?.nombre ?? '',
      apellido: user?.apellido ?? '',
      email: user?.email ?? '',
      telefono: user?.telefono ?? '',
      contrasena: '',
    }
  });

  useEffect(() => {
    if (!isOpen) return;
    reset({
      nombre: user?.nombre ?? '',
      apellido: user?.apellido ?? '',
      email: user?.email ?? '',
      telefono: user?.telefono ?? '',
      contrasena: '',
    });
  }, [user, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '500px', backgroundColor: '#1a1d24' }}>
        <div className="admin-header-flex">
          <h2 className="admin-page-title" style={{ fontSize: '1.25rem', marginBottom: 0 }}>
            {user ? 'Editar Usuario' : 'Nuevo Instructor'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Nombre</label>
              <input {...register('nombre', { required: true })} style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#0f1115', border: '1px solid #2d323e', color: '#fff' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Apellido</label>
              <input {...register('apellido', { required: true })} style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#0f1115', border: '1px solid #2d323e', color: '#fff' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Email</label>
            <input type="email" {...register('email', { required: true })} style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#0f1115', border: '1px solid #2d323e', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Teléfono</label>
            <input type="text" {...register('telefono', { required: true })} style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#0f1115', border: '1px solid #2d323e', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Contraseña</label>
            <input type="password" {...register('contrasena', { required: true })} style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#0f1115', border: '1px solid #2d323e', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', background: 'transparent', border: '1px solid #2d323e', color: '#fff', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" className="admin-btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}