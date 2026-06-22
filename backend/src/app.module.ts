import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MembershipModule } from './membership/membership.module';
import { PaymentModule } from './payment/payment.module';
import { AuthGuard } from './shared/guards/AuthGuard.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/RoleGuard.guard';
import { JWTService } from './auth/services/JWT.service';
import { ConfigModule } from '@nestjs/config';
import { ClaseModule } from './clase/clase.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TypeMembershipModule } from './typeMembership/type-membership.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [AuthModule, RedisModule, UsersModule, MembershipModule, PaymentModule, ClaseModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), ReservationsModule, TypeMembershipModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    JWTService
  ]
})
export class AppModule {}
