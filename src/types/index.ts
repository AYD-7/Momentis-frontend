export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  availableSlots: number;
  price: number;
  organizer: string;
  organizerEmail: string;
  category?: string;
  createdAt: string;
}

export interface Registration {
  _id: string;
  event: Event | string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Ticket {
  _id: string;
  ticketCode: string;
  registration: Registration | string;
  event: Event | string;
  attendeeName: string;
  attendeeEmail: string;
  qrCode?: string;
  status: 'valid' | 'used' | 'cancelled';
  usedAt?: string;
  scannedBy?: string;
  createdAt: string;
}

export interface RegistrationFormData {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface RegistrationResult {
  registration: Registration;
  ticket: { ticketCode: string; status: string; qrCode: string };
  slotsRemaining: number;
  emailPreviewUrl: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
