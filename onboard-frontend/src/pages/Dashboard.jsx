import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import PerformanceChart from "../components/PerformanceChart";
import TaskCompletionChart from "../components/TaskCompletionChart";
import EmployeeRankTable from "../components/EmployeeRankTable";
import Header from '../components/layout/Header';

export default function Dashboard() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    setEmployee({
      name: storedUser?.name || "Employee",
      progress: 72,
      tasksCompleted: 48,
      comfortZone: 'Comfort Zone'
    });
  
    setLoading(false);
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-gray-50 min-h-screen">

      {/* ===== Header ===== */}
      <Header/>

      {/* ===== Top Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Progress Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-3">Progress</h3>
          <ProgressBar percentage={employee.progress} />
          <div className="flex justify-between mt-2 text-sm">
            <span>{employee.progress}%</span>
            <span className="text-green-600">{employee.comfortZone}</span>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-3">
            Employee Performance Overview
          </h3>
          <PerformanceChart />
        </div>

        
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Employee Rank Table */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-3">
            Employee Rank Among Others
          </h3>
          <EmployeeRankTable />
        </div>

        {/* Task Completion Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-3">
            Total Tasks Completed
          </h3>
          <TaskCompletionChart />
        </div>
      </div>

    </div>
  );
}
