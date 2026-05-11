import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface MembershipType {
  idTipoMembresia: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
}

async function getMembershipTypes(): Promise<MembershipType[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/typeMembership`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener membresías');
  }
  return response.json();
}

export function useMembershipTypes() {
  return useQuery({
    queryKey: ['membershipTypes'],
    queryFn: getMembershipTypes,
  });
}
