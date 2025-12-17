import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, getEmployeeTasks } from '../services/api';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();

      // 🔥 Calculate progress for each employee
      const employeesWithProgress = await Promise.all(
        data.map(async (emp) => {
          const tasks = await getEmployeeTasks(emp.id);
          return {
            ...emp,
            progress: calculateProgress(tasks)
          };
        })
      );

      setEmployees(employeesWithProgress);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div
            key={emp.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-bold">{emp.name}</h2>
                <p className="text-sm text-gray-500">{emp.department}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Email: {emp.email}
                </p>
                <p className="text-xs text-gray-400">
                  Start Date: {emp.start_date}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {emp.name[0]}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{emp.progress}%</span>
              </div>
              <ProgressBar percentage={emp.progress} />
            </div>

            <div className="mt-4 text-right">
              <Link
                to={`/employee/${emp.id}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
