import { Tag } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { ExpenseItem } from "./ExpenseItem";

export function ExpenseList({ expenses, onEditExpense, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <EmptyState
        icon={Tag}
        title="No expenses yet"
        message="Add your first expense to get started!"
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Expenses</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} recorded
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEditExpense}
            onDelete={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
}
