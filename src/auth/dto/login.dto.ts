import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class LogInDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    contrasena!: string;
}