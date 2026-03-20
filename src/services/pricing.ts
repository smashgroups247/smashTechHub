import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly" | "one-time";
  features: string[];
  description: string;
  displayOrder: number;
  isActive: boolean;
  category?: string;
}

export const fetchActivePricingPlans = async (): Promise<PricingPlan[]> => {
  const response = await axios.get('http://localhost:3001/api/v1/pricing/active');
  return response.data.data;
};

export const usePricingPlans = () => {
  return useQuery({
    queryKey: ['pricingPlans', 'active'],
    queryFn: fetchActivePricingPlans,
    staleTime: 5 * 60 * 1000,
  });
};
