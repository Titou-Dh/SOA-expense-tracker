import { TrendingUp, TrendingDown } from "lucide-react";

export function CurrentBalance({ balance, percentage }) {
  const isPositive = balance >= 0;

  return (
    <div>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Balance</span>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-2xl font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            ${Math.abs(balance).toFixed(2)}
          </span>
        </div>
        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
          isPositive 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        }`}>
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
