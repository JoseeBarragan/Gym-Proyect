type TipoUsuario = 'Administrador' | 'Socio' | 'Instructor';

type Usuario = {
  email: string;
  nombre: string;
  apellido: string;
  tipoUsuario: TipoUsuario;
};