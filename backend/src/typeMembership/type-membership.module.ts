import { Module } from '@nestjs/common';
import { TypeMembershipController } from './type-membership.controller';
import { GetAllTypeMembershipService } from './type-membership.service';
import { TypeMembershipRepository } from './Repository/TypeMemRepository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TypeMembershipController],
  providers: [
    GetAllTypeMembershipService,
    {
      provide: 'ITypeMembershipRepository',
      useClass: TypeMembershipRepository,
    },
    PrismaService,
  ],
})
export class TypeMembershipModule {}
