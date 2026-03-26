export type BillingCycle = 'monthly' | 'yearly' | 'one-time';
export type PricingCategory = 'WEBSITE' | 'WEB_APP' | 'MOBILE_APP' | 'BRANDING';

export interface PricingPlan {
  _id: string;
  id: string;
  name: string;
  price: number;
  currency: string;
  category: PricingCategory;
  billingCycle: BillingCycle;
  features: string[];
  description: string;
  isActive: boolean;
  displayOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePricingPlanDto {
  name: string;
  price: number;
  currency: string;
  category: PricingCategory;
  billingCycle: BillingCycle;
  features: string[];
  description?: string;
  isActive: boolean;
  displayOrder: number;
}

export type UpdatePricingPlanDto = CreatePricingPlanDto;

export interface PricingQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isActive?: boolean;
  category?: PricingCategory | string;
}

export interface PaginatedResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
