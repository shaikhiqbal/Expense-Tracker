import Navbar from './components/Navbar/Navbar';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DashboardPage />
    </div>
  );
}

export default App;