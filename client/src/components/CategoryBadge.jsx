const CATEGORY_COLORS = {
  Groceries: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Bills: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Transportation: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Entertainment: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Healthcare: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  Shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  Dining: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Other: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
};

export function CategoryBadge({ category }) {
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorClass}`}>
      {category}
    </span>
  );
}
