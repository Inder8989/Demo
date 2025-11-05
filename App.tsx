
import React, { useState } from 'react';
import { Expense } from './types';
import { LOCAL_STORAGE_KEYS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ExpenseList } from './components/ExpenseList';
import { Summary } from './components/Summary';
import { CategoryChart } from './components/CategoryChart';
import { ExpenseForm } from './components/ExpenseForm';
import { PlusIcon } from './components/icons';

function App() {
  const [showWelcome, setShowWelcome] = useLocalStorage<boolean>(LOCAL_STORAGE_KEYS.SHOW_WELCOME, true);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(LOCAL_STORAGE_KEYS.EXPENSES, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleAddExpense = (newExpenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: new Date().getTime().toString() + Math.random().toString(36).substring(2, 9),
    };
    setExpenses(prev => [...prev, newExpense]);
  };
  
  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const handleSaveExpense = (expenseData: Omit<Expense, 'id'> | Expense) => {
    if ('id' in expenseData) {
      handleUpdateExpense(expenseData);
    } else {
      handleAddExpense(expenseData);
    }
  };

  const openAddForm = () => {
    setExpenseToEdit(null);
    setIsFormOpen(true);
  };
  
  const openEditForm = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsFormOpen(true);
  };

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans">
      <header className="bg-surface py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-on-primary">
            Expense Tracker <span className="text-secondary">Pro</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Summary expenses={expenses} />
          </div>
          <div className="lg:col-span-2">
            <CategoryChart expenses={expenses} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-on-primary mb-4">Recent Expenses</h2>
          <ExpenseList 
            expenses={expenses}
            onEdit={openEditForm}
            onDelete={handleDeleteExpense}
          />
        </div>
      </main>

      <button
        onClick={openAddForm}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-variant text-on-primary w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label="Add new expense"
      >
        <PlusIcon className="w-8 h-8"/>
      </button>

      <ExpenseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveExpense}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
}

export default App;
