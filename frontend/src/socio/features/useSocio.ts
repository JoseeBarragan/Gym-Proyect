import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllClases,
  getClaseById,
  createReservation,
  cancelReservation,
  getUserReservations,
  getClassReservations,
  getMembershipTypes,
  assignMembership,
  createPayment,
  type CreateReservationBody,
  type AssignMembershipBody,
  type CreatePaymentBody,
} from '../api/socioApi';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export interface ClaseItem {
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

export interface ReservaItem {
  idReserva: string;
  idClase: string;
  idSocio: string;
  fechaReserva: string;
  estadoReserva: string;
  asistencia?: boolean | null;
}

export interface MembershipType {
  idTipoMembresia: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
}

export function useSocioAuth() {
  const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
      return jwtDecode<{ email: string; nombre: string; apellido: string; tipoUsuario: string }>(token);
    } catch {
      return null;
    }
  };

  const token = getToken();

  return {
    user: token,
    isAuthenticated: !!token,
    userId: token?.email.split('@')[0], // This is a placeholder, adjust based on actual JWT structure
  };
}

export function useClases() {
  return useQuery({
    queryKey: ['clases'],
    queryFn: getAllClases,
  });
}

export function useClase(id: string) {
  return useQuery({
    queryKey: ['clase', id],
    queryFn: () => getClaseById(id),
    enabled: !!id,
  });
}

export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationBody) => createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['clases'] });
      toast.success('Reserva creada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al crear reserva: ${error.message}`);
    },
  });
}

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      toast.success('Reserva cancelada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al cancelar reserva: ${error.message}`);
    },
  });
}

export function useUserReservations(userId?: string) {
  return useQuery({
    queryKey: ['reservas', userId],
    queryFn: () => getUserReservations(userId!),
    enabled: !!userId,
  });
}

export function useClassReservations(claseId: string) {
  return useQuery({
    queryKey: ['class-reservations', claseId],
    queryFn: () => getClassReservations(claseId),
    enabled: !!claseId,
  });
}

export function useMembershipTypes() {
  return useQuery({
    queryKey: ['membershipTypes'],
    queryFn: getMembershipTypes,
  });
}

export function useAssignMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignMembershipBody) => assignMembership(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membershipTypes'] });
      toast.success('Membresía asignada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al asignar membresía: ${error.message}`);
    },
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: (data: CreatePaymentBody) => createPayment(data),
    onSuccess: (response) => {
      // Redirect to Stripe checkout URL
      if (response) {
        window.location.href = response;
      }
    },
    onError: (error: Error) => {
      toast.error(`Error al crear pago: ${error.message}`);
    },
  });
}
