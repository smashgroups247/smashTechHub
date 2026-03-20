import React from 'react';

export default function PricingSkeletons({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse flex flex-col h-[500px]"
        >
          <div className="p-8 flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            </div>
            
            <div className="h-10 bg-gray-200 rounded w-2/3 mt-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            
            <div className="space-y-4 pt-6">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex gap-3 items-center">
                  <div className="h-5 w-5 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 mt-auto border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-6 w-11 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded-md flex-1"></div>
              <div className="h-10 bg-gray-200 rounded-md flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
