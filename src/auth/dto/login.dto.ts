import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class LogInDto {
    @ApiProperty({ example: "socio@gym.com", description: "Email del usuario" })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    
    @ApiProperty({ example: "123456", description: "Contrasena en texto plano" })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsNotEmpty()
    @IsString()
    contrasena!: string;
}