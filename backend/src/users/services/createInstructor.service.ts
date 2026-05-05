import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IUsersRepository } from "../repository/InterfaceRepository";
import { CreateInstructorDto, TipoUsuario } from "../dto/user.dto";
import { PasswordService } from "../../auth/services/Password.service";


@Injectable()
export class CreateInstructorService {
    constructor(
        @Inject("UserRepository") private readonly usersRepository: IUsersRepository,
        private readonly passwordService: PasswordService,
    ){}

    async execute(instructor: CreateInstructorDto): Promise<void> {
        const isUser = await this.usersRepository.getByEmail(instructor.email);

        if(isUser) {
            throw new ConflictException("El email ya está registrado");
        }

        const newUser = {
            ...instructor,
            contrasena: await this.passwordService.hash(instructor.contrasena),
            tipoUsuario: TipoUsuario.INSTRUCTOR
        }

        await this.usersRepository.create(newUser)
        return
    }
}