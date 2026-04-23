import { Module } from "@nestjs/common";
import { ClaseController } from "./clase.controller";
import { ClaseRepository } from "./repository/ClasesRepository";
import { PrismaService } from "../prisma.service";
import { GetAllClasesService } from "./services/getAllClases.service";
import { GetByIdClaseService } from "./services/getById.service";
import { UsersRepository } from "../users/repository/UsersRepository";
import { UpdateClaseService } from "./services/UpdateClase.service";
import { DeleteClaseService } from "./services/DeleteClase.service";


Module({
    controllers: [ClaseController],
    providers: [
        {
            provide: "ClasesRepository",
            useClass: ClaseRepository
        },
        {
            provide: "UserRepository",
            useClass: UsersRepository
        },
        PrismaService,
        GetAllClasesService,
        GetByIdClaseService,
        UpdateClaseService,
        DeleteClaseService
    ]
})

export class ClaseModule {}