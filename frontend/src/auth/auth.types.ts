export type UserRole = 'Administrador' | 'Socio' | 'Instructor';

export interface AuthUser {
  email: string;
  tipoUsuario: UserRole;
}
