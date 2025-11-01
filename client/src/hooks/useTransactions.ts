import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { fetchTransactions, addTransaction } from '../features/transactions/transactionsSlice';
import { Transaction } from '../features/transactions/types';

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading, error } = useAppSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const addNewTransaction = (transaction: Omit<Transaction, 'id'>) => {
    dispatch(addTransaction(transaction));
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return {
    transactions,
    loading,
    error,
    addNewTransaction,
    totalIncome,
    totalExpenses,
    balance
  };
};