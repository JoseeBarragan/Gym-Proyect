import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../api/apiConfig';

export interface PagoItem {
  idPago: string;
  monto: number;
  fechaPago: string;
  stripePaymentId: string;
  estadoPago: string;
  idMembresia: string;
}

export function usePagos() {
  return useQuery<PagoItem[], Error>({
    queryKey: ['pagos'],
    queryFn: async () => {
      const response = await fetchWithAuth('/payment');
      if (!response.ok) throw new Error('Error al obtener pagos');
      return response.json();
    },
  });
}
