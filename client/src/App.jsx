import { useState, useEffect } from "react";
import { BalanceCard } from "./components/BalanceCard";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseChart } from "./components/ExpenseChart";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { Wallet, Loader2 } from "lucide-react";
import * as api from "./api/transactions";

export default function App() {
  const [netWorth, setNetWorth] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await api.getTransactions();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch expenses, check Backend Server/MongoDB Server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentBalance = netWorth - totalExpenses;

  const handleAddExpense = async (expense) => {
    try {
      const data = await api.createTransaction(expense);
      setExpenses([{ ...data, id: data._id }, ...expenses]);
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Failed to add expense");
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const data = await api.updateTransaction(updatedExpense.id, updatedExpense);
      setExpenses(expenses.map(exp =>
        exp.id === updatedExpense.id ? { ...data, id: data._id } : exp
      ));
      setEditingExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err);
      alert("Failed to update expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await api.deleteTransaction(id);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Failed to delete expense");
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center relative">
            <div className="absolute top-0 right-0">
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Wallet className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-4xl dark:text-white font-bold">Expense Manager</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Take control of your finances and track your spending</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
              <button onClick={fetchExpenses} className="ml-4 underline font-bold">Retry</button>
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Balance and Form */}
            <div className="lg:col-span-1 space-y-6">
              <BalanceCard
                netWorth={netWorth}
                currentBalance={currentBalance}
                onNetWorthChange={setNetWorth}
              />
              <ExpenseForm
                onAddExpense={handleAddExpense}
                editingExpense={editingExpense}
                onUpdateExpense={handleUpdateExpense}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            {/* Right Column - List and Chart */}
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Loading your expenses...</p>
                </div>
              ) : (
                <>
                  <ExpenseChart expenses={expenses} />
                  <ExpenseList
                    expenses={expenses}
                    onEditExpense={handleEditExpense}
                    onDeleteExpense={handleDeleteExpense}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
