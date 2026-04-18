import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import { Usuario } from "@prisma/client";

@Injectable()
export class JWTService {
    
    generateAccessToken(userData: Usuario): string {
        return jwt.sign({ email: userData.email, nombre: userData.nombre, apellido: userData.apellido, tipoUsuario: userData.tipoUsuario }, process.env.JWT_SECRET_KEY || "default", { expiresIn: '1h' });
    }

    verifyAccessToken(token: string): Usuario | null {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY || "default") as Usuario;
        } catch (err) {
            return null;
        }
    }
}