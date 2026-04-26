import { Body, Controller, Post, Res } from '@nestjs/common';
import { LogInService } from './services/login.service';
import { LogInDto } from './dto/login.dto';
import { CreateUserDto } from "../users/dto/user.dto";
import { SignUpService } from './services/signUp.service';
import type { Response } from 'express';
import { Public } from '../shared/decorators/PublicDecorator';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
  constructor(
    private readonly logInService: LogInService,
    private readonly signUpService: SignUpService
  ) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: 'Iniciar sesion', description: 'Autentica al usuario con email y contrasena, retorna JWT y tambien setea cookie httpOnly.' })
  @ApiBody({ type: LogInDto })
  @ApiOkResponse({
    description: 'Login exitoso',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Credenciales invalidas o token invalido' })
  @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
  async logIn(@Body() user: LogInDto, @Res() res: Response){
    const token = await this.logInService.execute(user)

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).send({ token: token});
  }

  @Public()
  @Post("signup")
  @ApiOperation({ summary: 'Registrar usuario', description: 'Crea un nuevo usuario en el sistema.' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Usuario creado correctamente',
    schema: {
      example: {
        idUsuario: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2',
        email: 'nuevo@gym.com',
        contrasena: '$2b$10$...',
        nombre: 'Ana',
        apellido: 'Lopez',
        telefono: '1133445566',
        tipoUsuario: 'Socio'
      }
    }
  })
  @ApiConflictResponse({ description: 'El usuario ya existe' })
  @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
  async signUp(@Body() user: CreateUserDto){
    return await this.signUpService.execute(user)
  }

}
