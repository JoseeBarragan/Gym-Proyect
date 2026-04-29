import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IUsersRepository } from "../repository/InterfaceRepository";
import { CreateUserDto, TipoUsuario } from "../dto/user.dto";
import { PasswordService } from "../../auth/services/Password.service";


@Injectable()
export class CreateInstructorService {
    constructor(
        @Inject("UserRepository") private readonly usersRepository: IUsersRepository,
        private readonly passwordService: PasswordService,
    ){}

    async execute(user: CreateUserDto): Promise<void> {
        const isUser = await this.usersRepository.getByEmail(user.email);

        if(isUser) {
            throw new ConflictException("El email ya está registrado");
        }

        const newUser = {
            ...user,
            contrasena: await this.passwordService.hash(user.contrasena),
            tipoUsuario: TipoUsuario.INSTRUCTOR
        }

        await this.usersRepository.create(newUser)
        return
    }
}