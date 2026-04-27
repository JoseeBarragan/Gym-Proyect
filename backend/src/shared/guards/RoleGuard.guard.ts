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

        if (!roles) return true;

        const request = context.switchToHttp().getRequest<AuthRequest>();
        const user = request.user;

        // here you should check the users role data with the database but for simplicity we will just check the role from the token

        if (!roles.includes(user?.tipoUsuario)) {
            throw new ForbiddenException("No tenés permisos para realizar esta acción");
        }

        return true;
    }
}