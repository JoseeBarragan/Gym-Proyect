import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';

export interface ReservaItem {
  idReserva: string;
  idClase: string;
  idSocio: string;
  fechaReserva: string;
  estadoReserva: string;
}

export function useClaseReservas(idClase: string | null) {
  return useQuery<ReservaItem[], Error>({
    queryKey: ['reservations', 'clase', idClase],
    queryFn: async () => {
      return fetchWithAuth(`/api/reservations/clase/${idClase}`);
    },
    enabled: !!idClase,
  });
}
