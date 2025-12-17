import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, getEmployeeTasks, createEmployee, getPrediction } from '../services/api';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';

export default function Admin() {
  const [employees, setEmployees] = useState([]);
  const [employeesWithProgress, setEmployeesWithProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    start_date: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const employeesData = await getEmployees();
      
      // Fetch tasks AND AI predictions for each employee
      const employeesWithData = await Promise.all(
        employeesData.map(async (emp) => {
          const [tasks, prediction] = await Promise.all([
            getEmployeeTasks(emp.id),
            getPrediction(emp.id)
          ]);
          
          const completed = tasks.filter(t => t.status === 'Completed').length;
          const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
          
          return {
            ...emp,
            totalTasks: tasks.length,
            completedTasks: completed,
            progress,
            aiStatus: prediction.status,
            aiConfidence: prediction.confidence,
            overdueTasksCount: prediction.metrics.overdue_tasks
          };
        })
      );
      
      setEmployeesWithProgress(employeesWithData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(newEmployee);
      await fetchAllData();
      setShowAddEmployee(false);
      setNewEmployee({ name: '', email: '', department: '', start_date: '' });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading admin data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900"> AI-Powered Admin Panel</h1>
            <p className="text-gray-600 mt-1">Monitor all employee onboarding with AI insights</p>
          </div>
          <button
            onClick={() => setShowAddEmployee(!showAddEmployee)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {showAddEmployee ? 'Cancel' : '+ Add Employee'}
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Employees</div>
            <div className="text-3xl font-bold text-gray-900">{employeesWithProgress.length}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-6">
            <div className="text-sm text-green-600 mb-1"> On Track</div>
            <div className="text-3xl font-bold text-green-700">
              {employeesWithProgress.filter(e => e.aiStatus === 'on-track').length}
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-6">
            <div className="text-sm text-yellow-600 mb-1">At Risk</div>
            <div className="text-3xl font-bold text-yellow-700">
              {employeesWithProgress.filter(e => e.aiStatus === 'at-risk').length}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-6">
            <div className="text-sm text-red-600 mb-1"> Delayed</div>
            <div className="text-3xl font-bold text-red-700">
              {employeesWithProgress.filter(e => e.aiStatus === 'delayed').length}
            </div>
          </div>
        </div>

        {/* Add Employee Form */}
        {showAddEmployee && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEmployee.start_date}
                    onChange={(e) => setNewEmployee({ ...newEmployee, start_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Employees Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     AI Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overdue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeesWithProgress.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32">
                        <ProgressBar percentage={employee.progress} />
                        <div className="text-xs text-gray-500 mt-1">
                          {employee.completedTasks}/{employee.totalTasks} tasks
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <StatusBadge status={employee.aiStatus} />
                        <p className="text-xs text-gray-500 mt-1">
                          {employee.aiConfidence}% confidence
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${
                        employee.overdueTasksCount > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {employee.overdueTasksCount > 0 ? `${employee.overdueTasksCount} tasks` : '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/employee/${employee.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {employeesWithProgress.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No employees found</p>
          </div>
        )}
      </div>
    </div>
  );
}