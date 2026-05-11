type TipoUsuario = 'Administrador' | 'Socio' | 'Instructor';

type Usuario = {
  idUsuario?: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  tipoUsuario: TipoUsuario;
};