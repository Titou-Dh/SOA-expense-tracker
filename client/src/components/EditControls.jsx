import { Edit2, Check, X } from "lucide-react";

export function EditControls({ isEditing, onEdit, onSave, onCancel }) {
  if (!isEditing) {
    return (
      <button
        onClick={onEdit}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Edit net worth"
      >
        <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
    );
  }

  return (
    <div className="flex gap-1">
      <button
        onClick={onSave}
        className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
        aria-label="Save"
      >
        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
      </button>
      <button
        onClick={onCancel}
        className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
        aria-label="Cancel"
      >
        <X className="w-4 h-4 text-red-600 dark:text-red-400" />
      </button>
    </div>
  );
}
