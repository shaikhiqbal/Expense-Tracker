import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import { deleteTransaction } from '@/store/slices/transactionSlice';

export default function TransactionsPage() {
  const { transactions } = useAppSelector((state) => state.transactions);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    // dispatch(deleteTransaction(id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Transactions
          </h1>
          <p className="text-muted-foreground">Manage your financial records</p>
        </div>
        <Button>Add New Transaction</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Complete list of your income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`font-medium ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {transaction.amount}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
