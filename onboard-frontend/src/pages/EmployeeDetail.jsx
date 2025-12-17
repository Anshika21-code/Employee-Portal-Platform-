import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getEmployee,
  getEmployeeTasks,
  updateTask,
  deleteTask,
  createTask,
  getPrediction
} from '../services/api';
import TaskCard from '../components/TaskCard';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';

export default function EmployeeDetail() {
  const { id } = useParams();
  const { canEdit } = useAuth();
  const canEditEmployee = canEdit(parseInt(id));

  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'Not Started'
  });

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const [empData, tasksData, predictionData] = await Promise.all([
        getEmployee(id),
        getEmployeeTasks(id),
        getPrediction(id)
      ]);
      setEmployee(empData);
      setTasks(tasksData || []);
      setPrediction(predictionData || null);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      const predictionData = await getPrediction(id);
      setPrediction(predictionData || null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      const predictionData = await getPrediction(id);
      setPrediction(predictionData || null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = { ...newTask, employee_id: parseInt(id) };
      await createTask(taskData);
      await fetchEmployeeData();
      setShowAddTask(false);
      setNewTask({
        title: '',
        description: '',
        due_date: '',
        status: 'Not Started'
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading employee data...</div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-xl">Employee not found</p>
      </div>
    );
  }

  const progress = calculateProgress();

  //  SAFE AI FALLBACKS (THIS FIXES YOUR CRASH)
  const metrics = prediction?.metrics ?? {
    completion_rate: progress,
    days_elapsed: 0,
    overdue_tasks: 0,
    total_tasks: tasks.length
  };

  const recommendations = prediction?.recommendations ?? [];

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

      {/* Employee Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-gray-600">
              {employee.department} • {employee.email}
            </p>
          </div>

          {prediction && (
            <div className="text-right">
              <StatusBadge status={prediction.status} />
              <p className="text-xs text-gray-500 mt-1">
                AI Confidence: {prediction.confidence ?? 0}%
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-semibold">Onboarding Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <ProgressBar percentage={progress} />
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-500">
        <h2 className="text-xl font-bold mb-4">AI Insights</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-3 rounded-lg shadow">
            <p className="text-xs text-gray-500">Completion Rate</p>
            <p className="text-lg font-bold text-blue-600">
              {metrics.completion_rate}%
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <p className="text-xs text-gray-500">Days Elapsed</p>
            <p className="text-lg font-bold text-purple-600">
              {metrics.days_elapsed}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <p className="text-xs text-gray-500">Overdue Tasks</p>
            <p className="text-lg font-bold text-red-600">
              {metrics.overdue_tasks}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <p className="text-xs text-gray-500">Total Tasks</p>
            <p className="text-lg font-bold text-gray-700">
              {metrics.total_tasks}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2"> Recommendations</h3>
          {recommendations.length === 0 ? (
            <p className="text-sm text-gray-500">
              No AI recommendations yet.
            </p>
          ) : (
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {rec}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          {canEditEmployee && (
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {showAddTask ? 'Cancel' : '+ Add Task'}
            </button>
          )}
        </div>

        {showAddTask && (
          <form onSubmit={handleAddTask} className="mb-6 space-y-3">
            <input
              className="w-full border p-2 rounded"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Create Task
            </button>
          </form>
        )}

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No tasks assigned yet
          </p>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={canEditEmployee ? handleStatusChange : null}
                onDelete={canEditEmployee ? handleDeleteTask : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
