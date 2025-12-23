import { useState } from "react";
import { EditControls } from "./EditControls";
import { NetWorthDisplay } from "./NetWorthDisplay";
import { NetWorthEditor } from "./NetWorthEditor";
import { CurrentBalance } from "./CurrentBalance";
import { ProgressBar } from "./ProgressBar";

export function BalanceCard({ netWorth, currentBalance, onNetWorthChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(netWorth.toString());

  const handleSave = () => {
    const newValue = parseFloat(editValue);
    if (!isNaN(newValue) && newValue >= 0) {
      onNetWorthChange(newValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(netWorth.toString());
    setIsEditing(false);
  };

  const balancePercentage = netWorth > 0 ? (currentBalance / netWorth) * 100 : 0;
  const isPositive = currentBalance >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl">
      <div className="space-y-4">
        {/* Net Worth Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Worth</span>
            <EditControls
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
          {isEditing ? (
            <NetWorthEditor
              value={editValue}
              onChange={setEditValue}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <NetWorthDisplay value={netWorth} />
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Current Balance Section */}
        <CurrentBalance balance={currentBalance} percentage={balancePercentage} />

        {/* Progress Bar */}
        <ProgressBar percentage={balancePercentage} isPositive={isPositive} />
      </div>
    </div>
  );
}
