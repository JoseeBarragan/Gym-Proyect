import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateResDto {
    @ApiProperty({ example: "john.doe@example.com", description: "Email del socio" })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: "3b4b340d-6cb4-42eb-a35e-bec0ca2516f5", description: "Id de la clase" })
    @IsNotEmpty()    
    @IsUUID()
    idClase!: string;
}