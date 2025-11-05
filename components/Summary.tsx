
import React, { useMemo } from 'react';
import { Expense } from '../types';

interface SummaryProps {
  expenses: Expense[];
}

export const Summary: React.FC<SummaryProps> = ({ expenses }) => {
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);
  
  const totalItems = expenses.length;

  return (
    <div className="bg-surface rounded-lg p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-on-surface-muted mb-4">Monthly Summary</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-on-surface-muted">Total Expenses</p>
          <p className="text-4xl font-bold text-secondary">
            ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-on-surface-muted">Total Items</p>
          <p className="text-4xl font-bold text-on-primary">{totalItems}</p>
        </div>
      </div>
    </div>
  );
};
