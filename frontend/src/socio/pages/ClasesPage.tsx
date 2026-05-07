import { useState } from 'react';
import { useClases, useCreateReservation, useUserReservations } from '../features/useSocio';
import { useAuth } from '../../auth/auth.context';
import { Calendar, Clock, TrendingUp, User, X } from 'lucide-react';

export function SocioClassesPage() {
  const { data: clases, isLoading, error } = useClases();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<{ id: string; nombre: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const createReservation = useCreateReservation();
  const { data: reservations } = useUserReservations(user?.email);

  const handleReserve = (claseId: string, nombre: string) => {
    setSelectedClass({ id: claseId, nombre });
    setShowModal(true);
  };

  const confirmReservation = () => {
    if (!selectedClass || !user?.email) return;

    const today = new Date();
    createReservation.mutate({
      idUsuario: user.email.split('@')[0], // TODO: Get actual user ID from JWT
      idClase: selectedClass.id,
      fechaReserva: today.toISOString(),
    });

    setShowModal(false);
  };

  const isReserved = (claseId: string) => {
    if (!reservations) return false;
    return reservations.some((r: any) => r.idClase === claseId && r.estadoReserva === 'Reservada');
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
        <p className="text-red-500 text-lg">Error al cargar las clases</p>
      </div>
    );
  }

  const activeClasses = clases?.filter((c: any) => c.activa) || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Clases Disponibles</h1>
        <p className="text-gray-400">Reserva tu lugar en las clases grupales</p>
      </div>

      {activeClasses.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] rounded-2xl border border-gray-800">
          <User size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No hay clases disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeClasses.map((clase: any) => {
            const reserved = isReserved(clase.idClase);

            return (
              <div
                key={clase.idClase}
                className="bg-[#111111] rounded-2xl border border-gray-800 p-6 hover:border-blue-600 transition-colors duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{clase.nombre}</h3>
                  <p className="text-gray-400 text-sm">{clase.descripcion}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={18} />
                    <span className="text-sm">{clase.dia}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Clock size={18} />
                    <span className="text-sm">{clase.horario}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <TrendingUp size={18} />
                    <span className="text-sm">{clase.duracionMinutos} min</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <User size={18} />
                    <span className="text-sm">Cupo: {clase.cupo}</span>
                  </div>
                </div>

                {reserved ? (
                  <div className="w-full py-3 bg-green-600/20 text-green-500 rounded-xl text-center font-medium">
                    Reservado
                  </div>
                ) : (
                  <button
                    onClick={() => handleReserve(clase.idClase, clase.nombre)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-300"
                  >
                    Reservar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && selectedClass && (
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

            <h2 className="text-2xl font-bold text-white mb-2">Confirmar Reserva</h2>
            <p className="text-gray-400 mb-6">
              ¿Estás seguro que deseas reservar un lugar en la clase{' '}
              <span className="text-blue-500">{selectedClass.nombre}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReservation}
                disabled={createReservation.isPending}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-xl font-medium transition-colors"
              >
                {createReservation.isPending ? 'Reservando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
