/**
 * Contact API service layer.
 * All contact-related HTTP calls live here — components never call apiClient directly.
 */
import apiClient from './client';
import type {
  ApiResponse,
  Contact,
  ContactStats,
  GetContactsParams,
  PaginatedContacts,
  UpdateContactPayload,
  UpdateStatusPayload,
} from '@/types/contact.types';

export const contactApi = {
  /**
   * GET /contact
   * Returns a paginated list of contact submissions with optional filters.
   */
  getContacts: async (params: GetContactsParams = {}): Promise<ApiResponse<PaginatedContacts>> => {
    // Strip empty/undefined params so they don't pollute the query string
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== '' && v !== undefined),
    );
    // Backend returns data as array and pagination separately, we must map it.
    const { data } = await apiClient.get<any>('/contact', {
      params: cleanParams,
    });

    return {
      success: data.success,
      message: data.message,
      data: {
        contacts: (data.data || []).map(mapContact),
        total: data.pagination?.total || 0,
        page: data.pagination?.page || 1,
        totalPages: data.pagination?.totalPages || 1,
      },
    };
  },

  /**
   * GET /contact/stats
   * Returns aggregate counts per status.
   */
  getStats: async (): Promise<ApiResponse<ContactStats>> => {
    const { data } = await apiClient.get<ApiResponse<ContactStats>>('/contact/stats');
    return data;
  },

  /**
   * GET /contact/:id
   * Fetches a single contact submission.
   */
  getContactById: async (id: string): Promise<ApiResponse<Contact>> => {
    const { data } = await apiClient.get<any>(`/contact/${id}`);
    return {
      success: data.success,
      message: data.message,
      data: mapContact(data.data),
    };
  },

  /**
   * PATCH /contact/:id
   * Updates status and/or adminNotes.
   */
  updateContact: async (
    id: string,
    payload: UpdateContactPayload,
  ): Promise<ApiResponse<Contact>> => {
    const { data } = await apiClient.patch<any>(`/contact/${id}`, payload);
    return {
      success: data.success,
      message: data.message,
      data: mapContact(data.data),
    };
  },

  /**
   * PATCH /contact/:id/status
   * Quick status-only update (optimistic UI).
   */
  updateStatus: async (
    id: string,
    payload: UpdateStatusPayload,
  ): Promise<ApiResponse<Contact>> => {
    const { data } = await apiClient.patch<any>(
      `/contact/${id}/status`,
      payload,
    );
    return {
      success: data.success,
      message: data.message,
      data: mapContact(data.data),
    };
  },

  /**
   * DELETE /contact/:id
   */
  deleteContact: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/contact/${id}`);
    return data;
  },
};

// Map backend structure to frontend structure
function mapContact(item: any): Contact {
  if (!item) return item;
  return {
    id: item.id || item._id,
    name: item.fullName,
    email: item.email,
    service: item.serviceOfInterest,
    projectDetails: item.projectDetails,
    status: item.status,
    adminNotes: item.adminNotes || '',
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}
