import apiClient from '@/lib/api/client';
import {
  PricingPlan,
  CreatePricingPlanDto,
  UpdatePricingPlanDto,
  PricingQueryParams,
  PaginatedResponse,
} from '@/types/pricing';

export async function getPricingPlans(params: PricingQueryParams): Promise<PaginatedResponse<PricingPlan>> {
  const { data } = await apiClient.get<PaginatedResponse<PricingPlan>>('/pricing', { params });
  return data;
}

export async function getActivePlans(): Promise<PricingPlan[]> {
  const { data } = await apiClient.get<PricingPlan[]>('/pricing/active');
  return data;
}

export async function getPlanById(id: string): Promise<PricingPlan> {
  const { data } = await apiClient.get<PricingPlan>(`/pricing/${id}`);
  return data;
}

export async function createPlan(dto: CreatePricingPlanDto): Promise<PricingPlan> {
  const { data } = await apiClient.post<PricingPlan>('/pricing', dto);
  return data;
}

export async function updatePlan(id: string, dto: UpdatePricingPlanDto): Promise<PricingPlan> {
  const { data } = await apiClient.put<PricingPlan>(`/pricing/${id}`, dto);
  return data;
}

export async function patchPlan(id: string, dto: Partial<UpdatePricingPlanDto>): Promise<PricingPlan> {
  const { data } = await apiClient.patch<PricingPlan>(`/pricing/${id}`, dto);
  return data;
}

export async function togglePlanStatus(id: string): Promise<PricingPlan> {
  const { data } = await apiClient.patch<PricingPlan>(`/pricing/${id}/toggle-status`);
  return data;
}

export async function deletePlan(id: string): Promise<void> {
  await apiClient.delete(`/pricing/${id}`);
}
