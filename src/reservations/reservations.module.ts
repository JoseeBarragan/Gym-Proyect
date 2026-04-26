import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './repository/ReservationRepository';
import { PrismaService } from '../prisma.service';
import { DeleteReservationService } from './services/deleteReservation.service';
import { CreateReservationsService } from './services/createReservations.service';
import { GetSocioReservationsService } from './services/getSocioReservations.service';
import { GetClaseReservationsService } from './services/getClaseReservations.service';
import { MembershipRepository } from '../membership/repository/MembershipRepository';
import { ClaseRepository } from '../clase/repository/ClasesRepository';
@Module({
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    DeleteReservationService,
    GetSocioReservationsService,
    GetClaseReservationsService,
    {
      provide: "ClasesRepository",
      useClass: ClaseRepository
    },
    {
      provide: "ReservationsRepository",
      useClass: ReservationRepository
    },
    {
      provide: "MembershipRepository",
      useClass: MembershipRepository
    },
    {
      provide: "ClasesRepository",
      useClass: ClaseRepository
    },
    PrismaService
  ],
})
export class ReservationsModule {}
