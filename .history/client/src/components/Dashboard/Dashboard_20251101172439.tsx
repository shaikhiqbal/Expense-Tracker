import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency } from '@/utils/formatCurrency';
import SummaryCards from './SummaryCards';
import DoughnutChart from '../charts/DoughnutChart';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import AddTransactionModal from './AddTransactionModal';
import DashboardSkeleton from '../common/DashboardSkeleton';

export default function Dashboard() {
  const {
    transactions,
    loading,
    error,
    addNewTransaction,
    totalIncome,
    totalExpenses,
    balance,
  } = useTransactions();

  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const monthlyData = [
    { month: 'Jan', income: 4000, expense: 3000 },
    { month: 'Feb', income: 4500, expense: 3200 },
    { month: 'Mar', income: 5000, expense: 2800 },
    { month: 'Apr', income: 4800, expense: 3500 },
    { month: 'May', income: 5200, expense: 3100 },
    { month: 'Jun', income: totalIncome, expense: totalExpenses },
  ];

  if (loading && transactions.length === 0) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <DoughnutChart income={totalIncome} expense={totalExpenses} />
            </div>
          </CardContent>
        </Card>

        {/* Line/Bar Chart Toggle */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Trends
              </CardTitle>
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  variant={chartType === 'line' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className={`h-8 px-3 text-xs ${chartType === 'line' ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  Line
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className={`h-8 px-3 text-xs text-white ${chartType === 'bar' ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  Bar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {chartType === 'line' ? (
                <LineChart data={monthlyData} />
              ) : (
                <BarChart data={monthlyData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Transactions
            </CardTitle>
            <AddTransactionModal
              onAddTransaction={addNewTransaction}
              loading={loading}
            />
          </div>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No transactions found
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-white">
                    Type
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-white">
                    Description
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-white">
                    Category
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-white">
                    Date
                  </TableHead>
                  <TableHead className="text-right text-gray-900 dark:text-white">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <TableCell>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          transaction.type === 'income'
                            ? 'bg-secondary/20 dark:bg-secondary/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 ${
                            transaction.type === 'income'
                              ? 'text-secondary dark:text-secondary'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                              transaction.type === 'income'
                                ? 'M7 11l5-5m0 0l5 5m-5-5v12'
                                : 'M17 13l-5 5m0 0l-5-5m5 5V6'
                            }
                          />
                        </svg>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        transaction.type === 'income'
                          ? 'text-secondary dark:text-secondary'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
