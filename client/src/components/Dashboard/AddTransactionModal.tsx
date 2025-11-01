import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

interface AddTransactionModalProps {
  onAddTransaction: (transaction: FormData) => void;
  loading: boolean;
}

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other'],
  expense: ['Rent', 'Food', 'Transport', 'Entertainment', 'Healthcare', 'Shopping', 'Other']
};

export default function AddTransactionModal({ onAddTransaction, loading }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white">
          + Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedType('expense');
                setValue('type', 'expense');
              }}
              className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-medium ${
                selectedType === 'expense'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-500'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedType('income');
                setValue('type', 'income');
              }}
              className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-medium ${
                selectedType === 'income'
                  ? 'border-secondary bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-secondary/50 dark:hover:border-secondary'
              }`}
            >
              Income
            </button>
          </div>
          <Controller
            name="type"
            control={control}
            render={() => <input type="hidden" value={selectedType} />}
          />

          <div>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                />
              )}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select category</option>
                  {categories[selectedType].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                />
              )}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                />
              )}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 text-white">
              {loading ? 'Adding...' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}