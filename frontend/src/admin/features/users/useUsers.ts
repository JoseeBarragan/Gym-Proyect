import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';

export interface UserItem {
  id: string;
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
      const endpoint = data.tipoUsuario === 'Instructor' ? '/Users/instructor' : '/auth/signup';
      return fetchWithAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return fetchWithAuth(`/users/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
