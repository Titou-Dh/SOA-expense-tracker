import { Calendar } from "lucide-react";

export function DateDisplay({ date }) {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateObj.toDateString() === today.toDateString()) {
      return "Today";
    } else if (dateObj.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <Calendar className="w-3 h-3" />
      <span>{formatDate(date)}</span>
    </div>
  );
}
