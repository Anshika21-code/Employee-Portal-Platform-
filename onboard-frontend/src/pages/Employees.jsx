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

  // Replace existing form states with these:
const [showForm, setShowForm] = useState(false);
const [step, setStep] = useState(1); // 1 = employee details, 2 = assign tasks
const [formData, setFormData] = useState({
  name: "", role: "", department: "", joined_date: "", remarks: ""
});
const [tasks, setTasks] = useState([
  { title: "", description: "", due_date: "" }
]);
const [newEmpId, setNewEmpId] = useState(null);

// Add/remove task rows
const addTaskRow = () => {
  setTasks([...tasks, { title: "", description: "", due_date: "" }]);
};

const removeTaskRow = (index) => {
  setTasks(tasks.filter((_, i) => i !== index));
};

const updateTask = (index, field, value) => {
  const updated = [...tasks];
  updated[index][field] = value;
  setTasks(updated);
};

// Step 1: Save employee, move to step 2
const handleSaveEmployee = async () => {
  if (!formData.name) return alert("Name is required");
  try {
    const res = await fetch("http://127.0.0.1:5000/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to add employee");
    const data = await res.json();
    setNewEmpId(data.id);
    setStep(2); // Move to task assignment
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};

// Step 2: Save tasks
const handleSaveTasks = async () => {
  try {
    const validTasks = tasks.filter(t => t.title.trim() !== "");
    if (validTasks.length > 0) {
      const res = await fetch("http://127.0.0.1:5000/api/tasks/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: newEmpId, tasks: validTasks }),
      });
      if (!res.ok) throw new Error("Failed to save tasks");
    }

    // Refresh employee list
    const refresh = await fetch("http://127.0.0.1:5000/api/employees");
    const empData = await refresh.json();
    const normalized = empData.map(emp => ({
      ...emp,
      status: emp.status || "on-track",
      progress: emp.progress || 0,
      tasks_total: emp.tasks_total || 0,
      avatar: emp.name ? emp.name.charAt(0).toUpperCase() : "E"
    }));
    setEmployees(normalized);

    // Reset form
    setShowForm(false);
    setStep(1);
    setFormData({ name: "", role: "", department: "", joined_date: "", remarks: "" });
    setTasks([{ title: "", description: "", due_date: "" }]);
    setNewEmpId(null);

  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

// const handleAddEmployee = async () => {
//   try {
//     const res = await fetch("http://127.0.0.1:5000/api/employees", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to add employee");
//     }

//     // Reload employees cleanly
//     const refresh = await fetch("http://127.0.0.1:5000/api/employees");
//     const data = await refresh.json();

//     setEmployees(data);

//     setShowForm(false);
//     setFormData({
//       name: "",
//       role: "",
//       department: "",
//       joined_date: "",
//       remarks: "",
//     });

//   } catch (error) {
//     console.error("Error adding employee:", error);
//   }
// };

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
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
    
    {/* Step indicators */}
    <div className="flex items-center gap-3 mb-6">
      <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full ${step === 1 ? "bg-indigo-600 text-white" : "bg-emerald-100 text-emerald-700"}`}>
        {step > 1 ? "✓" : "1"} Employee Details
      </div>
      <div className="h-px w-6 bg-gray-200" />
      <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full ${step === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}>
        2 Assign Tasks
      </div>
    </div>

    {/* Step 1: Employee Details */}
    {step === 1 && (
      <div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            type="text" placeholder="Full Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
          
            type="text" placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="text" placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {/* <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400">
    Date of Joining
  </label>
          {/* <input
            type="date"
            value={formData.joined_date}
            onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          /> */}
          {/* <input
    type="date"
    value={formData.joined_date}
    onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
    className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
  /> */} 
  <div className="relative">
  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400">
    Date of Joining
  </label>
  <input
    type="date"
    value={formData.joined_date}
    onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
    className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
  />
</div>
          <input
            type="text" placeholder="Remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            className="border border-gray-200 p-2.5 rounded-xl text-sm col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSaveEmployee}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-colors">
            Next: Assign Tasks →
          </button>
          <button onClick={() => { setShowForm(false); setStep(1); }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-5 py-2.5 rounded-xl font-medium transition-colors">
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Step 2: Assign Tasks */}
    {step === 2 && (
      <div>
        <p className="text-sm text-gray-500 mb-4">Add tasks for the new employee. Title is required.</p>

        <div className="space-y-3 mb-4">
          {tasks.map((task, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-start bg-gray-50 p-3 rounded-xl">
              <input
                type="text" placeholder="Task title *"
                value={task.title}
                onChange={(e) => updateTask(index, "title", e.target.value)}
                className="col-span-3 border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              />
              <input
                type="text" placeholder="Description"
                value={task.description}
                onChange={(e) => updateTask(index, "description", e.target.value)}
                className="col-span-5 border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              />
              {/* <input
                type="date"
                value={task.due_date}
                onChange={(e) => updateTask(index, "due_date", e.target.value)}
                className="col-span-3 border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              /> */}
              <div className="relative col-span-3">
  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400">
    Due Date
  </label>
  <input
    type="date"
    required
    value={task.due_date}
    onChange={(e) => updateTask(index, "due_date", e.target.value)}
    className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
  />
</div>
              <button onClick={() => removeTaskRow(index)}
                className="col-span-1 text-red-400 hover:text-red-600 text-lg font-bold flex items-center justify-center pt-1">
                ×
              </button>
            </div>
          ))}
        </div>

        <button onClick={addTaskRow}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-5 flex items-center gap-1">
          + Add another task
        </button>

        <div className="flex gap-2">
          <button onClick={handleSaveTasks}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-colors">
            Save & Finish ✓
          </button>
          <button onClick={() => setStep(1)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-5 py-2.5 rounded-xl font-medium transition-colors">
            ← Back
          </button>
          <button onClick={handleSaveTasks}
            className="text-gray-400 hover:text-gray-600 text-sm px-3 py-2.5 transition-colors">
            Skip tasks
          </button>
        </div>
      </div>
    )}
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