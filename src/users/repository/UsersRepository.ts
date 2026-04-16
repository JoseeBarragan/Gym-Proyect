import { PrismaService } from "../../prisma.service";
import { IUsersRepository } from "./InterfaceRepository";
import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../dto/user.dto";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ){}

    async getAll(): Promise<Usuario[]> {
        try {
            const users = await this.prisma.usuario.findMany();
            
            return users;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    async getByEmail(email: string): Promise<Usuario | null> {
        try {
            return  await this.prisma.usuario.findUnique({
                where: {email: email}
            });
        } catch (err) {
            throw new Error(`${err}`)
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
            throw new Error(`${err}`)
        }
    }

}