import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlan } from '@/lib/pricingApi';
import { PRICING_PLANS_QUERY_KEY } from './usePricingPlans';
import { ACTIVE_PLANS_QUERY_KEY } from './useActivePlans';
import { toast } from 'react-hot-toast';

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRICING_PLANS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ACTIVE_PLANS_QUERY_KEY] });
      toast.success('Plan deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete plan.');
    },
  });
}
