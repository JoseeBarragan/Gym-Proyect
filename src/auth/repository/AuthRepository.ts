import { PrismaService } from "../../prisma.service";
import { LogInDto } from "../dto/login.dto";
import { IAuthRepository } from "./Interface";

export class AuthRepository implements IAuthRepository {
    constructor(private readonly prisma: PrismaService){}

    async login(user: LogInDto) {
        try {
            return await this.prisma.usuario.findUnique({
                where: {email: user.email}
            });
        } catch(err) {
            throw new Error(`${err}`)
        }
    }
}