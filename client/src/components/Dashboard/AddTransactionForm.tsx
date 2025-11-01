import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/features/transactions/types';

const schema = yup.object({
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  date: yup.string().required('Date is required'),
});

type FormData = Omit<Transaction, 'id'>;

interface AddTransactionFormProps {
  onAddTransaction: (transaction: FormData) => void;
  loading: boolean;
}

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other'],
  expense: ['Rent', 'Food', 'Transport', 'Entertainment', 'Healthcare', 'Shopping', 'Other']
};

export default function AddTransactionForm({ onAddTransaction, loading }: AddTransactionFormProps) {
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: FormData) => {
    onAddTransaction(data);
    reset({
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              {...register('type')}
              onChange={(e) => setSelectedType(e.target.value as 'income' | 'expense')}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              {...register('amount')}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full p-2 border rounded-md bg-background"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              {...register('category')}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="">Select category</option>
              {categories[selectedType].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              {...register('description')}
              type="text"
              placeholder="Enter description"
              className="w-full p-2 border rounded-md bg-background"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              {...register('date')}
              type="date"
              className="w-full p-2 border rounded-md bg-background"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add Transaction'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}