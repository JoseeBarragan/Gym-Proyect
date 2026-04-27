import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GetProfileService } from './services/getProfile.service';
import { GetAllUsersService } from './services/getAllUsers.service';
import { CreateUserDto, TipoUsuario, UpdateUserDto } from './dto/user.dto';
import { UpdateUserService } from './services/updateUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { CreateInstructorService } from './services/createInstructor.service';
import { Roles } from '../shared/decorators/RoleDecorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller("users")
export class UsersController {
    constructor(
        private readonly getProfileService: GetProfileService,
        private readonly getAllUsersService: GetAllUsersService,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
        private readonly createInstructorService: CreateInstructorService

    ) {}

    @Get("profile/:id")
    @ApiOperation({ summary: 'Obtener perfil por id', description: 'Devuelve la informacion de un usuario por id.' })
    @ApiParam({ name: 'id', example: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2' })
    @ApiOkResponse({
        description: 'Perfil encontrado',
        schema: {
            example: {
                idUsuario: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2',
                email: 'socio@gym.com',
                contrasena: '$2b$10$...',
                nombre: 'Ana',
                apellido: 'Lopez',
                telefono: '1133445566',
                tipoUsuario: 'Socio'
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async getProfile(@Param("id") id: string){
        return await this.getProfileService.execute(id);
    }

    @Roles("Administrador")
    @Get("")
    @ApiOperation({ summary: 'Listar usuarios', description: 'Lista todos los usuarios y permite filtrar por tipoUsuario.' })
    @ApiQuery({ name: 'tipoUsuario', required: false, enum: TipoUsuario, example: TipoUsuario.SOCIO })
    @ApiOkResponse({
        description: 'Listado de usuarios',
        schema: {
            example: [
                {
                    idUsuario: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2',
                    email: 'socio@gym.com',
                    contrasena: '$2b$10$...',
                    nombre: 'Ana',
                    apellido: 'Lopez',
                    telefono: '1133445566',
                    tipoUsuario: 'Socio'
                }
            ]
        }
    })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async getAllUsers(@Query("tipoUsuario") tipoUsuario: TipoUsuario){
        return await this.getAllUsersService.execute(tipoUsuario);
    }

    @Patch("profile/:id")
    @ApiOperation({ summary: 'Actualizar perfil', description: 'Actualiza datos del usuario. Si envia contrasena, se guarda hasheada.' })
    @ApiParam({ name: 'id', example: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2' })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({ description: 'Usuario actualizado correctamente' })
    @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
    @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async updateProfile(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){   
        return await this.updateUserService.execute(id, updateUserDto);
    }

    @Roles("Administrador")
    @Delete(":id")
    @ApiOperation({ summary: 'Eliminar usuario', description: 'Elimina un usuario por id.' })
    @ApiParam({ name: 'id', example: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2' })
    @ApiNoContentResponse({ description: 'Usuario eliminado correctamente' })
    @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async deleteUser(@Param("id") id: string) {
        return await this.deleteUserService.execute(id);
    }

    @Roles("Administrador")
    @Post("instructor")
    @ApiOperation({ summary: 'Crear instructor', description: 'Crea un usuario de tipo Instructor. El tipo enviado se fuerza a Instructor en el servicio.' })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({
        description: 'Instructor creado correctamente',
        schema: {
            example: null
        }
    })
    @ApiConflictResponse({ description: 'El email ya esta registrado' })
    @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async createInstructor(@Body() createUserDto: CreateUserDto) {
        await this.createInstructorService.execute(createUserDto);
        return;
    }
}
