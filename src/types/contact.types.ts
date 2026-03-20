/**
 * TypeScript types for the Contact Management feature.
 */

export type ContactStatus = 'new' | 'in-progress' | 'resolved';

export interface Contact {
  id: string;
  name: string;
  email: string;
  service: string;
  projectDetails: string;
  status: ContactStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactStats {
  new: number;
  inProgress: number;
  resolved: number;
  total: number;
}

// ─── API Params ───────────────────────────────────────────────────────────────

export interface GetContactsParams {
  search?: string;
  status?: ContactStatus | '';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
}

// ─── API Response shapes ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedContacts {
  contacts: Contact[];
  total: number;
  page: number;
  totalPages: number;
}

// ─── Mutation payloads ────────────────────────────────────────────────────────

export interface UpdateContactPayload {
  status?: ContactStatus;
  adminNotes?: string;
}

export interface UpdateStatusPayload {
  status: ContactStatus;
}
