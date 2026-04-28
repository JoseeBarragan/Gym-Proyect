export type AuthMode = 'login' | 'signup';

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
}
