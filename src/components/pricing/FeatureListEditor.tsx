import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FeatureListEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
  disabled?: boolean;
}

export default function FeatureListEditor({ features, onChange, disabled }: FeatureListEditorProps) {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      onChange([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const nextFeatures = [...features];
    nextFeatures.splice(index, 1);
    onChange(nextFeatures);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addFeature();
            }
          }}
          disabled={disabled}
          placeholder="Add a new feature..."
          className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border disabled:opacity-50"
        />
        <button
          type="button"
          onClick={addFeature}
          disabled={disabled || !newFeature.trim()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>
      {features.length > 0 ? (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md border border-gray-200"
            >
              <span className="text-sm text-gray-700">{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                disabled={disabled}
                className="text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">No features added yet.</p>
      )}
    </div>
  );
}
