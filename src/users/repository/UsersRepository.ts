import { PrismaService } from "../../prisma.service";
import { IUsersRepository } from "./InterfaceRepository";
import { Usuario } from "@prisma/client";
import { CreateUserDto, TipoUsuario, UpdateUserDto } from "../dto/user.dto";
import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ){}

    async getAll(tipoUsuario?: TipoUsuario): Promise<Usuario[]> {
        try {
            const argument = tipoUsuario ? {
                where: {tipoUsuario: tipoUsuario}
            } : undefined;

            const users = await this.prisma.usuario.findMany(argument);
            
            return users;
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }

    async getById(id: string): Promise<Usuario | null> {
        try {
            return await this.prisma.usuario.findUnique({
                where: {idUsuario: id}
            });
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }

    async getByEmail(email: string): Promise<Usuario | null> {
        try {
            return  await this.prisma.usuario.findUnique({
                where: {email: email}
            });
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }

    async create(user: CreateUserDto): Promise<Usuario> {
        try {
            return await this.prisma.usuario.create({
                data: {
                    email: user.email,
                    contrasena: user.contrasena,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    telefono: user.telefono,
                    tipoUsuario: user.tipoUsuario
                }
             });
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }

    async getProfile(id: string): Promise<Usuario | null> {
        try {
            return await this.prisma.usuario.findUnique({
                where: {idUsuario: id}
            });
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }

    async updateUser(id: string, user: UpdateUserDto): Promise<Usuario> {
        try {
            return await this.prisma.usuario.update({
                where: {idUsuario: id},
                data: {
                    email: user.email,
                    contrasena: user.contrasena,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    telefono: user.telefono
                }
            });
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.prisma.usuario.delete({
                where: {idUsuario: id}
            });
        } catch (err) {
            throw new ServiceUnavailableException(`${err}`)
        }
    }
}