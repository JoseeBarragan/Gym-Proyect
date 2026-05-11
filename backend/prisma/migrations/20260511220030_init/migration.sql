-- CreateEnum
CREATE TYPE "EstadoMembresia" AS ENUM ('Activa', 'Cancelada', 'Expirada');

-- CreateEnum
CREATE TYPE "EstadoPago" AS ENUM ('Pendiente', 'Completado', 'Fallido');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('Reservada', 'Cancelada');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('Administrador', 'Instructor', 'Socio');

-- CreateTable
CREATE TABLE "Clase" (
    "idClase" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idInstructor" UUID NOT NULL,
    "nombre" VARCHAR(70) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "dia" VARCHAR(15) NOT NULL,
    "horario" VARCHAR(10) NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "duracionMinutos" INTEGER NOT NULL,
    "cupo" INTEGER NOT NULL,

    CONSTRAINT "Clase_pkey" PRIMARY KEY ("idClase")
);

-- CreateTable
CREATE TABLE "Membresia" (
    "idMembresia" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idSocio" UUID NOT NULL,
    "fechaInico" DATE NOT NULL,
    "fechaVencimiento" DATE NOT NULL,
    "estadoMembresia" "EstadoMembresia" NOT NULL,
    "idTipoMembresia" UUID NOT NULL,

    CONSTRAINT "Membresia_pkey" PRIMARY KEY ("idMembresia")
);

-- CreateTable
CREATE TABLE "Pago" (
    "idPago" UUID NOT NULL DEFAULT gen_random_uuid(),
    "monto" INTEGER NOT NULL,
    "fechaPago" DATE NOT NULL,
    "stripePaymentId" VARCHAR(255) NOT NULL,
    "estadoPago" "EstadoPago" NOT NULL,
    "idMembresia" UUID NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("idPago")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "idReserva" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idClase" UUID NOT NULL,
    "idSocio" UUID NOT NULL,
    "estadoReserva" "EstadoReserva" NOT NULL,
    "asistencia" BOOLEAN,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("idReserva")
);

-- CreateTable
CREATE TABLE "TipoMembresia" (
    "idTipoMembresia" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "duracionDias" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,

    CONSTRAINT "TipoMembresia_pkey" PRIMARY KEY ("idTipoMembresia")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(50) NOT NULL,
    "contrasena" VARCHAR(100) NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "apellido" VARCHAR(20) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "tipoUsuario" "TipoUsuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "nombreClaseUC" ON "Clase"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "idMembresia" ON "Membresia"("idMembresia");

-- CreateIndex
CREATE UNIQUE INDEX "stripeUC" ON "Pago"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "idMembresiaUC" ON "Pago"("idMembresia");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_idSocio_idClase_key" ON "Reserva"("idSocio", "idClase");

-- CreateIndex
CREATE UNIQUE INDEX "nombreUC" ON "TipoMembresia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "emailUC" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "idInstructorFK" FOREIGN KEY ("idInstructor") REFERENCES "Usuario"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Membresia" ADD CONSTRAINT "idSocioFK" FOREIGN KEY ("idSocio") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Membresia" ADD CONSTRAINT "idTMFK" FOREIGN KEY ("idTipoMembresia") REFERENCES "TipoMembresia"("idTipoMembresia") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "idMembreciaFK" FOREIGN KEY ("idMembresia") REFERENCES "Membresia"("idMembresia") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "idClaseFK" FOREIGN KEY ("idClase") REFERENCES "Clase"("idClase") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "idSocioFK" FOREIGN KEY ("idSocio") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE NO ACTION;
