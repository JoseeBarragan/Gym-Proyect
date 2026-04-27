import { Module } from '@nestjs/common';
import { CreatePaymentService } from './services/createPayment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './repository/PaymentRepository';
import { PrismaService } from '../prisma.service';
import { TypeMembershipRepository } from '../typeMembership/Repository/TypeMemRepository';
import { StripeService } from '../stripe.service';
import { AsignMembershipService } from '../membership/services/AsignMembership.service';
import { RegisterPaymentService } from './services/RegisterPayment.service';
import { MembershipRepository } from '../membership/repository/MembershipRepository';
import { HandleWebHookService } from './services/handleWebHook.service';

@Module({
  controllers: [PaymentController],
  providers: [
    CreatePaymentService,
    {
      provide: "IPaymentRepository",
      useClass: PaymentRepository
    },
    {
      provide: "TypeMembershipRepository",
      useClass: TypeMembershipRepository
    },
    {
      provide: "MembershipRepository",
      useClass: MembershipRepository
    },
    PrismaService,
    StripeService,
    AsignMembershipService,
    RegisterPaymentService,
    HandleWebHookService
  ],
})
export class PaymentModule {}
