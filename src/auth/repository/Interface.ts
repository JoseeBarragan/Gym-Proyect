import { Usuario } from "../../generated/prisma/client";
import { LogInDto } from "../dto/login.dto";

export interface IAuthRepository {
    login(user: LogInDto): Promise<Usuario>;
}