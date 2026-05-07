import { useUserReservations, useCancelReservation, useClases } from '../features/useSocio';
import { useAuth } from '../../auth/auth.context';
import { Calendar, X } from 'lucide-react';
import { useState } from 'react';

export function SocioReservasPage() {
  const { user } = useAuth();
  const [userId] = useState<string>(user?.email?.split('@')[0] || '');
  const { data: reservations, isLoading, error, refetch } = useUserReservations(userId);
  const { data: clases } = useClases();
  const cancelReservation = useCancelReservation();
  const [selectedReserva, setSelectedReserva] = useState<{ id: string; nombre: string } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getClaseName = (claseId: string) => {
    const clase = clases?.find((c: any) => c.idClase === claseId);
    return clase?.nombre || 'Clase desconocida';
  };

  const handleCancel = (reservaId: string, nombre: string) => {
    setSelectedReserva({ id: reservaId, nombre });
    setShowModal(true);
  };

  const confirmCancel = () => {
    if (selectedReserva) {
      cancelReservation.mutate(selectedReserva.id, {
        onSuccess: () => {
          refetch();
          setShowModal(false);
        },
      });
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Reservada':
        return 'bg-blue-600/20 text-blue-500';
      case 'Asistio':
        return 'bg-green-600/20 text-green-500';
      case 'Cancelada':
        return 'bg-red-600/20 text-red-500';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error al cargar las reservas</p>
      </div>
    );
  }

  const filteredReservations = reservations?.filter((r: any) => r.idUsuario === userId) || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Mis Reservas</h1>
        <p className="text-gray-400">Historial de tus reservas de clases</p>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] rounded-2xl border border-gray-800">
          <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No tienes reservas registradas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((reserva: any) => (
            <div
              key={reserva.idReserva}
              className="bg-[#111111] rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {getClaseName(reserva.idClase)}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        reserva.estadoReserva
                      )}`}
                    >
                      {reserva.estadoReserva}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span className="text-sm">
                      {new Date(reserva.fechaReserva).toLocaleDateString()}
                    </span>
                  </div>
                  {reserva.estadoReserva === 'Reservada' && (
                    <button
                      onClick={() =>
                        handleCancel(reserva.idReserva, getClaseName(reserva.idClase))
                      }
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedReserva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#111111] rounded-2xl border border-gray-800 p-6 max-w-md w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Cancelar Reserva</h2>
            <p className="text-gray-400 mb-6">
              ¿Estás seguro que deseas cancelar tu reserva para la clase{' '}
              <span className="text-blue-500">{selectedReserva.nombre}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
              >
                Volver
              </button>
              <button
                onClick={confirmCancel}
                disabled={cancelReservation.isPending}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-xl font-medium transition-colors"
              >
                {cancelReservation.isPending ? 'Cancelando...' : 'Confirmar Cancelación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
