import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum TipoUsuario {
    ADMINISTRADOR = "Administrador",
    INSTRUCTOR = "Instructor",
    SOCIO = "Socio"
}

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    contrasena!: string;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    apellido!: string;

    @IsString()
    @IsNotEmpty()
    telefono!: string;

    @IsNotEmpty()
    @IsEnum(TipoUsuario)
    tipoUsuario!: TipoUsuario;
}

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsString()
    contrasena?: string;

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    apellido?: string;

    @IsOptional()
    @IsString()
    telefono?: string;
}