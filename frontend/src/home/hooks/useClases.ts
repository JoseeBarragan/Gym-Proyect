import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Clase {
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

async function getClases(): Promise<Clase[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/Clase`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener clases');
  }
  return response.json();
}

export function useClases() {
  return useQuery({
    queryKey: ['clases'],
    queryFn: getClases,
  });
}
