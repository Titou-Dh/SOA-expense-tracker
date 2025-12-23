import { DollarSign } from "lucide-react";

export function NetWorthDisplay({ value }) {
  return (
    <div className="flex items-center gap-2">
      <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      <span className="text-3xl font-bold text-gray-900 dark:text-white">
        {value.toFixed(2)}
      </span>
    </div>
  );
}
