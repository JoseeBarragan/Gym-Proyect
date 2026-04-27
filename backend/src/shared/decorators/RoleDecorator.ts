import { SetMetadata } from "@nestjs/common";

export type Role = "Administrador" | "Instructor" | "Socio";
export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);