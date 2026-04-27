import { Module } from '@nestjs/common';
import { LogInService } from './services/login.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/AuthRepository';
import { PasswordService } from './services/Password.service';
import { UsersRepository } from '../users/repository/UsersRepository';
import { PrismaService } from '../prisma.service';
import { SignUpService } from './services/signUp.service';
import { JWTService } from './services/JWT.service';

@Module({
  controllers: [AuthController],
  providers: [
    LogInService,
    SignUpService,
    {
      provide: "AuthRepository",
      useClass: AuthRepository
    },
    PasswordService,
    {
      provide: "UserRepository",
      useClass: UsersRepository
    },
    PrismaService,
    JWTService
  ],
})
export class AuthModule {}
