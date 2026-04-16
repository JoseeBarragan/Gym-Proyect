import type { Usuario } from "@prisma/client";
import { CreateUserDto } from "../dto/user.dto";

export interface IUsersRepository {
    getAll(): Promise<Usuario[]>;
    getByEmail(email: string): Promise<Usuario | null>;
    create(user: CreateUserDto): Promise<Usuario>;
}