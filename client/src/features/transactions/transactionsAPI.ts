import { Transaction } from './types';

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary',
    date: '2024-01-15'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly rent payment',
    date: '2024-01-01'
  },
  {
    id: '3',
    type: 'expense',
    amount: 300,
    category: 'Food',
    description: 'Groceries',
    date: '2024-01-10'
  },
  {
    id: '4',
    type: 'income',
    amount: 500,
    category: 'Freelance',
    description: 'Web development project',
    date: '2024-01-20'
  }
];

export const transactionsAPI = {
  getAll: async (): Promise<Transaction[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTransactions;
  },

  create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  }
};