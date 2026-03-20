import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPlan } from '@/lib/pricingApi';
import { UpdatePricingPlanDto } from '@/types/pricing';
import { PRICING_PLANS_QUERY_KEY } from './usePricingPlans';
import { ACTIVE_PLANS_QUERY_KEY } from './useActivePlans';

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<UpdatePricingPlanDto> }) =>
      patchPlan(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRICING_PLANS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ACTIVE_PLANS_QUERY_KEY] });
    },
  });
}
