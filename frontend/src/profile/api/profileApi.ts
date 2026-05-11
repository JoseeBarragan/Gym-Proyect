const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ProfileData {
  idUsuario?: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string | null;
  tipoUsuario?: string;
}

export interface UpdateProfilePayload {
  email?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  contrasena?: string;
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en la peticion' }));
    throw new Error(error.message || 'Error en la peticion a la API');
  }

  return response.json();
}

export async function getProfile(email: string): Promise<ProfileData> {
  return fetchWithAuth(`/users/profile/${email}`);
}

export async function updateProfile(email: string, data: UpdateProfilePayload): Promise<ProfileData> {
  return fetchWithAuth(`/users/profile/${email}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
