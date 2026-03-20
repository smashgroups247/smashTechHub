import { useQuery } from '@tanstack/react-query';
import { getPricingPlans } from '@/lib/pricingApi';
import { PricingQueryParams } from '@/types/pricing';

export const PRICING_PLANS_QUERY_KEY = 'pricing-plans';

export function usePricingPlans(params: PricingQueryParams) {
  return useQuery({
    queryKey: [PRICING_PLANS_QUERY_KEY, params],
    queryFn: () => getPricingPlans(params),
  });
}
