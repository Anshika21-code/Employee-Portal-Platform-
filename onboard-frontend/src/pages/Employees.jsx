import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Users,   
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  Mail,
  MoreHorizontal,
} from "lucide-react";


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
  const [employees, setEmployees] = useState([]);

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || emp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  role: "",
  department: "",
  joined_date: "",
  remarks: "",
});

const handleAddEmployee = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to add employee");
    }

    // Reload employees cleanly
    const refresh = await fetch("http://127.0.0.1:5000/api/employees");
    const data = await refresh.json();

    setEmployees(data);

    setShowForm(false);
    setFormData({
      name: "",
      role: "",
      department: "",
      joined_date: "",
      remarks: "",
    });

  } catch (error) {
    console.error("Error adding employee:", error);
  }
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/employees/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    setEmployees(prev => prev.filter(emp => emp.id !== id));

  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

useEffect(() => {
  const loadEmployees = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/employees");

      if (!res.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await res.json();

      // Safety fallback so UI never crashes
      const normalized = data.map(emp => ({
        ...emp,
        status: emp.status || "on-track",
        progress: emp.progress || 0,
        tasks_total: emp.tasks_total || 0,
        avatar: emp.name ? emp.name.charAt(0).toUpperCase() : "E"
      }));

      setEmployees(normalized);

    } catch (err) {
      console.error("Error loading employees:", err);
    }
  };

  loadEmployees();
}, []);

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
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors">
          <UserPlus size={15} />
          Add Employee
        </button>
      </div>

      {showForm && (
  <div className="bg-white p-4 rounded-xl shadow mb-6">
    <div className="grid grid-cols-2 gap-3">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={formData.joined_date}
        onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
        className="border p-2 rounded"
      />
      <input
  type="text"
  placeholder="Remarks"
  value={formData.remarks}
  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
  className="border p-2 rounded col-span-2"
/>
    </div>

    <div className="mt-3 flex gap-2">
      <button
        onClick={handleAddEmployee}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      <button
        onClick={() => setShowForm(false)}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Cancel
      </button>
      {/* <button
  onClick={() => handleDelete(emp.id)}
  className="text-red-500 text-xs"
>
  Delete
</button> */}
    </div>
  </div>
)}

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
                <span>Tasks: {emp.tasks_total}</span>
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
              <span className="text-xs text-gray-400">Joined {emp.joined_date}</span>
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