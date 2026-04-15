import { Module } from '@nestjs/common';
import { LogInService } from './services/login.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/AuthRepository';
import { PasswordService } from './services/Password.service';

@Module({
  controllers: [AuthController],
  providers: [
    LogInService,
    {
      provide: "AuthRepository",
      useClass: AuthRepository
    },
    PasswordService
  ],
})
export class AuthModule {}
