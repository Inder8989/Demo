import React from 'react';
import { Expense } from '../types';

// Fix: Add type declaration for Recharts on the window object as it's loaded from a CDN.
declare global {
  interface Window {
    Recharts: any;
  }
}

interface CategoryChartProps {
  expenses: Expense[];
}

const COLORS = ['#6200ea', '#03dac6', '#cf6679', '#bb86fc', '#f2a03d', '#4caf50', '#2196f3', '#ffc107', '#e91e63', '#9c27b0'];

export const CategoryChart: React.FC<CategoryChartProps> = ({ expenses }) => {
  // Move destructuring from module scope to component scope to avoid race condition
  const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } = window.Recharts || {};

  // Add a guard clause to handle the case where the library hasn't loaded yet
  if (!PieChart) {
    return (
      <div className="bg-surface rounded-lg p-6 flex items-center justify-center h-full min-h-[300px]">
        <p className="text-on-surface-muted">Loading chart...</p>
      </div>
    );
  }

  const data = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  if (expenses.length === 0) {
    return (
      <div className="bg-surface rounded-lg p-6 flex items-center justify-center h-full min-h-[300px]">
        <p className="text-on-surface-muted">No expense data to display chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-4 h-[400px] w-full text-on-surface-muted">
      <h2 className="text-xl font-bold text-on-primary mb-4 text-center">Spending by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #444', borderRadius: '8px' }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
            />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
