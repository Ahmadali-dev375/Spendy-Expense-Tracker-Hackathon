import type { Transaction } from './types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-07-20T10:00:00.000Z',
    amount: 2500.00,
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
  },
  {
    id: '2',
    date: '2024-07-20T12:30:00.000Z',
    amount: 15.50,
    type: 'expense',
    category: 'Food',
    description: 'Lunch at Cafe',
  },
  {
    id: '3',
    date: '2024-07-19T18:00:00.000Z',
    amount: 75.00,
    type: 'expense',
    category: 'Shopping',
    description: 'New shoes',
  },
  {
    id: '4',
    date: '2024-07-18T09:00:00.000Z',
    amount: 50.00,
    type: 'expense',
    category: 'Bills',
    description: 'Internet Bill',
  },
  {
    id: '5',
    date: '2024-07-18T15:00:00.000Z',
    amount: 22.30,
    type: 'expense',
    category: 'Travel',
    description: 'Gasoline',
  },
  {
    id: '6',
    date: '2024-07-17T11:00:00.000Z',
    amount: 8.99,
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
  },
  {
    id: '7',
    date: '2024-07-15T19:30:00.000Z',
    amount: 150.00,
    type: 'expense',
    category: 'Shopping',
    description: 'Jacket',
  },
  {
    id: '8',
    date: '2024-06-20T10:00:00.000Z',
    amount: 2500.00,
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
  }
];

export const transactionCategories = ['Food', 'Travel', 'Bills', 'Shopping', 'Salary', 'Other'] as const;
