import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreateClaseDto {
    @ApiProperty({ example: "a6f332e0-c0f7-4c88-91d5-c48f1dbf6e0f", description: "Id del instructor" })
    @IsUUID()
    idInstructor!: string;

    @ApiProperty({ example: "Yoga", maxLength: 70 })
    @IsString()
    @MaxLength(70)
    nombre!: string;

    @ApiProperty({ example: "Clase de yoga inicial", maxLength: 255 })
    @IsString()
    @MaxLength(255)
    descripcion!: string;

    @ApiProperty({ example: "Lunes", maxLength: 15 })
    @IsString()
    @MaxLength(15)
    dia!: string;

    @ApiProperty({ example: "09:00", maxLength: 10 })
    @IsString()
    @MaxLength(10)
    horario!: string;

    @ApiProperty({ example: 60, minimum: 1 })
    @IsInt()
    @Min(1)
    duracionMinutos!: number;

    @ApiProperty({ example: 20, minimum: 1 })
    @IsInt()
    @Min(1)
    cupo!: number;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}

export class UpdateClaseDto {
    @ApiPropertyOptional({ example: "a6f332e0-c0f7-4c88-91d5-c48f1dbf6e0f" })
    @IsUUID()
    @IsOptional()
    idInstructor?: string;

    @ApiPropertyOptional({ example: "Yoga avanzado", maxLength: 70 })
    @IsString()
    @MaxLength(70)
    @IsOptional()
    nombre?: string;

    @ApiPropertyOptional({ example: "Clase intermedia", maxLength: 255 })
    @IsString()
    @MaxLength(255)
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({ example: "Martes", maxLength: 15 })
    @IsString()
    @MaxLength(15)
    @IsOptional()
    dia?: string;

    @ApiPropertyOptional({ example: "18:30", maxLength: 10 })
    @IsString()
    @MaxLength(10)
    @IsOptional()
    horario?: string;

    @ApiPropertyOptional({ example: 45, minimum: 1 })
    @IsInt()
    @Min(1)
    @IsOptional()
    duracionMinutos?: number;

    @ApiPropertyOptional({ example: 15, minimum: 1 })
    @IsInt()
    @Min(1)
    @IsOptional()
    cupo?: number;

    @ApiPropertyOptional({ example: false })
    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}