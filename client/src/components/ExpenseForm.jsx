import { useState, useEffect } from "react";
import { FormHeader } from "./FormHeader";
import { FormInput } from "./FormInput";
import { AmountInput } from "./AmountInput";
import { FormSelect } from "./FormSelect";
import { SubmitButton } from "./SubmitButton";

const CATEGORIES = [
  "Groceries",
  "Bills",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Dining",
  "Other"
];

export function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, onCancelEdit }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date).toISOString().split('T')[0]);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const expenseData = {
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
      type: "expense"
    };

    if (editingExpense) {
      onUpdateExpense({ ...expenseData, id: editingExpense.id });
    } else {
      onAddExpense(expenseData);
    }

    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  const isValid = description.trim() && amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <FormHeader
        title={editingExpense ? "Edit Expense" : "Add Expense"}
        isEditing={!!editingExpense}
        onCancel={handleCancel}
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Weekly groceries"
          required
        />

        <AmountInput
          id="amount"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <FormSelect
          id="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={CATEGORIES}
        />

        <FormInput
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <SubmitButton isEditing={!!editingExpense} disabled={!isValid} />
      </form>
    </div>
  );
}
