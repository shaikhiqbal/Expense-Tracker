import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTransactions, searchTransactions, setPagination } from '../../features/transactions/transactionsSlice';
import { TransactionFilters } from '../../features/transactions/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { formatCurrency } from '../../utils/formatCurrency';
import { AddTransactionForm } from './AddTransactionForm';

export const TransactionsTable = () => {
  const dispatch = useAppDispatch();
  const { transactions, total, loading, pagination } = useAppSelector(state => state.transactions);
  
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchTransactions(pagination));
    }
  }, [dispatch, pagination, isSearching]);

  const handlePageChange = (newOffset: number) => {
    dispatch(setPagination({ ...pagination, offset: newOffset }));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setPagination({ offset: 0, limit: newLimit }));
  };

  const handleSearch = () => {
    if (Object.values(filters).some(value => value)) {
      setIsSearching(true);
      dispatch(searchTransactions(filters));
    } else {
      setIsSearching(false);
      dispatch(fetchTransactions(pagination));
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setIsSearching(false);
    dispatch(fetchTransactions(pagination));
  };

  const totalPages = Math.ceil(total / pagination.limit);
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Transactions</CardTitle>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add Transaction'}
          </Button>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <Select value={filters.type || 'all'} onValueChange={(value) => setFilters({...filters, type: value === 'all' ? undefined : value as 'income' | 'expense'})}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Category"
            value={filters.category || ''}
            onChange={(e) => setFilters({...filters, category: e.target.value || undefined})}
          />

          <Input
            placeholder="Description"
            value={filters.description || ''}
            onChange={(e) => setFilters({...filters, description: e.target.value || undefined})}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={filters.amount || ''}
            onChange={(e) => setFilters({...filters, amount: e.target.value ? Number(e.target.value) : undefined})}
          />

          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={loading}>
              Search
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {showAddForm && (
          <div className="mb-6">
            <AddTransactionForm />
          </div>
        )}
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Description</th>
                <th className="text-right p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-8">Loading...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8">No transactions found</td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-2">{transaction.category}</td>
                    <td className="p-2">{transaction.description}</td>
                    <td className={`p-2 text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isSearching && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, total)} of {total} entries
              </span>
              <Select value={pagination.limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.offset - pagination.limit)}
                disabled={pagination.offset === 0}
              >
                Previous
              </Button>
              
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.offset + pagination.limit)}
                disabled={pagination.offset + pagination.limit >= total}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};