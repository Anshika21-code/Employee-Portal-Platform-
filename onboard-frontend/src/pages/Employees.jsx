import { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  Mail,
  MoreHorizontal,
} from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Frontend Developer",
    department: "Engineering",
    avatar: "AM",
    progress: 85,
    status: "on-track",
    joined: "Feb 20, 2026",
    email: "aarav@company.com",
    tasks: "17/20",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Data Analyst",
    department: "Analytics",
    avatar: "PS",
    progress: 45,
    status: "at-risk",
    joined: "Feb 18, 2026",
    email: "priya@company.com",
    tasks: "9/20",
  },
  {
    id: 3,
    name: "Rohan Gupta",
    role: "Backend Engineer",
    department: "Engineering",
    avatar: "RG",
    progress: 20,
    status: "delayed",
    joined: "Feb 15, 2026",
    email: "rohan@company.com",
    tasks: "4/20",
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "UI/UX Designer",
    department: "Design",
    avatar: "SP",
    progress: 95,
    status: "on-track",
    joined: "Feb 22, 2026",
    email: "sneha@company.com",
    tasks: "19/20",
  },
  {
    id: 5,
    name: "Kabir Singh",
    role: "DevOps Engineer",
    department: "Infrastructure",
    avatar: "KS",
    progress: 60,
    status: "at-risk",
    joined: "Feb 17, 2026",
    email: "kabir@company.com",
    tasks: "12/20",
  },
  {
    id: 6,
    name: "Neha Joshi",
    role: "Product Manager",
    department: "Product",
    avatar: "NJ",
    progress: 10,
    status: "delayed",
    joined: "Feb 24, 2026",
    email: "neha@company.com",
    tasks: "2/20",
  },
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

const avatarColors = [
  "from-indigo-400 to-violet-500",
  "from-pink-400 to-rose-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-fuchsia-400 to-purple-500",
];

export default function Employees() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || emp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6 font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Employees
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {employees.length} total employees in onboarding
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors">
          <UserPlus size={15} />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 appearance-none bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="on-track">On Track</option>
            <option value="at-risk">At Risk</option>
            <option value="delayed">Delayed</option>
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Status Summary Pills */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { key: "all", label: "All", count: employees.length, color: "bg-gray-100 text-gray-700" },
          { key: "on-track", label: "On Track", count: employees.filter(e => e.status === "on-track").length, color: "bg-emerald-100 text-emerald-700" },
          { key: "at-risk", label: "At Risk", count: employees.filter(e => e.status === "at-risk").length, color: "bg-amber-100 text-amber-700" },
          { key: "delayed", label: "Delayed", count: employees.filter(e => e.status === "delayed").length, color: "bg-red-100 text-red-700" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterStatus(s.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${s.color} ${filterStatus === s.key ? "ring-2 ring-offset-1 ring-indigo-400" : "opacity-70 hover:opacity-100"}`}
          >
            {s.label} ({s.count})
          </button>
        ))}
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((emp, i) => {
          const cfg = statusConfig[emp.status];
          const StatusIcon = cfg.icon;
          return (
            <div
              key={emp.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold`}>
                    {emp.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{emp.name}</p>
                    <p className="text-xs text-gray-400">{emp.role}</p>
                  </div>
                </div>
                <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badge}`}>
                  <StatusIcon size={11} />
                  {cfg.label}
                </span>
                <span className="text-xs text-gray-400">{emp.department}</span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Tasks: {emp.tasks}</span>
                  <span className="font-semibold">{emp.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cfg.bar} transition-all duration-700`}
                    style={{ width: `${emp.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-xs text-gray-400">Joined {emp.joined}</span>
                <button className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                  <Mail size={12} />
                  Nudge
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No employees found</p>
          <p className="text-sm">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}