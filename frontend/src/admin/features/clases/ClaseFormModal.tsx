import { useEffect } from 'react';
import type { FC } from 'react';
import type { ClaseItem } from './useClases';
import { useForm } from 'react-hook-form';
import { useClases } from './useClases';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  claseToEdit: ClaseItem | null;
  onSubmit?: (data: ClaseItem | Partial<ClaseItem>) => void;
  setEditingClase?: React.Dispatch<React.SetStateAction<ClaseItem | null>>
}

interface FormValues {
  nombre: string;
  descripcion: string;
  dia: string;
  horario: string;
  duracionMinutos: number;
  cupo: number;
  idInstructor?: string;
}

export const ClaseFormModal: FC<Props> = ({ isOpen, onClose, claseToEdit, onSubmit }) => {
  const { createClase, updateClase } = useClases();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      nombre: claseToEdit?.nombre ??'',
      descripcion: claseToEdit?.descripcion ??'',
      dia: claseToEdit?.dia ?? '',
      horario: claseToEdit?.horario ?? '',
      duracionMinutos: claseToEdit?.duracionMinutos ?? 60,
      cupo: claseToEdit?.cupo ?? 20,
      idInstructor: claseToEdit?.idInstructor ?? '',
    }
  });

  // Resetea el formulario cuando se abre la modal o cambia la clase a editar
  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  // Estilo reutilizable para inputs
  const getInputStyle = (hasError: boolean) => ({
    boxSizing: 'border-box' as const,
    width: '100%',
    borderColor: hasError ? '#ef4444' : undefined,
  });

  // Estilo para el texto de error
  const errorTextStyle = { color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.25rem' };

  // Manejador para cerrar al hacer clic en el fondo oscuro
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const onSend = (data: FormValues) => {
    const payload = {
        ...data,
        duracionMinutos: Number(data.duracionMinutos),
        cupo: Number(data.cupo),
    };
    if (claseToEdit) {
      updateClase.mutate(
        { idClase: claseToEdit.idClase, ...payload },
        { onSuccess: onClose }
      );
    } else {
      createClase.mutate(payload as ClaseItem, { onSuccess: onClose });
    }
  };

  return (
    <div 
      className="admin-modal-overlay" 
      onClick={handleOverlayClick} 
      style={{ padding: '1rem', zIndex: 50 }}
    >
      <div 
        className="admin-modal-content" 
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">{claseToEdit ? 'Editar Clase' : 'Nueva Clase'}</h2>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Cerrar">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit ?? onSend)} className="admin-form">
          
          <div className="admin-form-group">
            <label>Nombre</label>
            <input 
              {...register('nombre', { required: 'El nombre es requerido' })} 
              style={getInputStyle(!!errors.nombre)}
              placeholder="Ej: Yoga para principiantes"
            />
            {errors.nombre && <span style={errorTextStyle}>{errors.nombre.message}</span>}
          </div>

          <div className="admin-form-group">
            <label>Descripción</label>
            <input 
              {...register('descripcion', { required: 'La descripción es requerida' })} 
              style={getInputStyle(!!errors.descripcion)}
              placeholder="Breve descripción de la clase"
            />
            {errors.descripcion && <span style={errorTextStyle}>{errors.descripcion.message}</span>}
          </div>

          {/* Fila Responsiva: Día y Horario */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div className="admin-form-group">
              <label>Día</label>
              <input 
                {...register('dia', { required: 'El día es requerido' })} 
                style={getInputStyle(!!errors.dia)}
                placeholder="Ej: Lunes" 
              />
              {errors.dia && <span style={errorTextStyle}>{errors.dia.message}</span>}
            </div>
            
            <div className="admin-form-group">
              <label>Horario</label>
              <input 
                type="time" 
                {...register('horario', { required: 'El horario es requerido' })} 
                style={getInputStyle(!!errors.horario)}
              />
              {errors.horario && <span style={errorTextStyle}>{errors.horario.message}</span>}
            </div>
          </div>

          {/* Fila Responsiva: Duración y Cupo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div className="admin-form-group">
              <label>Duración (minutos)</label>
              <input 
                type="number" 
                {...register('duracionMinutos', { 
                  required: 'La duración es requerida',
                  min: { value: 15, message: 'La clase debe durar al menos 15 min' }
                })} 
                style={getInputStyle(!!errors.duracionMinutos)}
              />
              {errors.duracionMinutos && <span style={errorTextStyle}>{errors.duracionMinutos.message}</span>}
            </div>
            
            <div className="admin-form-group">
              <label>Cupo máximo</label>
              <input 
                type="number" 
                {...register('cupo', { 
                  required: 'El cupo es requerido',
                  min: { value: 1, message: 'Debe haber al menos 1 lugar' }
                })} 
                style={getInputStyle(!!errors.cupo)}
              />
              {errors.cupo && <span style={errorTextStyle}>{errors.cupo.message}</span>}
            </div>
          </div>

          {/* ID Instructor: Solo visible si es creación */}
          {!claseToEdit && (
            <div className="admin-form-group">
              <label>ID del Instructor</label>
              <input 
                {...register('idInstructor', { required: 'El ID del instructor es obligatorio para nuevas clases' })} 
                style={getInputStyle(!!errors.idInstructor)}
                placeholder="UUID del instructor" 
              />
              {errors.idInstructor && <span style={errorTextStyle}>{errors.idInstructor.message}</span>}
            </div>
          )}

          <div className="admin-modal-footer">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className="admin-btn admin-btn-primary" 
              disabled={createClase.isPending || updateClase.isPending}
            >
              {createClase.isPending || updateClase.isPending ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};