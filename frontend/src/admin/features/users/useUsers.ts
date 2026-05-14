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
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al crear usuario');
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
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar usuario');
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
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar usuario');
    },
  });
}
