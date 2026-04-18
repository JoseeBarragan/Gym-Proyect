import { PrismaService } from "../../prisma.service";
import type { Usuario } from "@prisma/client";
import { LogInDto } from "../dto/login.dto";
import { IAuthRepository } from "./Interface";
import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
         @Inject(PrismaService) private readonly prisma: PrismaService
    ){}

    async login(user: LogInDto): Promise<Usuario | null> {
        try {
            return await this.prisma.usuario.findUnique({
                where: {email: user.email}
            });
        } catch(err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }
}