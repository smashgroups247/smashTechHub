import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type PricingCategory = 'WEBSITE' | 'WEB_APP' | 'MOBILE_APP' | 'BRANDING';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  description: string;
  displayOrder: number;
  isActive: boolean;
  category: PricingCategory;
}

export const fetchActivePricingPlans = async (): Promise<PricingPlan[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const response = await axios.get(`${API_URL}/api/v1/pricing/active`);
  return response.data.data;
};

export const usePricingPlans = () => {
  return useQuery({
    queryKey: ['pricingPlans', 'active'],
    queryFn: fetchActivePricingPlans,
    staleTime: 5 * 60 * 1000,
  });
};
