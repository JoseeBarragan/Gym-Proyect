import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';

export interface UserItem {
  id: string | number;
  name?: string;
  nombre?: string;
  apellido?: string;
  email: string;
  role?: string;
  tipoUsuario?: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async (): Promise<UserItem[]> => {
      // Ajusta este endpoint basado en tu users.controller.ts
      return fetchWithAuth('/users'); 
    },
  });
}
