import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../services/api';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No employees found</p>
            <p className="text-gray-400 text-sm mt-2">
              Run the dummy data script to add sample employees
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Link
                key={employee.id}
                to={`/employee/${employee.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-600">{employee.department}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {employee.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-xs text-gray-500 mb-1">Email: {employee.email}</p>
                  <p className="text-xs text-gray-500">Start Date: {employee.start_date}</p>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <ProgressBar percentage={0} />
                </div>

                <div className="mt-4 text-right">
                  <span className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}