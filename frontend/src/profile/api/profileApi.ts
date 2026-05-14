import { toast } from 'react-toastify';

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

function getProfileErrorMessage(status: number, isUpdate: boolean): string {
  if (status === 401) return 'No autorizado. Inicia sesión nuevamente.';
  if (status === 403) return isUpdate ? 'No tienes permisos para actualizar este perfil.' : 'No tienes permisos para ver este perfil.';
  if (status === 404) return 'Perfil no encontrado.';
  if (status === 409) return 'El email ya está en uso.';
  if (status === 500) return 'Error del servidor. Intenta más tarde.';
  return isUpdate ? 'Error al actualizar el perfil. Intenta nuevamente.' : 'Error al obtener el perfil. Intenta nuevamente.';
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  const isUpdate = options.method === 'PATCH' || options.method === 'POST';

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
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || getProfileErrorMessage(response.status, isUpdate);
    toast.error(message);
    throw new Error(message);
  }

  const data = await response.json();
  
  // Show success toast for non-GET requests
  if (isUpdate) {
    toast.success('Perfil actualizado exitosamente');
  }
  
  return data;
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
