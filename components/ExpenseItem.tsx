
import React from 'react';
import { Expense } from '../types';
import { EditIcon, TrashIcon } from './icons';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  const categoryColorMap: { [key: string]: string } = {
    Groceries: 'bg-green-500/20 text-green-300',
    Utilities: 'bg-blue-500/20 text-blue-300',
    Transportation: 'bg-yellow-500/20 text-yellow-300',
    Entertainment: 'bg-purple-500/20 text-purple-300',
    Healthcare: 'bg-red-500/20 text-red-300',
    Other: 'bg-gray-500/20 text-gray-300',
  };

  const categoryColor = categoryColorMap[expense.category] || categoryColorMap['Other'];

  return (
    <div className="bg-surface rounded-lg p-4 flex items-center justify-between transition-all hover:shadow-lg hover:bg-surface/80">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${categoryColor}`}>
          <span className="text-2xl font-bold">${expense.amount.toFixed(0)[0]}</span>
        </div>
        <div>
          <h3 className="font-bold text-on-primary text-lg">{expense.title}</h3>
          <p className="text-sm text-on-surface-muted">{expense.date}</p>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColor}`}>{expense.category}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <p className="text-lg font-bold text-secondary hidden md:block">${expense.amount.toFixed(2)}</p>
        <button onClick={() => onEdit(expense)} className="p-2 text-on-surface-muted hover:text-secondary rounded-full hover:bg-primary/20 transition-colors">
          <EditIcon className="w-5 h-5"/>
        </button>
        <button onClick={() => onDelete(expense.id)} className="p-2 text-on-surface-muted hover:text-danger rounded-full hover:bg-danger/20 transition-colors">
          <TrashIcon className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
};
