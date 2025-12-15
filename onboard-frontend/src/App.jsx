import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeDetail from './pages/EmployeeDetail';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 font-bold text-xl"
                >
                  🚀 OnboardAI
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to OnboardAI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-Based Onboarding Progress Tracker
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}

export default App;