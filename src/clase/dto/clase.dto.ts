import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";


export class CreateClaseDto {
    @IsUUID()
    idInstructor!: string;

    @IsString()
    @MaxLength(70)
    nombre!: string;

    @IsString()
    @MaxLength(255)
    descripcion!: string;

    @IsString()
    @MaxLength(15)
    dia!: string;

    @IsString()
    @MaxLength(10)
    horario!: string;

    @IsInt()
    @Min(1)
    duracionMinutos!: number;

    @IsInt()
    @Min(1)
    cupo!: number;

    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}

export class UpdateClaseDto {
    @IsUUID()
    @IsOptional()
    idInstructor?: string;

    @IsString()
    @MaxLength(70)
    @IsOptional()
    nombre?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    descripcion?: string;

    @IsString()
    @MaxLength(15)
    @IsOptional()
    dia?: string;

    @IsString()
    @MaxLength(10)
    @IsOptional()
    horario?: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    duracionMinutos?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    cupo?: number;

    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}