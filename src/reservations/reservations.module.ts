import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './repository/ReservationRepository';
import { PrismaService } from '../prisma.service';
import { DeleteReservationService } from './services/deleteReservation.service';
import { CreateReservationsService } from './services/createReservations.service';
import { GetSocioReservationsService } from './services/getSocioReservations.service';
import { GetClaseReservationsService } from './services/getClaseReservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    DeleteReservationService,
    GetSocioReservationsService,
    GetClaseReservationsService,
    {
      provide: "ReservationsRepository",
      useClass: ReservationRepository
    },
    PrismaService
  ],
})
export class ReservationsModule {}
