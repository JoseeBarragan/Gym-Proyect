import type { Usuario } from "@prisma/client";
import { CreateUserDto, TipoUsuario, UpdateUserDto } from "../dto/user.dto";

export interface IUsersRepository {
    getAll(tipoUsuario?: TipoUsuario): Promise<Usuario[]>;
    getById(id: string): Promise<Usuario | null>;
    getByEmail(email: string): Promise<Usuario | null>;
    create(user: CreateUserDto): Promise<Usuario>;
    getProfile(id: string): Promise<Usuario | null>;
    updateUser(id: string, user: UpdateUserDto): Promise<Usuario>;
    deleteUser(id: string): Promise<void>;
}