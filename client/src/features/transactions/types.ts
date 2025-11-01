export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export interface TransactionFilters {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}