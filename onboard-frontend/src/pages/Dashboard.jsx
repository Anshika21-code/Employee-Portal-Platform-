import { useState, useEffect } from "react";
import {
  Users,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  BarChart3,
  Bell,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";


const recentActivity = [
  { msg: "Priya Sharma completed Document Upload", time: "2m ago", type: "success" },
  { msg: "AI Alert: Rohan Gupta is delayed on Training Videos", time: "15m ago", type: "warning" },
  { msg: "Aarav Mehta submitted Policy Acknowledgement", time: "1h ago", type: "success" },
];

const statusConfig = {
  "on-track": {
    label: "On Track",
    icon: CheckCircle2,
    badge: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-500",
  },
  "at-risk": {
    label: "At Risk",
    icon: AlertTriangle,
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-amber-400",
  },
  delayed: {
    label: "Delayed",
    icon: Clock,
    badge: "bg-red-100 text-red-700",
    bar: "bg-red-500",
  },
};

const activityColor = {
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  info: "bg-indigo-400",
};

export default function Dashboard() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [predictions, setPredictions] = useState({});

  // Live Date
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch Dashboard Stats
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/employees")
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(emp => ({
          ...emp,
          avatar: emp.name ? emp.name.charAt(0).toUpperCase() : "E",  
          status: emp.status || "on-track"
        }));
        setEmployees(normalized);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/predict/all")
      .then(res => res.json())
      .then(data => {
        const predMap = {};
        data.forEach(p => { predMap[p.employee_id] = p; });
        setPredictions(predMap);
      })
      .catch(err => console.error("Prediction error:", err));
  }, []);

  //  FIXED: Stats INSIDE component
  const stats = [
    {
      label: "Total Employees",
      value: dashboardData?.total_employees || 0,
      icon: Users,
      change: "+ this month",
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      label: "Pending Tasks",
      value: dashboardData?.pending_tasks || 0,
      icon: ClipboardList,
      change: "Pending",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      label: "Completion Rate",
      value: `${dashboardData?.completion_rate || 0}%`,
      icon: TrendingUp,
      change: "Overall",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6 font-sans">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            HR Dashboard
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {currentDate.toLocaleDateString("en-IN", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })} — Welcome back !!
          </p>
        </div>
        <button className="relative p-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50">
          <Bell size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  {stat.label}
                </span>
                <div className={`${stat.bg} p-2 rounded-xl`}>
                  <Icon size={18} className={stat.text} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span
                  className={`text-xs font-medium ${stat.text} ${stat.bg} px-2 py-1 rounded-lg`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Employee Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-500" />
            <h2 className="font-semibold text-gray-800">
              New Hire Progress
            </h2>
          </div>
          <Link to="/employees">
            <button className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight size={14} />
            </button>
          </Link>
        </div>

        <div className="divide-y divide-gray-50">
          {employees.map((emp, i) => {
            const cfg = statusConfig[emp.status];
            const StatusIcon = cfg.icon;

            return (
              <div
                key={emp.id}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`px-6 py-4 ${
                  hoveredRow === i ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                    {emp.avatar}
                  </div>
                  <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <div>
                      <span className="font-semibold text-sm">
                        {emp.name}
                      </span>
                      <span className="text-gray-400 text-xs ml-2">
                        {emp.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* AI Badge */}
                      {predictions[emp.id] && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                          🤖 {predictions[emp.id].confidence}%
                        </span>
                      )}
                      {/* Status Badge */}
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.badge}`}>
                        <StatusIcon size={11} /> {cfg.label}
                      </span>
                    </div>
                  </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className={`${cfg.bar} h-full rounded-full`}
                        style={{ width: `${emp.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}