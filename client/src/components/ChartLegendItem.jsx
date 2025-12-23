export function ChartLegendItem({ category, color, value, percentage }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {category}
        </span>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          ${value.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
