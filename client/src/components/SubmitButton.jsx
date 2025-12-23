import { Plus } from "lucide-react";

export function SubmitButton({ isEditing, disabled, children }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
    >
      {isEditing ? (
        children || "Update Expense"
      ) : (
        <>
          <Plus className="w-5 h-5" />
          {children || "Add Expense"}
        </>
      )}
    </button>
  );
}
