/**
 * API endpoints for Socio features
 * Based on backend source code analysis
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function for authenticated requests
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
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
    const error = await response.json().catch(() => ({ message: 'Error en la petición' }));
    throw new Error(error.message || 'Error en la petición a la API');
  }

  return response.json();
}

// ==================== CLASES ====================

/**
 * GET /Clase
 * Roles: Administrador, Instructor
 * Returns all classes
 */
export async function getAllClases() {
  return fetchWithAuth('/Clase');
}

/**
 * GET /Clase/:id
 * Returns a single class by ID
 */
export async function getClaseById(id: string) {
  return fetchWithAuth(`/Clase/${id}`);
}

// ==================== RESERVAS ====================

/**
 * POST /reservations
 * Roles: Socio
 * Creates a reservation for a class
 */
export interface CreateReservationBody {
  email: string;
  idClase: string;
}

export async function createReservation(data: CreateReservationBody) {
  return fetchWithAuth('/reservations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE /reservations/:id
 * Roles: Socio
 * Cancels a reservation
 */
export async function cancelReservation(id: string) {
  return fetchWithAuth(`/reservations/${id}`, {
    method: 'DELETE',
  });
}

/**
 * GET /reservations/:id
 * Roles: Socio
 * Gets all reservations for a user
 */
export async function getUserReservations(email: string) {
  return fetchWithAuth(`/reservations/${email}`);
}

/**
 * GET /reservations/clase/:idClase
 * Roles: Administrador, Instructor
 * Gets all reservations for a class
 */
export async function getClassReservations(claseId: string) {
  return fetchWithAuth(`/reservations/clase/${claseId}`);
}

// ==================== MEMBRESÍAS ====================

/**
 * GET /typeMembership
 * Returns all membership types
 */
export async function getMembershipTypes() {
  return fetchWithAuth('/typeMembership');
}

/**
 * POST /membership/asign
 * Roles: Socio
 * Assigns a membership to a user
 */
export interface AssignMembershipBody {
  idSocio: string;
  idTipoMembresia: string;
}

export async function assignMembership(data: AssignMembershipBody) {
  return fetchWithAuth('/membership/asign', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== PAGOS ====================

/**
 * POST /payment/createPayment
 * Roles: Administrador (but used by Socio for checkout)
 * Creates a payment session and returns checkout URL
 */
export interface CreatePaymentBody {
  email: string;
  idTipoMembresia: string;
}

export async function createPayment(data: CreatePaymentBody) {
  return fetchWithAuth('/payment/createPayment', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * GET /payment/success
 * Public endpoint - payment success callback
 */
export const PAYMENT_SUCCESS_URL = '/payment/success';

/**
 * GET /payment/cancel
 * Public endpoint - payment cancel callback
 */
export const PAYMENT_CANCEL_URL = '/payment/cancel';
