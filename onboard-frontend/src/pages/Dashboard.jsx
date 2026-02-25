// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>

//       <div className="grid gap-6 md:grid-cols-3">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Employees</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">124</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>New Joiners</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">8</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Pending Tasks</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">21</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// } 

import { useState } from "react";
import {
  Users,
  UserPlus,
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
// import { UserButton } from "@clerk/clerk-react"

const stats = [
  {
    label: "Total Employees",
    value: "124",
    icon: Users,
    change: "+4 this month",
    color: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    label: "New Joiners",
    value: "8",
    icon: UserPlus,
    change: "This week",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    label: "Pending Tasks",
    value: "21",
    icon: ClipboardList,
    change: "3 overdue",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    label: "Completion Rate",
    value: "76%",
    icon: TrendingUp,
    change: "+12% vs last month",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
];

const employees = [
  {
    name: "Aarav Mehta",
    role: "Frontend Developer",
    avatar: "AM",
    progress: 85,
    status: "on-track",
    joined: "Feb 20",
    tasks: "17/20",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    avatar: "PS",
    progress: 45,
    status: "at-risk",
    joined: "Feb 18",
    tasks: "9/20",
  },
  {
    name: "Rohan Gupta",
    role: "Backend Engineer",
    avatar: "RG",
    progress: 20,
    status: "delayed",
    joined: "Feb 15",
    tasks: "4/20",
  },
  {
    name: "Sneha Patel",
    role: "UI/UX Designer",
    avatar: "SP",
    progress: 95,
    status: "on-track",
    joined: "Feb 22",
    tasks: "19/20",
  },
  {
    name: "Kabir Singh",
    role: "DevOps Engineer",
    avatar: "KS",
    progress: 60,
    status: "at-risk",
    joined: "Feb 17",
    tasks: "12/20",
  },
];

const recentActivity = [
  { msg: "Priya Sharma completed Document Upload", time: "2m ago", type: "success" },
  { msg: "AI Alert: Rohan Gupta is delayed on Training Videos", time: "15m ago", type: "warning" },
  { msg: "Aarav Mehta submitted Policy Acknowledgement", time: "1h ago", type: "success" },
  { msg: "Kabir Singh started IT Setup task", time: "2h ago", type: "info" },
  { msg: "New hire Neha Joshi added to onboarding", time: "3h ago", type: "info" },
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

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6 font-sans">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            HR Dashboard
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Wednesday, 25 February 2026 — Welcome back 👋
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors">
            <Zap size={15} />
            AI Insights
          </button>
          {/* <div className="p-4">
  <UserButton afterSignOutUrl="/" />
</div> */}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                <div className={`${stat.bg} p-2 rounded-xl`}>
                  <Icon size={18} className={stat.text} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.text} ${stat.bg} px-2 py-1 rounded-lg`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content: Table + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Employee Progress Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" />
              <h2 className="font-semibold text-gray-800">New Hire Progress</h2>
            </div>
            <button className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight size={14} />
            </button>
          </div>

          {/* AI Status Summary */}
          <div className="px-6 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center gap-4 text-xs font-medium">
            <span className="text-indigo-500 font-semibold flex items-center gap-1"><Zap size={12}/> AI Classification</span>
            <span className="text-emerald-600">● 2 On Track</span>
            <span className="text-amber-600">● 2 At Risk</span>
            <span className="text-red-600">● 1 Delayed</span>
          </div>

          <div className="divide-y divide-gray-50">
            {employees.map((emp, i) => {
              const cfg = statusConfig[emp.status];
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={emp.name}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`px-6 py-4 transition-colors ${hoveredRow === i ? "bg-gray-50" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {emp.avatar}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="font-semibold text-gray-800 text-sm">{emp.name}</span>
                          <span className="text-gray-400 text-xs ml-2">{emp.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Tasks: {emp.tasks}</span>
                          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>
                            <StatusIcon size={11} />
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cfg.bar} transition-all duration-700`}
                            style={{ width: `${emp.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-600 w-8 text-right">
                          {emp.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Recent Activity</h2>
            <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">Live</span>
          </div>
          <div className="px-6 py-4 space-y-5">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1.5 flex-shrink-0">
                  <span className={`block w-2 h-2 rounded-full ${activityColor[a.type]}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-700 leading-snug">{a.msg}</p>
                  <span className="text-xs text-gray-400 mt-0.5 block">{a.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Nudge Box */}
          <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} />
              <span className="text-xs font-semibold uppercase tracking-wide">AI Nudge</span>
            </div>
            <p className="text-sm leading-snug opacity-90">
              Rohan Gupta hasn't completed Training Videos. Consider sending a reminder.
            </p>
            <button className="mt-3 w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg py-1.5 text-xs font-semibold">
              Send Reminder
            </button>
          </div>
        </div>
      </div>

      {/* Week Progress Timeline */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Onboarding Timeline — Week 1 Tasks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { task: "IT Setup", done: true },
            { task: "HR Documentation", done: true },
            { task: "Training Videos", done: false },
            { task: "Policy Sign-off", done: false },
          ].map((t) => (
            <div
              key={t.task}
              className={`rounded-xl border-2 p-4 flex items-center gap-3 ${
                t.done
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                t.done ? "bg-emerald-500" : "bg-gray-200"
              }`}>
                {t.done ? (
                  <CheckCircle2 size={16} className="text-white" />
                ) : (
                  <Clock size={16} className="text-gray-400" />
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${t.done ? "text-emerald-800" : "text-gray-500"}`}>
                  {t.task}
                </p>
                <p className="text-xs text-gray-400">{t.done ? "Completed" : "Pending"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}