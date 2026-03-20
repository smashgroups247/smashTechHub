import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlan } from '@/lib/pricingApi';
import { CreatePricingPlanDto } from '@/types/pricing';
import { PRICING_PLANS_QUERY_KEY } from './usePricingPlans';
import { ACTIVE_PLANS_QUERY_KEY } from './useActivePlans';

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreatePricingPlanDto) => createPlan(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRICING_PLANS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ACTIVE_PLANS_QUERY_KEY] });
    },
  });
}
