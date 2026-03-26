'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePricingPlans } from '@/hooks/usePricingPlans';
import { useCreatePlan } from '@/hooks/useCreatePlan';
import { useUpdatePlan } from '@/hooks/useUpdatePlan';
import { useTogglePlanStatus } from '@/hooks/useTogglePlanStatus';
import { useDeletePlan } from '@/hooks/useDeletePlan';
import { PricingPlan, PricingQueryParams } from '@/types/pricing';
import StatsBar from '@/components/pricing/StatsBar';
import PricingFilters from '@/components/pricing/PricingFilters';
import PricingGrid from '@/components/pricing/PricingGrid';
import PricingFormDrawer from '@/components/pricing/PricingFormDrawer';
import DeleteConfirmModal from '@/components/pricing/DeleteConfirmModal';
import PricingSkeletons from '@/components/pricing/PricingSkeletons';

export default function PricingPage() {
  const [filters, setFilters] = useState<PricingQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'displayOrder',
    sortOrder: 'asc',
  });

  const { data, isLoading: isFetching } = usePricingPlans(filters);

  // Mutations
  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();
  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();
  const { mutate: toggleStatus, isPending: isToggling } = useTogglePlanStatus();
  const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();

  // Selected state for Modals & Drawers
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<PricingPlan | null>(null);
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All' },
    { id: 'WEBSITE', label: 'Website' },
    { id: 'WEB_APP', label: 'Web App' },
    { id: 'MOBILE_APP', label: 'Mobile App' },
    { id: 'BRANDING', label: 'Branding' },
  ];

  const plans = data?.data || [];
  const pagination = data?.pagination;

  const groupedPlans = useMemo(() => {
    const list = plans || [];
    
    // Filter by active tab
    const filtered = activeTab === 'All' 
      ? list 
      : list.filter(p => p.category === activeTab);
      
    // Group by category
    const grouped = filtered.reduce((acc, plan) => {
      const cat = plan.category || 'WEBSITE';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(plan);
      return acc;
    }, {} as Record<string, PricingPlan[]>);
    
    // Sort each group by displayOrder
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => a.displayOrder - b.displayOrder);
    });
    
    return grouped;
  }, [plans, activeTab]);

  // Handlers
  const handleCreateNew = () => {
    setSelectedPlan(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsDrawerOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    toggleStatus(id);
  };

  const handleDeleteRequest = (id: string) => {
    const plan = plans.find((p) => p.id === id);
    if (plan) {
      setPlanToDelete(plan);
    }
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      const id = planToDelete.id;
      deletePlan(id, {
        onSuccess: () => {
          setPlanToDelete(null);
        },
      });
    }
  };

  const handleSubmitForm = (formData: any) => {
    if (selectedPlan) {
      const id = selectedPlan.id;
      updatePlan(
        { id, dto: formData },
        {
          onSuccess: () => {
            setIsDrawerOpen(false);
          },
        }
      );
    } else {
      createPlan(formData, {
        onSuccess: () => {
          setIsDrawerOpen(false);
        },
      });
    }
  };

  return (
    <DashboardLayout title="Pricing Plans">
      <div className="max-w-7xl mx-auto py-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Pricing Plans</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your subscription tiers and pricing options.
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2 -ml-1" />
            Create New Plan
          </button>
        </div>

        <StatsBar />

        <PricingFilters filters={filters} setFilters={setFilters} />

        {/* Main Content */}
        <div className="min-h-[500px]">
          {/* Category Tabs */}
          <div className="flex space-x-2 border-b border-gray-200 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
                  activeTab === cat.id
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isFetching ? (
            <PricingSkeletons />
          ) : plans.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No pricing plans yet</h3>
              <p className="text-gray-500 max-w-sm mb-6">
                Get started by creating your first pricing plan. It will appear here once created.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedPlans).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
                    {categories.find(c => c.id === category)?.label || category} Plans
                    <span className="bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium">
                      {items.length}
                    </span>
                  </h3>
                  <PricingGrid
                    plans={items}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                    onToggleStatus={handleToggleStatus}
                    isToggling={isToggling}
                  />
                </div>
              ))}
              {Object.keys(groupedPlans).length === 0 && plans.length > 0 && (
                <div className="text-center py-12 text-gray-500">
                  No plans found for {categories.find(c => c.id === activeTab)?.label} category.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {pagination && (pagination.totalPages > 1 || pagination.total > 0) && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }))}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, page: Math.min(pagination.totalPages, (prev.page || 1) + 1) }))}
                disabled={pagination.page === pagination.totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{pagination.page}</span> of{' '}
                  <span className="font-medium">{pagination.totalPages}</span> ({pagination.total} total results)
                </p>
              </div>
              {pagination.totalPages > 1 && (
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }))}
                      disabled={pagination.page === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum = i + 1;
                      if (pagination.totalPages > 5 && pagination.page > 3) {
                        pageNum = pagination.page - 2 + i;
                        if (pageNum > pagination.totalPages) {
                          pageNum = pagination.totalPages - (4 - i);
                        }
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setFilters((prev) => ({ ...prev, page: pageNum }))}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                            pagination.page === pageNum
                              ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, page: Math.min(pagination.totalPages, (prev.page || 1) + 1) }))}
                      disabled={pagination.page === pagination.totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Drawers and Modals */}
        <PricingFormDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          plan={selectedPlan}
          onSubmit={handleSubmitForm}
          isLoading={isCreating || isUpdating}
        />

        <DeleteConfirmModal
          isOpen={!!planToDelete}
          onClose={() => setPlanToDelete(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Pricing Plan"
          message={`Are you sure you want to delete "${planToDelete?.name}"? This action cannot be undone.`}
          isDeleting={isDeleting}
        />
      </div>
    </DashboardLayout>
  );
}
