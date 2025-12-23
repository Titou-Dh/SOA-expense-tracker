import { Edit2, Trash2 } from "lucide-react";

export function ExpenseActions({ onEdit, onDelete }) {
  return (
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onEdit}
        className="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-lg transition-colors"
        aria-label="Edit expense"
      >
        <Edit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
        aria-label="Delete expense"
      >
        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
      </button>
    </div>
  );
}
