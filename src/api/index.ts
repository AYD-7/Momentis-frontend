import axios from 'axios';
import type { ApiResponse, Event, Registration, Ticket, RegistrationFormData, RegistrationResult } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

const adminApi = axios.create({
  baseURL: '/api/admin',
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': import.meta.env.VITE_ADMIN_KEY || 'admin123',
  },
});

// Events
export const getAllEvents = () =>
  api.get<ApiResponse<Event[]>>('/events');

export const getEventById = (id: string) =>
  api.get<ApiResponse<Event>>(`/events/${id}`);

// Registrations
export const registerForEvent = (data: RegistrationFormData) =>
  api.post<ApiResponse<RegistrationResult>>('/registrations', data);

export const getRegistration = (id: string) =>
  api.get<ApiResponse<{ registration: Registration; ticket: Ticket }>>(`/registrations/${id}`);

export const cancelRegistration = (id: string) =>
  api.patch<ApiResponse<{ registration: Registration }>>(`/registrations/${id}/cancel`);

// Tickets
export const getTicket = (code: string) =>
  api.get<ApiResponse<Ticket>>(`/tickets/${code}`);

export const validateTicket = (code: string, scannedBy = 'manual') =>
  api.post<ApiResponse<{ attendeeName: string; event: string; usedAt: string }>>(
    `/tickets/validate/${code}`,
    { scannedBy }
  );

// Admin
export const adminGetAllEvents = () =>
  adminApi.get('/events');

export const adminGetRegistrations = (eventId: string) =>
  adminApi.get(`/events/${eventId}/registrations`);
