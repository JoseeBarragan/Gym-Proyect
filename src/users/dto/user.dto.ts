import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export enum TipoUsuario {
    ADMINISTRADOR = "Administrador",
    INSTRUCTOR = "Instructor",
    SOCIO = "Socio"
}

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    @IsNotEmpty()
    contrasena!: string;
    @IsNotEmpty()
    nombre!: string;
    @IsNotEmpty()
    apellido!: string;
    @IsNotEmpty()
    telefono!: string;
    @IsNotEmpty()
    @IsEnum(TipoUsuario)
    tipoUsuario!: TipoUsuario;
}