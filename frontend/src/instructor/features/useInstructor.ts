import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '../../admin/api/apiConfig';
import { toast } from 'react-toastify';

export interface ClaseInstructor {
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

export interface Reservation {
  idReserva: string;
  idClase: string;
  idSocio: string;
  fechaReserva: string;
  estadoReserva: string;
  asistencia: boolean | null;
  Usuario?: {
    idUsuario: string;
    nombre: string;
    apellido: string;
    email: string;
    tipoUsuario: string;
  };
}

export interface StudentInClass {
  idUsuario: string;
  nombre: string;
  apellido: string;
  email: string;
  foto?: string;
  asistio?: boolean;
  reservaId?: string;
}

export function useInstructorClasses(instructorId?: string) {
  const query = useQuery<ClaseInstructor[]>({
    queryKey: ['instructor-classes'],
    queryFn: async () => {
      return fetchWithAuth('/Clase', {
        credentials: "include"
      });
    },
  });

  return {
    data: query.data?.filter(clase => {
      if (!instructorId) return true;
      return clase.idInstructor === instructorId;
    }),
    allClasses: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export function useClassReservations(claseId: string) {
  const query = useQuery<Reservation[]>({
    queryKey: ['class-reservations', claseId],
    queryFn: async () => {
      return fetchWithAuth(`/reservations/clase/${claseId}`, {
        credentials: "include"
      });
    },
    enabled: !!claseId,
  });

  const students: StudentInClass[] = query.data?.map(reservation => ({
    idUsuario: reservation.Usuario?.idUsuario || reservation.idSocio,
    nombre: reservation.Usuario?.nombre || '',
    apellido: reservation.Usuario?.apellido || '',
    email: reservation.Usuario?.email || '',
    asistio: reservation.asistencia ?? undefined,
    reservaId: reservation.idReserva,
  })) || [];

  return {
    data: query.data,
    students,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export function useUpdateReservationAttendance() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reservationId, asistio }: { 
      reservationId: string;
      asistio: boolean;
    }) => {
      const endpoint = `/reservations/${reservationId}/asistencia`;
      return fetchWithAuth(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asistencia: asistio }),
        credentials: "include"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-reservations'] });
      toast.success('Asistencia actualizada correctamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar asistencia: ${error.message || 'Ocurrió un error'}`);
    },
  });
}
