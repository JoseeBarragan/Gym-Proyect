import { motion } from 'framer-motion';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Variants } from 'framer-motion';

interface PaymentSuccessPageProps {
  orderId?: string;
  amount?: string;
  paymentMethod?: string;
}

export function PaymentSuccessPage({
  orderId = 'GYM-2024-001',
  amount = '$50.00',
  paymentMethod = 'Tarjeta de Crédito',
}: PaymentSuccessPageProps) {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const details = [
    { label: 'ID de Orden', value: orderId },
    { label: 'Monto Pagado', value: amount, isBold: true },
    { label: 'Método de Pago', value: paymentMethod },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-green-200 bg-white/90 backdrop-blur-sm p-8 shadow-xl">
          <div className="flex flex-col items-center space-y-6 text-center">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-green-200"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
              <div className="relative rounded-full bg-green-100 p-6">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Pago Exitoso!
              </h1>
              <p className="mt-2 text-gray-600">
                Tu membresía ha sido activada correctamente
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full space-y-4 rounded-xl bg-gray-50 p-6"
            >
              {details.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span
                    className={`text-sm font-semibold ${
                      item.isBold ? 'text-lg text-gray-900' : 'text-gray-900'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full gap-3 pt-4"
            >
              <Button
                onClick={() => navigate('/home')}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-sm text-gray-500"
            >
              <div className="h-px w-12 bg-gray-300" />
              <span>Te hemos enviado un correo con los detalles</span>
              <div className="h-px w-12 bg-gray-300" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
