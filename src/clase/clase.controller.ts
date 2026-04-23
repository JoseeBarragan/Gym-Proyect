import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Roles } from "../shared/decorators/RoleDecorator";
import { GetAllClasesService } from "./services/getAllClases.service";
import { GetByIdClaseService } from "./services/getById.service";
import { CreateClaseDto, UpdateClaseDto } from "./dto/clase.dto";
import { CreateClaseService } from "./services/CreateClase.service";
import { UpdateClaseService } from "./services/UpdateClase.service";
import { DeleteClaseService } from "./services/DeleteClase.service";


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
    async getClases() {
        return await this.getAllClasesService.execute();
    }

    @Get("/:id")
    async getClaseById(@Param("id") id: string) {
        return await this.getByIdClaseService.execute(id);
    }

    @Roles("Administrador")
    @Post("")
    async createClase(@Body() createClaseDto: CreateClaseDto) {
        return await this.createClaseService.execute(createClaseDto);
    }

    @Roles("Administrador")
    @Patch("/:id")
    async updateClase(@Param("id") id: string, @Body() updateClaseDto: UpdateClaseDto) {
        return await this.updateClaseService.execute(id, updateClaseDto);
    }

    @Roles("Administrador")
    @Delete("/:id")
    async deleteClase(@Param("id") id: string) {
        return await this.deleteClaseService.execute(id);
    }
}