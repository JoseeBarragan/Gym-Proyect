import { IsDate, IsNotEmpty, IsUUID } from "class-validator";


export class CreateResDto {
    @IsUUID()
    @IsNotEmpty()
    idUsuario!: string;

    @IsNotEmpty()    
    @IsUUID()
    idClase!: string;

    @IsNotEmpty()
    @IsDate()
    fechaReserva!: Date;
}