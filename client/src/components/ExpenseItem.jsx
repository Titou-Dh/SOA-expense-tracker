import { CategoryBadge } from "./CategoryBadge";
import { DateDisplay } from "./DateDisplay";
import { ExpenseActions } from "./ExpenseActions";

export function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={expense.category} />
            <DateDisplay date={expense.date} />
          </div>
          <p className="text-gray-900 dark:text-white font-medium truncate">
            {expense.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
            ${expense.amount.toFixed(2)}
          </span>
          <ExpenseActions
            onEdit={() => onEdit(expense)}
            onDelete={() => onDelete(expense.id)}
          />
        </div>
      </div>
    </div>
  );
}
