import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JWTService } from "../../auth/services/JWT.service";
import { Request } from "express";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JWTService,
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true 

        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        console.log(!authHeader || !authHeader.startsWith("Bearer "))

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token no proporcionado");
        }

        const cookies = request.cookies as Record<string, string | undefined>;
        const cookieToken = cookies?.access_token;
        const headerToken = request.headers['authorization']?.replace("Bearer ", "");
        const token = cookieToken ?? headerToken;

        if (!token) {
            throw new UnauthorizedException("Token no proporcionado");
        }

        const payload = this.jwtService.verifyAccessToken(token);

        if (!payload) {
            throw new UnauthorizedException("Token inválido o expirado");
        }

        request["user"] = payload;
        return true;
    }
}