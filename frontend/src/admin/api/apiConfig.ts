import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getErrorMessage(endpoint: string, method: string, status: number): string {
  if (status === 401) return 'No autorizado. Inicia sesión nuevamente.';
  if (status === 403) return 'No tienes permisos para realizar esta acción.';
  if (status === 404) return 'Recurso no encontrado.';
  if (status === 409) return 'Conflicto. El recurso ya existe.';
  if (status === 500) return 'Error del servidor. Intenta más tarde.';
  
  if (endpoint === '/Clase') return method === 'GET' ? 'Error al obtener las clases.' : 'Error al procesar la clase.';
  if (endpoint === '/users') return method === 'GET' ? 'Error al obtener los usuarios.' : 'Error al procesar el usuario.';
  if (endpoint === '/users/instructores') return 'Error al obtener los instructores.';
  if (endpoint === '/payment') return 'Error al procesar el pago.';
  
  return 'Error en la petición a la API';
}

function getSuccessMessage(endpoint: string, method: string): string {
  if (endpoint === '/Clase') return method === 'GET' ? 'Clases obtenidas exitosamente' : 'Clase procesada exitosamente';
  if (endpoint === '/users') return method === 'GET' ? 'Usuarios obtenidos exitosamente' : 'Usuario procesado exitosamente';
  if (endpoint === '/users/instructores') return 'Instructores obtenidos exitosamente';
  if (endpoint === '/payment') return 'Pago procesado exitosamente';
  
  return 'Operación exitosa';
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  const method = options.method || 'GET';

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
    const message = errorData.message || getErrorMessage(endpoint, method, response.status);
    toast.error(message);
    throw new Error(message);
  }

  const data = await response.json();
  
  // Show success toast for non-GET requests
  if (method !== 'GET') {
    toast.success(getSuccessMessage(endpoint, method));
  }
  
  return data;
}
