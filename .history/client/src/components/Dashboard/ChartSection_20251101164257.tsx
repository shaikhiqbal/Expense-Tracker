import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

interface ChartSectionProps {
  totalIncome: number;
  totalExpenses: number;
}

export default function ChartSection({ totalIncome, totalExpenses }: ChartSectionProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const doughnutData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [totalIncome, totalExpenses, totalIncome - totalExpenses],
        backgroundColor: ['#59BA89', '#EF4444', '#00575B'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [4000, 4500, 5000, 4800, 5200, totalIncome],
        borderColor: '#59BA89',
        backgroundColor: chartType === 'line' ? 'rgba(89, 186, 137, 0.1)' : '#59BA89',
        borderWidth: 3,
        fill: chartType === 'line',
        tension: 0.4,
        pointBackgroundColor: '#59BA89',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: chartType === 'line' ? 6 : 0,
        borderRadius: chartType === 'bar' ? 8 : 0,
      },
      {
        label: 'Expenses',
        data: [3000, 3200, 2800, 3500, 3100, totalExpenses],
        borderColor: '#EF4444',
        backgroundColor: chartType === 'line' ? 'rgba(239, 68, 68, 0.1)' : '#EF4444',
        borderWidth: 3,
        fill: chartType === 'line',
        tension: 0.4,
        pointBackgroundColor: '#EF4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: chartType === 'line' ? 6 : 0,
        borderRadius: chartType === 'bar' ? 8 : 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
      },
    },
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Spending Categories - Doughnut Chart */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Spending Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">${((totalIncome - totalExpenses) / 1000).toFixed(1)}k</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Saved</div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Income</span>
              </div>
              <span className="text-sm font-medium dark:text-white">${(totalIncome / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Expenses</span>
              </div>
              <span className="text-sm font-medium dark:text-white">${(totalExpenses / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income vs Expenses Trend - Line/Bar Chart */}
      <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Income vs Expenses</CardTitle>
            <div className="flex items-center space-x-4">
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
                  className={`h-8 px-3 text-xs ${chartType === 'bar' ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  Bar
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Income</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Expenses</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            {chartType === 'line' ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}