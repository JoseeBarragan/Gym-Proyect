import type { Usuario } from "@prisma/client";
import { LogInDto } from "../dto/login.dto";

export interface IAuthRepository {
    login(user: LogInDto): Promise<Usuario | null>;
}