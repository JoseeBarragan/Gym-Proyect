import type { Usuario } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

export interface IUsersRepository {
    getAll(): Promise<Usuario[]>;
    getByEmail(email: string): Promise<Usuario | null>;
    create(user: CreateUserDto): Promise<Usuario>;
    getProfile(id: string): Promise<Usuario | null>;
    updateUser(id: string, user: UpdateUserDto): Promise<Usuario>;
    deteleUser(id: string): Promise<void>;
}