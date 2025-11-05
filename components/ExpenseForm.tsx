
import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { EXPENSE_CATEGORIES } from '../constants';
import { CloseIcon } from './icons';

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, 'id'> | Expense) => void;
  expenseToEdit?: Expense | null;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ isOpen, onClose, onSave, expenseToEdit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount.toString());
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    } else {
      // Reset form when opening for a new expense
      setTitle('');
      setAmount('');
      setCategory(EXPENSE_CATEGORIES[0]);
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [expenseToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!title.trim() || !amount.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please fill in all fields with valid values. Amount must be positive.');
      return;
    }
    setError('');

    const newExpense = {
      title,
      amount: numericAmount,
      category,
      date,
    };
    
    if (expenseToEdit) {
      onSave({ ...newExpense, id: expenseToEdit.id });
    } else {
      onSave(newExpense);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-surface rounded-lg shadow-xl w-full max-w-lg p-6 relative transform transition-all animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-on-surface-muted hover:text-on-primary">
          <CloseIcon className="w-6 h-6"/>
        </button>
        <h2 className="text-2xl font-bold text-on-primary mb-6">{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h2>
        
        {error && <p className="bg-danger/20 text-danger p-3 rounded-md mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-on-surface-muted">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full bg-background border border-surface rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-on-surface-muted">Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full bg-background border border-surface rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary focus:border-primary"
              required
              step="0.01"
              min="0.01"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-on-surface-muted">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full bg-background border border-surface rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary focus:border-primary"
            >
              {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-on-surface-muted">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full bg-background border border-surface rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-surface hover:bg-surface/70 text-on-surface rounded-md transition-colors">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-primary hover:bg-primary-variant text-on-primary font-semibold rounded-md transition-colors">{expenseToEdit ? 'Save Changes' : 'Add Expense'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
