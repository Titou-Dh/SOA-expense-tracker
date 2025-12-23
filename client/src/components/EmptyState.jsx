export function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
      <div className="text-gray-400 dark:text-gray-500">
        <Icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm mt-2">{message}</p>
      </div>
    </div>
  );
}
