import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { IClasesRepository } from "./IClasesRepository";
import { PrismaService } from "../../prisma.service";
import { Clase } from "@prisma/client";
import { CreateClaseDto, UpdateClaseDto } from "../dto/clase.dto";


@Injectable()
export class ClaseRepository implements IClasesRepository {
    constructor(
        private readonly prisma: PrismaService 
    ) {}

    async getAll(): Promise<Clase[]> {
       try {
            return await this.prisma.clase.findMany();
       } catch (err) {
            throw new ServiceUnavailableException(`Error al obtener las clases: ${err}`)
       }
    }

    async getById(id: string): Promise<Clase | null> {
        try {
            return await this.prisma.clase.findUnique({
                where: {idClase: id}
            });
       } catch (err) {
            throw new ServiceUnavailableException(`Error al obtener la clase por ID: ${err}`)
       }
    }

    async create(clase: CreateClaseDto): Promise<Clase> {
        try {
            return await this.prisma.clase.create({
                data: clase
            })
        } catch (err) {
            throw new ServiceUnavailableException(`Error al crear la clase: ${err}`)
        }
    }
    
    async update(id: string, clase: UpdateClaseDto): Promise<Clase> {
        try {
            return await this.prisma.clase.update({
                where: {idClase: id},
                data: clase
            })
        } catch (err) {
            throw new ServiceUnavailableException(`Error al actualizar la clase: ${err}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.clase.delete({
                where: {idClase: id}
            });
            
            return 
        } catch (err) {
            throw new ServiceUnavailableException(`Error al eliminar la clase: ${err}`)
        }
    }
}