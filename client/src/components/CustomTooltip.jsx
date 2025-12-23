export function CustomTooltip({ active, payload, totalAmount }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  const percentage = ((data.value / totalAmount) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
      <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ${data.value.toFixed(2)} ({percentage}%)
      </p>
    </div>
  );
}
