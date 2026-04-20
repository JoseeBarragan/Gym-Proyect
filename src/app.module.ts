import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [AuthModule, UsersModule, MembershipModule]
})
export class AppModule {}
