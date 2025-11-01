import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addTransaction } from '../../features/transactions/transactionsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const AddTransactionForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    type: '' as 'income' | 'expense' | '',
    amount: '',
    category: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.amount && formData.category) {
      dispatch(addTransaction({
        type: formData.type,
        amount: Number(formData.amount),
        category: formData.category,
        description: formData.description,
        date: new Date().toISOString()
      }));
      setFormData({ type: '', amount: '', category: '', description: '' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={formData.type || 'none'} onValueChange={(value) => setFormData({...formData, type: value === 'none' ? '' : value as 'income' | 'expense'})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select type</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />

            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            />

            <Input
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};