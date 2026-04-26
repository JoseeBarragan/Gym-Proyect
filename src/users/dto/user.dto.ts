import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum TipoUsuario {
    ADMINISTRADOR = "Administrador",
    INSTRUCTOR = "Instructor",
    SOCIO = "Socio"
}

export class CreateUserDto {
    @ApiProperty({ example: "nuevo@gym.com", description: "Email unico del usuario" })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: "123456", description: "Contrasena del usuario" })
    @IsString()
    @IsNotEmpty()
    contrasena!: string;

    @ApiProperty({ example: "Ana", description: "Nombre" })
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty({ example: "Lopez", description: "Apellido" })
    @IsString()
    @IsNotEmpty()
    apellido!: string;

    @ApiProperty({ example: "1133445566", description: "Telefono" })
    @IsString()
    @IsNotEmpty()
    telefono!: string;

    @ApiProperty({ enum: TipoUsuario, example: TipoUsuario.SOCIO, description: "Rol del usuario" })
    @IsNotEmpty()
    @IsEnum(TipoUsuario)
    tipoUsuario!: TipoUsuario;
}

export class UpdateUserDto {
    @ApiPropertyOptional({ example: "nuevoemail@gym.com" })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: "newpass123" })
    @IsOptional()
    @IsString()
    contrasena?: string;

    @ApiPropertyOptional({ example: "Ana Maria" })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ example: "Lopez" })
    @IsOptional()
    @IsString()
    apellido?: string;

    @ApiPropertyOptional({ example: "1198765432" })
    @IsOptional()
    @IsString()
    telefono?: string;
}