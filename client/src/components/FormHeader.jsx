import { X } from "lucide-react";

export function FormHeader({ title, isEditing, onCancel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      {isEditing && (
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Cancel editing"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      )}
    </div>
  );
}
