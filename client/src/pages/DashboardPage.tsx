import Dashboard from '@/components/Dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, John! Here's what's happening with your money.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                This Month
              </button>
            </div>
          </div>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}