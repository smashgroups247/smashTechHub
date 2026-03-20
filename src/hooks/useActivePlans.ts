import { useQuery } from '@tanstack/react-query';
import { getActivePlans } from '@/lib/pricingApi';

export const ACTIVE_PLANS_QUERY_KEY = 'active-plans';

export function useActivePlans() {
  return useQuery({
    queryKey: [ACTIVE_PLANS_QUERY_KEY],
    queryFn: getActivePlans,
  });
}
