
import React from 'react';
import { Expense } from '../types';
import { ExpenseItem } from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-on-surface mb-2">No Expenses Yet!</h3>
        <p className="text-on-surface-muted">Click the '+' button to add your first expense.</p>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-3">
      {sortedExpenses.map(expense => (
        <ExpenseItem 
          key={expense.id} 
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
