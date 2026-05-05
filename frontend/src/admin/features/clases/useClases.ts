import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import type { UserItem } from '../users/useUsers';

export interface ClaseItem {
  idClase: string;
  idInstructor: string;
  nombre: string;
  descripcion: string;
  dia: string;
  horario: string;
  activa: boolean;
  duracionMinutos: number;
  cupo: number;
}

export function useClases() {
  const queryClient = useQueryClient();

  const clasesQuery = useQuery<ClaseItem[], Error>({
    queryKey: ['clases'],
    queryFn: async () => {
      return fetchWithAuth('/Clase', {
        credentials: "include"
      });
    },
  });

  const instructoresQuery = useQuery<UserItem[], Error>({
    queryKey: ['instructores'],
    queryFn: async () => {
      return fetchWithAuth('/users/instructores', {
        credentials: "include"
      });
    }
  });

  const createClase = useMutation({
    mutationFn: async (data: Omit<ClaseItem, 'idClase' | 'activa'>) => {
      return fetchWithAuth('/Clase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clases'] });
      toast.success('Clase creada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al crear clase: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });

  const updateClase = useMutation({
    mutationFn: async (data: Partial<ClaseItem> & { idClase: string }) => {
      const { idClase, ...rest } = data;
      return fetchWithAuth(`/Clase/${idClase}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clases'] });
      toast.success('Clase actualizada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar clase: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });

  const toggleClaseState = useMutation({
    mutationFn: async (data: { id: string; activa: boolean }) => {
      const endpoint = data.activa ? 'active' : 'inactive';
      return fetchWithAuth(`/api/clase/${endpoint}/${data.id}`, {
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clases'] });
      toast.success('Estado de clase actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar estado: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });

  const removeClase = useMutation({
    mutationFn: async (id: string) => {
      return fetchWithAuth(`/api/clase/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clases'] });
      toast.success('Clase eliminada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar clase: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });

  return {
    data: clasesQuery.data,
    isLoading: clasesQuery.isLoading,
    isError: clasesQuery.isError,
    createClase,
    updateClase,
    toggleClaseState,
    removeClase,
    instructores: instructoresQuery.data
  };
}
