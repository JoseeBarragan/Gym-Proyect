import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Variants } from 'framer-motion';

interface PaymentCancelPageProps {
  orderId?: string;
  reason?: string;
}

export function PaymentCancelPage({
  orderId = 'GYM-2024-001',
  reason = 'El pago fue cancelado por el usuario',
}: PaymentCancelPageProps) {
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

  const benefits = [
    'Acceso ilimitado a todas las instalaciones',
    'Clases grupales sin cargo adicional',
    'Seguimiento personalizado con entrenadores',
    'Horarios flexibles los 7 días de la semana',
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-orange-200 bg-white/90 backdrop-blur-sm p-8 shadow-xl">
          <div className="flex flex-col items-center space-y-6 text-center">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <div className="rounded-full bg-orange-100 p-6">
                  <XCircle className="h-16 w-16 text-orange-600" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold text-gray-900">
                Pago Cancelado
              </h1>
              <p className="mt-2 text-gray-600">
                {reason}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full rounded-xl bg-gray-50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ID de Orden</span>
                <span className="text-sm font-mono font-semibold text-gray-900">
                  {orderId}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <HelpCircle className="h-4 w-4" />
                <span>¿Sabías que puedes obtener?</span>
              </div>
              <ul className="space-y-2 text-left">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col gap-3 pt-4"
            >
              <Button
                onClick={() => navigate('/socio/membresias')}
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar Nuevamente
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/home')}
                className="w-full"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-sm text-gray-500"
            >
              <div className="h-px w-8 bg-gray-300" />
              <span>¿Necesitas ayuda? Contáctanos</span>
              <div className="h-px w-8 bg-gray-300" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
