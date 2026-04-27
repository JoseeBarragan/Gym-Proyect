import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Roles } from "../shared/decorators/RoleDecorator";
import { GetAllClasesService } from "./services/getAllClases.service";
import { GetByIdClaseService } from "./services/getById.service";
import { CreateClaseDto, UpdateClaseDto } from "./dto/clase.dto";
import { CreateClaseService } from "./services/CreateClase.service";
import { UpdateClaseService } from "./services/UpdateClase.service";
import { DeleteClaseService } from "./services/DeleteClase.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse, ApiBody, ApiInternalServerErrorResponse } from "@nestjs/swagger";


@ApiTags('Clase')
@ApiBearerAuth()
@Controller()
export class ClaseController {
    constructor(
        private readonly getAllClasesService: GetAllClasesService,
        private readonly getByIdClaseService: GetByIdClaseService,
        private readonly createClaseService: CreateClaseService,
        private readonly updateClaseService: UpdateClaseService,
        private readonly deleteClaseService: DeleteClaseService
    ) {}

    @Get("")
    @Roles("Administrador", "Instructor")
    @ApiOperation({ summary: 'Listar clases', description: 'Devuelve todas las clases del sistema.' })
    @ApiOkResponse({
        description: 'Listado de clases',
        schema: {
            example: [
                {
                    idClase: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5',
                    idInstructor: 'a6f332e0-c0f7-4c88-91d5-c48f1dbf6e0f',
                    nombre: 'Yoga',
                    descripcion: 'Clase de yoga inicial',
                    dia: 'Lunes',
                    horario: '09:00',
                    activa: true,
                    duracionMinutos: 60,
                    cupo: 20
                }
            ]
        }
    })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async getClases() {
        return await this.getAllClasesService.execute();
    }

    @Get("/:id")
    @ApiOperation({ summary: 'Obtener clase por id', description: 'Devuelve una clase por su identificador.' })
    @ApiParam({ name: 'id', example: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5' })
    @ApiOkResponse({ description: 'Clase encontrada' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async getClaseById(@Param("id") id: string) {
        return await this.getByIdClaseService.execute(id);
    }

    @Roles("Administrador")
    @Post("")
    @ApiOperation({ summary: 'Crear clase', description: 'Crea una clase y valida que el instructor exista y sea de tipo Instructor.' })
    @ApiBody({ type: CreateClaseDto })
    @ApiCreatedResponse({ description: 'Clase creada correctamente' })
    @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    @ApiInternalServerErrorResponse({ description: 'Instructor no encontrado u otro error no controlado' })
    async createClase(@Body() createClaseDto: CreateClaseDto) {
        return await this.createClaseService.execute(createClaseDto);
    }

    @Roles("Administrador")
    @Patch("/:id")
    @ApiOperation({ summary: 'Actualizar clase', description: 'Actualiza datos de una clase existente.' })
    @ApiParam({ name: 'id', example: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5' })
    @ApiBody({ type: UpdateClaseDto })
    @ApiOkResponse({ description: 'Clase actualizada correctamente' })
    @ApiNotFoundResponse({ description: 'Clase no encontrada' })
    @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async updateClase(@Param("id") id: string, @Body() updateClaseDto: UpdateClaseDto) {
        return await this.updateClaseService.execute(id, updateClaseDto);
    }

    @Roles("Administrador")
    @Delete("/:id")
    @ApiOperation({ summary: 'Eliminar clase', description: 'Elimina una clase por id.' })
    @ApiParam({ name: 'id', example: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5' })
    @ApiNoContentResponse({ description: 'Clase eliminada correctamente' })
    @ApiNotFoundResponse({ description: 'Clase no encontrada' })
    @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
    @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
    async deleteClase(@Param("id") id: string) {
        return await this.deleteClaseService.execute(id);
    }
}