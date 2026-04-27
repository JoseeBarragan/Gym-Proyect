import { Clase } from "@prisma/client";
import { CreateClaseDto, UpdateClaseDto } from "../dto/clase.dto";

export interface IClasesRepository {
    getAll(): Promise<Clase[]>;
    getById(id: string): Promise<Clase | null>;
    create(clase: CreateClaseDto): Promise<Clase>;
    update(id: string, clase: UpdateClaseDto): Promise<Clase>;
    delete(id: string): Promise<void>;
}