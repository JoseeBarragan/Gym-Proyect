import { useForm } from 'react-hook-form';
import type { UserItem } from './useUsers';
import { useEffect } from 'react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserItem | Partial<UserItem>, id: string) => void;
  user?: UserItem | undefined | null;
}

export function UserFormModal({ isOpen, onClose, onSubmit, user }: UserFormModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
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
  }, [isOpen]);

  const getInputStyle = (hasError: boolean) => ({
    boxSizing: 'border-box' as const,
    width: '100%',
    borderColor: hasError ? '#ef4444' : undefined,
  });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay -z-50" onClick={handleOverlayClick} style={{ padding: '1rem' }}>
      <div 
        className="admin-modal-content" 
        style={{ maxHeight: '90vh', overflowY: 'auto' }} // Permite scroll en pantallas muy pequeñas
      >
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            {user ? 'Editar Usuario' : 'Nuevo Instructor'}
          </h2>
          <button onClick={onClose} className="admin-modal-close" aria-label="Cerrar">
            &times;
          </button>
        </div>

        <form className="admin-form" onSubmit={handleSubmit((data) => onSubmit(data, user?.idUsuario ?? ''))}>
          
          {/* Fila Responsiva: Nombre y Apellido */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div className="admin-form-group">
              <label>Nombre</label>
              <input 
                {...register('nombre', { required: 'Este campo es requerido' })} 
                style={getInputStyle(!!errors.nombre)}
              />
              {errors.nombre && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.25rem' }}>{errors.nombre.message as string}</span>}
            </div>
            
            <div className="admin-form-group">
              <label>Apellido</label>
              <input 
                {...register('apellido', { required: 'Este campo es requerido' })} 
                style={getInputStyle(!!errors.apellido)}
              />
              {errors.apellido && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.25rem' }}>{errors.apellido.message as string}</span>}
            </div>
          </div>

          <div className="admin-form-group">
            <label>Email</label>
            <input 
              type="email" 
              {...register('email', { 
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'El email necesita el formato example@gmail.com'
                }
              })} 
              style={getInputStyle(!!errors.email)}
            />
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.25rem' }}>{errors.email.message as string}</span>}
          </div>

          <div className="admin-form-group">
            <label>Teléfono</label>
            <input 
              type="text" 
              {...register('telefono', { 
                required: 'El teléfono es requerido',
                minLength: { value: 8, message: 'Debe contener al menos 8 caracteres' }
              })} 
              style={getInputStyle(!!errors.telefono)}
            />
            {errors.telefono && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.25rem' }}>{errors.telefono.message as string}</span>}
          </div>

          <div className="admin-form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              {...register('contrasena', { 
                required: user ? false : 'La contraseña es requerida para nuevos usuarios',
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
              })} 
              placeholder={user ? "Dejar en blanco para no modificar" : "Ingresa una contraseña segura"}
              style={getInputStyle(!!errors.contrasena)}
            />
            {errors.contrasena && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.25rem' }}>{errors.contrasena.message as string}</span>}
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="admin-btn admin-btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="admin-btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}