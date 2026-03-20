import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePlanStatus } from '@/lib/pricingApi';
import { PRICING_PLANS_QUERY_KEY } from './usePricingPlans';
import { ACTIVE_PLANS_QUERY_KEY } from './useActivePlans';
import { toast } from 'react-hot-toast';
import { PaginatedResponse, PricingPlan } from '@/types/pricing';

export function useTogglePlanStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => togglePlanStatus(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: [PRICING_PLANS_QUERY_KEY] });
      await queryClient.cancelQueries({ queryKey: [ACTIVE_PLANS_QUERY_KEY] });

      const previousQueries = queryClient.getQueriesData<PaginatedResponse<PricingPlan>>({ queryKey: [PRICING_PLANS_QUERY_KEY] });

      // Optimistically update all paginated queries
      queryClient.setQueriesData<PaginatedResponse<PricingPlan>>({ queryKey: [PRICING_PLANS_QUERY_KEY] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((plan) =>
            plan._id === id || plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
          ),
        };
      });

      return { previousQueries };
    },
    onError: (err, id, context) => {
      // Revert to previous cache on error
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          if (data) {
            queryClient.setQueryData(queryKey, data);
          }
        });
      }
      toast.error('Failed to toggle status. Plan might not exist.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PRICING_PLANS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ACTIVE_PLANS_QUERY_KEY] });
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
    },
  });
}
