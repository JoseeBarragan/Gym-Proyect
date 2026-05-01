import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';

export interface MembresiaItem {
  idMembresia: string;
  idSocio: string;
  fechaInico: string;
  fechaVencimiento: string;
  estadoMembresia: string;
  idTipoMembresia: string;
}

export function useMembresias() {
  return useQuery<MembresiaItem[], Error>({
    queryKey: ['membresias'],
    queryFn: async () => {
      const response = await fetchWithAuth('/membership');
      if (!response.ok) throw new Error('Error al obtener membresías');
      return response.json();
    },
  });
}
