// common/guards/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../decorators/RoleDecorator";
import { AuthRequest } from "../types/AuthRequest";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>("roles", [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) return true; // si no tiene @Roles, cualquiera puede acceder

        const request = context.switchToHttp().getRequest<AuthRequest>();
        const user = request.user;

        if (!roles.includes(user?.tipoUsuario)) {
            throw new ForbiddenException("No tenés permisos para realizar esta acción");
        }

        return true;
    }
}