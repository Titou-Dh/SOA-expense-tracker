export function ProgressBar({ percentage, isPositive }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          isPositive ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
        }`}
        style={{ width: `${Math.min(Math.abs(percentage), 100)}%` }}
      ></div>
    </div>
  );
}
