import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MembershipModule } from './membership/membership.module';
import { PaymentModule } from './payment/payment.module';
import { AuthGuard } from './shared/guards/AuthGuard.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/RoleGuard.guard';
import { JWTService } from './auth/services/JWT.service';

@Module({
  imports: [AuthModule, UsersModule, MembershipModule, PaymentModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    JWTService
  ]
})
export class AppModule {}
