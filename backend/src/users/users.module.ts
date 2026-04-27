import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetProfileService } from './services/getProfile.service';
import { UsersRepository } from './repository/UsersRepository';
import { PrismaService } from '../prisma.service';
import { GetAllUsersService } from './services/getAllUsers.service';
import { UpdateUserService } from './services/updateUser.service';
import { PasswordService } from '../auth/services/Password.service';
import { DeleteUserService } from './services/deleteUser.service';
import { CreateInstructorService } from './services/createInstructor.service';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: "UserRepository",
      useClass: UsersRepository
    },
    GetProfileService,
    GetAllUsersService,
    UpdateUserService,
    PasswordService,
    DeleteUserService,
    CreateInstructorService
  ]
})
export class UsersModule {}
