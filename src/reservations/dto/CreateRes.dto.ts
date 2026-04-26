import { IsDate, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateResDto {
    @ApiProperty({ example: "f4a42766-c4e1-4c9b-a290-9b8562a3a3f2", description: "Id del socio" })
    @IsUUID()
    @IsNotEmpty()
    idUsuario!: string;

    @ApiProperty({ example: "3b4b340d-6cb4-42eb-a35e-bec0ca2516f5", description: "Id de la clase" })
    @IsNotEmpty()    
    @IsUUID()
    idClase!: string;

    @ApiProperty({ example: "2026-05-01T00:00:00.000Z", description: "Fecha de la reserva en formato ISO" })
    @IsNotEmpty()
    @IsDate()
    fechaReserva!: Date;
}