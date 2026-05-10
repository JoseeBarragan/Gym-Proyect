import { useState } from 'react';
import {
  useMembershipTypes,
  useCreatePayment,
  useAssignMembership,
} from '../features/useSocio';
import { useAuth } from '../../auth/auth.context';
import { Check, CreditCard, X } from 'lucide-react';

export function SocioMembresiasPage() {
  const { data: membershipTypes, isLoading, error } = useMembershipTypes();
  const { user } = useAuth();
  const createPayment = useCreatePayment();
  const assignMembership = useAssignMembership();
  const [selectedMembership, setSelectedMembership] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePayment = (
    id: string,
    name: string,
    price: number,
  ) => {
    setSelectedMembership({ id, name, price });
    setShowModal(true);
  };

  const confirmPayment = () => {
    if (!selectedMembership || !user?.email) return;

    createPayment.mutate({
      email: user.email,
      idTipoMembresia: selectedMembership.id,
    });


    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error al cargar las membresías</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Membresías</h1>
        <p className="text-gray-400">
          Elige el plan perfecto para tu entrenamiento
        </p>
      </div>

      {membershipTypes?.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] rounded-2xl border border-gray-800">
          <CreditCard size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No hay membresías disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membershipTypes?.map((membership: any) => (
            <div
              key={membership.idTipoMembresia}
              className="bg-[#111111] rounded-2xl border border-gray-800 p-6 hover:border-blue-600 transition-colors duration-300 relative"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {membership.nombre}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{membership.descripcion}</p>

              <div className="mb-6">
                <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ${membership.precio}
                </div>
                <div className="text-gray-500 text-sm">
                  Duración: {membership.duracionDias} días
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {membership.caracteristicas?.map((caracteristica: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                    <Check size={16} className="text-green-500" />
                    <span>{caracteristica}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    handlePayment(
                      membership.idTipoMembresia,
                      membership.nombre,
                      membership.precio,
                    )
                  }
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-300"
                >
                  Pagar con Stripe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && selectedMembership && (
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

            <h2 className="text-2xl font-bold text-white mb-2">
              {'Confirmar Pago'}
            </h2>
            <p className="text-gray-400 mb-6">
              {
               `Vas a pagar la membresía `
              }
              <span className="text-blue-500">{selectedMembership.name}</span>
              {` por $${selectedMembership.price}`}.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmPayment}
                disabled={
                  createPayment.isPending || assignMembership.isPending
                }
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-xl font-medium transition-colors"
              >
                {
                  createPayment.isPending
                    ? 'Procesando...'
                    : 'Pagar'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
