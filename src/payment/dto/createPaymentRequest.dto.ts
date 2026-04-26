import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreatePaymentRequestDto {
    @ApiProperty({ example: "f4a42766-c4e1-4c9b-a290-9b8562a3a3f2", description: "Id del socio que paga" })
    @IsUUID()
    @IsNotEmpty()
    idSocio!: string;

    @ApiProperty({ example: "2c779f72-cffd-494a-b77f-e4a6f34c72d4", description: "Id del tipo de membresia" })
    @IsUUID()
    @IsNotEmpty()
    idTipoMembresia!: string;
}
