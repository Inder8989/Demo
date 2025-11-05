
import React from 'react';
import { ChevronRightIcon } from './icons';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ imageUrl: string; title: string; description: string }> = ({ imageUrl, title, description }) => (
    <div className="bg-surface/50 rounded-lg overflow-hidden flex flex-col md:flex-row items-center md:space-x-6 p-4">
        <img src={imageUrl} alt={title} className="w-full md:w-1/3 h-40 object-cover rounded-md" />
        <div className="p-4 flex-1">
            <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
            <p className="text-on-surface-muted">{description}</p>
        </div>
    </div>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 transform transition-all animate-fade-in-up">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-primary mb-2">Welcome to <span className="text-secondary">Expense Tracker Pro</span></h1>
            <p className="text-lg text-on-surface-muted mb-8">Your personal finance companion to track spending effortlessly.</p>
        </div>

        <div className="space-y-6">
            <FeatureCard 
                imageUrl="https://picsum.photos/seed/dashboard/400/300"
                title="1. Visualize Your Spending"
                description="Get a clear overview of your expenses with an interactive dashboard and category-based charts. Understand where your money goes at a glance."
            />
            <FeatureCard 
                imageUrl="https://picsum.photos/seed/add/400/300"
                title="2. Add Expenses in a Snap"
                description="Quickly add new expenses using the floating action button. Categorize and date your entries for precise tracking."
            />
             <FeatureCard 
                imageUrl="https://picsum.photos/seed/manage/400/300"
                title="3. Manage and Edit with Ease"
                description="Made a mistake? No problem. Easily edit or delete any expense entry from your list. Your data is always under your control."
            />
        </div>

        <div className="mt-10 text-center">
            <button
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary-variant text-on-primary font-bold py-3 px-8 rounded-full text-lg inline-flex items-center space-x-2 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                <span>Get Started</span>
                <ChevronRightIcon className="w-6 h-6"/>
            </button>
        </div>
      </div>
    </div>
  );
};
