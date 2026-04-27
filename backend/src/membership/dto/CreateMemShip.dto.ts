import { IsDate, IsNotEmpty } from "class-validator";

export class CreateMemberShipDto {
    @IsDate()
    @IsNotEmpty()
    fechaInicio!: Date;

    @IsDate()
    @IsNotEmpty()
    fechaVencimiento!: Date;
}