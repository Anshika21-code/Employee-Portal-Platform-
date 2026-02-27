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
import { useLocation } from "react-router-dom";


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

const avatarColors = [
  "from-indigo-400 to-violet-500",
  "from-pink-400 to-rose-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-fuchsia-400 to-purple-500",
];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [activities, setActivities] = useState([]);

  // Live Date
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard stats
  const location = useLocation();

useEffect(() => {
  fetch("http://127.0.0.1:5000/api/dashboard/stats")
    .then(res => res.json())
    .then(data => setDashboardData(data))
    .catch(err => console.error(err));
}, [location.pathname]);

  // Fetch employees
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/employees")
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(emp => ({
          ...emp,
          avatar: emp.name ? emp.name.charAt(0).toUpperCase() : "E",
          status: emp.status || "on-track",
          progress: emp.progress || 0,
        }));
        setEmployees(normalized);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch predictions
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/predict/all")
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(p => (map[p.employee_id] = p));
        setPredictions(map);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch activity
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard/activity")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  }, []);

  const stats = [
    {
      label: "Total Employees",
      value: dashboardData?.total_employees || 0,
      icon: Users,
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      label: "New Joiners",
      value: employees.filter(emp => {
        const joinDate = new Date(emp.joined_date);
        const now = new Date();
        const diff = (now - joinDate) / (1000 * 60 * 60 * 24);
        return diff <= 7; // joined within last 7 days
      }).length,
      icon: Users,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Pending Tasks",
      value: dashboardData?.pending_tasks || 0,
      icon: ClipboardList,
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      label: "Completion Rate",
      value: `${dashboardData?.completion_rate || 0}%`,
      icon: TrendingUp,
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">HR Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {currentDate.toLocaleDateString("en-IN", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })} — Welcome back !!
          </p>
        </div>
        <button className="p-2 rounded-xl bg-card shadow-sm border border-border">
          <Bell size={18} />
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card rounded-2xl p-5 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className={`${stat.bg} p-2 rounded-xl`}>
                  <Icon size={18} className={stat.text} />
                </div>
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">

          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" />
              <h2 className="font-semibold text-gray-800">New Hire Progress</h2>
            </div>
            <Link to="/employees" className="text-indigo-600 text-sm flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          {/* AI Classification */}
          <div className="px-6 py-3 bg-indigo-50 flex gap-6 text-xs font-medium">
            <span className="text-indigo-600"> AI Classification</span>
            <span className="text-emerald-600">
              {employees.filter(e => e.status === "on-track").length} On Track
            </span>
            <span className="text-amber-600">
              {employees.filter(e => e.status === "at-risk").length} At Risk
            </span>
            <span className="text-red-600">
              {employees.filter(e => e.status === "delayed").length} Delayed
            </span>
          </div>

          {/* Employee Rows */}
          <div className="divide-y">
          {employees.map((emp, i) => {
              const cfg = statusConfig[emp.status];
              const StatusIcon = cfg.icon;

              return (
                <div key={emp.id} className="px-6 py-4">
                  <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-xs font-bold`}>
                      {emp.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <div>
                          <span className="font-semibold text-sm">{emp.name}</span>
                          <span className="text-gray-400 text-xs ml-2">{emp.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {predictions[emp.id] && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                              🤖 {predictions[emp.id].confidence}%
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.badge}`}>
                            <StatusIcon size={11} /> {cfg.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>
                          Tasks: {emp.tasks_completed || 0}/{emp.tasks_total || 0}
                        </span>
                        <span>{emp.progress}%</span>
                      </div>

                      <div className="h-2 bg-white rounded-full">
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

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Recent Activity */}
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                <h2 className="font-semibold text-white-800">Recent Activity</h2>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                Live
              </span>
            </div>

            <div className="divide-y">
              {activities.length === 0 ? (
                <p className="text-sm text-gray-400 px-6 py-4">No recent activity.</p>
              ) : (
                activities.map((act, i) => (
                  <div key={i} className="px-6 py-3 flex items-start gap-3">
                    <div
                      className={`mt-1.5 w-2 h-2 rounded-full ${
                        act.type === "success"
                          ? "bg-emerald-500"
                          : act.type === "warning"
                          ? "bg-amber-400"
                          : "bg-indigo-400"
                      }`}
                    />
                    <p className="text-sm text-gray-600">{act.msg}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Nudge */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} />
              <h3 className="font-semibold text-sm">AI Nudge</h3>
            </div>
            <p className="text-sm opacity-90">
              One or more employees are falling behind.
              Consider reviewing delayed tasks.
            </p>
            <button className="mt-3 bg-card text-indigo-600 text-xs px-3 py-1.5 rounded-lg font-medium">
              Take Action
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}