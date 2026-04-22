import { Module } from '@nestjs/common';
import { PayMembershipService } from './services/payMembership.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './repository/PaymentRepository';
import { PrismaService } from '../prisma.service';
import { TypeMembershipRepository } from '../typeMembership/Repository/TypeMemRepository';
import { StripeService } from '../stripe.service';

@Module({
  controllers: [PaymentController],
  providers: [
    PayMembershipService,
    {
      provide: "IPaymentRepository",
      useClass: PaymentRepository
    },
    {
      provide: "TypeMembershipRepository",
      useClass: TypeMembershipRepository
    },
    PrismaService,
    StripeService
  ],
})
export class PaymentModule {}
