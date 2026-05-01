import { useEffect } from 'react';
import type { FC } from 'react';
import type { ClaseItem } from './useClases';
import { useForm } from 'react-hook-form';
import { useClases } from './useClases';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  claseToEdit: ClaseItem | null;
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

export const ClaseFormModal: FC<Props> = ({ isOpen, onClose, claseToEdit }) => {
  const { createClase, updateClase } = useClases();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    if (claseToEdit) {
      reset({
        nombre: claseToEdit.nombre,
        descripcion: claseToEdit.descripcion,
        dia: claseToEdit.dia,
        horario: claseToEdit.horario,
        duracionMinutos: claseToEdit.duracionMinutos,
        cupo: claseToEdit.cupo,
        idInstructor: claseToEdit.idInstructor,
      });
    } else {
      reset({
        nombre: '',
        descripcion: '',
        dia: '',
        horario: '',
        duracionMinutos: 60,
        cupo: 20,
        idInstructor: '',
      });
    }
  }, [claseToEdit, reset, isOpen]);

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
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
      // NOTE: En el backend create necesita idInstructor sí o sí
      createClase.mutate(payload as any, { onSuccess: onClose });
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">{claseToEdit ? 'Editar Clase' : 'Nueva Clase'}</h2>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
          <div className="admin-form-group">
            <label>Nombre</label>
            <input {...register('nombre', { required: true })} />
          </div>
          <div className="admin-form-group">
            <label>Descripción</label>
            <input {...register('descripcion', { required: true })} />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Día</label>
              <input {...register('dia', { required: true })} placeholder="Ej: Lunes" />
            </div>
            <div className="admin-form-group">
              <label>Horario</label>
              <input {...register('horario', { required: true })} type="time" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Duración (min)</label>
              <input {...register('duracionMinutos', { required: true, valueAsNumber: true })} type="number" />
            </div>
            <div className="admin-form-group">
              <label>Cupo</label>
              <input {...register('cupo', { required: true, valueAsNumber: true })} type="number" />
            </div>
          </div>
          {!claseToEdit && (
            <div className="admin-form-group">
                <label>ID Instructor</label>
                <input {...register('idInstructor', { required: true })} placeholder="UUID del instructor" />
            </div>
          )}
          <div className="admin-modal-footer">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={createClase.isPending || updateClase.isPending}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
