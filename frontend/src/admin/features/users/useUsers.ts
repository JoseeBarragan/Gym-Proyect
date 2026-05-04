import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export interface UserItem {
  idUsuario: string;
  contrasena?: string;
  telefono?: string;
  nombre?: string;
  apellido?: string;
  email: string;
  tipoUsuario?: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async (): Promise<UserItem[]> => {
      // Ajusta este endpoint basado en tu users.controller.ts
      return fetchWithAuth('/users', {
        credentials: "include"
      }); 
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserItem) => {
      const endpoint = '/Users/instructor'
      return fetchWithAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Usuario creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al crear usuario: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UserItem> }) => {
      return fetchWithAuth(`/Users/profile/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        credentials: "include"
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Usuario actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar usuario: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return fetchWithAuth(`/users/${id}`, {
        method: 'DELETE',
        credentials: "include"
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Usuario eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar usuario: ${error.message || 'Ocurrió un error inesperado'}`);
    },
  });
}
