export type Transaction = {
  id: string;
  // Firestore timestamps are normalized to Date values at the data boundary.
  // Persisted local-storage data remains an ISO string until it is hydrated.
  date: Date | string;
  amount: number;
  type: 'income' | 'expense';
  category: 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Salary' | 'Other';
  description: string;
  userId?: string;
};
