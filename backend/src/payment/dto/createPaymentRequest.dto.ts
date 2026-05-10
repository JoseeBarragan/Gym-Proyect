import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class CreatePaymentRequestDto {
    @ApiProperty({ example: "john.doe@example.com", description: "Email del socio que paga" })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: "2c779f72-cffd-494a-b77f-e4a6f34c72d4", description: "Id del tipo de membresia" })
    @IsUUID()
    @IsNotEmpty()
    idTipoMembresia!: string;
}
