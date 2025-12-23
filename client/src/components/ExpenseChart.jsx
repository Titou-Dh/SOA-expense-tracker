import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { ChartLegendItem } from "./ChartLegendItem";
import { CustomTooltip } from "./CustomTooltip";

const CATEGORY_COLORS = {
  Groceries: "#10b981",
  Bills: "#3b82f6",
  Transportation: "#eab308",
  Entertainment: "#a855f7",
  Healthcare: "#ef4444",
  Shopping: "#ec4899",
  Dining: "#f97316",
  Other: "#6b7280"
};

export function ExpenseChart({ expenses }) {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({
        category: expense.category,
        value: expense.amount,
        color: CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other
      });
    }
    return acc;
  }, []);

  categoryData.sort((a, b) => b.value - a.value);

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

  if (expenses.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="No data to display"
        message="Add expenses to see your spending breakdown"
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Spending Breakdown</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Total: ${totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
              labelLine={true}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip totalAmount={totalAmount} />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Category Legend */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {categoryData.map((item) => {
            const percentage = (item.value / totalAmount) * 100;
            return (
              <ChartLegendItem
                key={item.category}
                category={item.category}
                color={item.color}
                value={item.value}
                percentage={percentage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
