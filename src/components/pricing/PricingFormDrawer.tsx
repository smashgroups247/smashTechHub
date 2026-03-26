import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreatePricingPlanDto, PricingPlan } from '@/types/pricing';
import { X, Loader2 } from 'lucide-react';
import FeatureListEditor from './FeatureListEditor';
import { motion, AnimatePresence } from 'framer-motion';

const planSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be 0 or greater'),
  currency: z.string(),
  category: z.enum(['WEBSITE', 'WEB_APP', 'MOBILE_APP', 'BRANDING']),
  billingCycle: z.enum(['monthly', 'yearly', 'one-time']),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  description: z.string().optional(),
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0, 'Must be a positive number'),
});

type PlanFormData = z.infer<typeof planSchema>;

interface PricingFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: PricingPlan | null;
  onSubmit: (data: PlanFormData) => void;
  isLoading: boolean;
}

export default function PricingFormDrawer({
  isOpen,
  onClose,
  plan,
  onSubmit,
  isLoading,
}: PricingFormDrawerProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: '',
      price: 0,
      currency: 'NGN',
      category: 'WEBSITE',
      billingCycle: 'monthly',
      features: [],
      description: '',
      isActive: true,
      displayOrder: 0,
    },
    mode: 'onChange',
  });

  const features = watch('features');
  const isActive = watch('isActive');
  const priceInput = watch('price');

  useEffect(() => {
    if (isOpen) {
      if (plan) {
        reset({
          name: plan.name,
          price: plan.price / 100, // convert kobo to NGN for input
          currency: plan.currency || 'NGN',
          category: plan.category || 'WEBSITE',
          billingCycle: plan.billingCycle,
          features: [...plan.features],
          description: plan.description || '',
          isActive: plan.isActive,
          displayOrder: plan.displayOrder,
        });
      } else {
        reset({
          name: '',
          price: 0,
          currency: 'NGN',
          category: 'WEBSITE',
          billingCycle: 'monthly',
          features: [],
          description: '',
          isActive: true,
          displayOrder: 0,
        });
      }
    }
  }, [isOpen, plan, reset]);

  const handleFormSubmit = (data: PlanFormData) => {
    const submitData = {
      ...data,
      price: Math.round(data.price * 100), // convert back to smallest unit before submitting
    };
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-y-0 right-0 max-w-full flex"
        >
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {plan ? 'Edit Pricing Plan' : 'Create Pricing Plan'}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 p-2"
                >
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <form id="pricing-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Plan Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        disabled={isLoading}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border ${
                          errors.name ? 'border-red-300' : ''
                        }`}
                        placeholder="e.g. Basic Plan"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Price & Currency */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price (₦) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₦</span>
                        </div>
                        <input
                          type="number"
                          id="price"
                          step="0.01"
                          {...register('price', { valueAsNumber: true })}
                          disabled={isLoading}
                          className={`block w-full pl-7 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border ${
                            errors.price ? 'border-red-300' : ''
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                        Currency
                      </label>
                      <select
                        id="currency"
                        {...register('currency')}
                        disabled={isLoading}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-gray-50"
                      >
                        <option value="NGN">NGN (₦)</option>
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      {...register('category')}
                      disabled={isLoading}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    >
                      <option value="WEBSITE">Website</option>
                      <option value="WEB_APP">Web App</option>
                      <option value="MOBILE_APP">Mobile App</option>
                      <option value="BRANDING">Branding</option>
                    </select>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  {/* Billing Cycle */}
                  <div>
                    <label htmlFor="billingCycle" className="block text-sm font-medium text-gray-700">
                      Billing Cycle <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="billingCycle"
                      {...register('billingCycle')}
                      disabled={isLoading}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-time</option>
                    </select>
                    {errors.billingCycle && (
                      <p className="mt-2 text-sm text-red-600">{errors.billingCycle.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        rows={3}
                        {...register('description')}
                        disabled={isLoading}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                        placeholder="Short description of the plan..."
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features <span className="text-red-500">*</span>
                    </label>
                    <FeatureListEditor
                      features={features}
                      onChange={(newFeatures) =>
                        setValue('features', newFeatures, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      disabled={isLoading}
                    />
                    {errors.features && (
                      <p className="mt-2 text-sm text-red-600">{errors.features.message}</p>
                    )}
                  </div>

                  {/* Display Order */}
                  <div>
                    <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700">
                      Display Order <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="displayOrder"
                        {...register('displayOrder', { valueAsNumber: true })}
                        disabled={isLoading}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border ${
                          errors.displayOrder ? 'border-red-300' : ''
                        }`}
                      />
                      <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                      {errors.displayOrder && (
                        <p className="mt-2 text-sm text-red-600">{errors.displayOrder.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Is Active Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex-1">Active Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        {...register('isActive')}
                        disabled={isLoading}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 disabled:opacity-50"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </div>
                </form>
              </div>

              {/* Footer Buttons */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="pricing-form"
                  disabled={isLoading || (!isDirty && !!plan) || !isValid}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {plan ? 'Save Changes' : 'Create Plan'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
