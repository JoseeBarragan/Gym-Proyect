import { Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { AsignMembershipService } from './services/AsignMembership.service';
import { MembershipRepository } from './repository/MembershipRepository';
import { TypeMembershipRepository } from '../typeMembership/Repository/TypeMemRepository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MembershipController],
  providers: [
    AsignMembershipService,
    {
      provide: "MembershipRepository",
      useClass: MembershipRepository
    },
    {
      provide: "TypeMembershipRepository",
      useClass: TypeMembershipRepository
    },
    PrismaService
  ],
})
export class MembershipModule {}
