import StatusBadge from "./StatusBadge";

export default function EmployeeRankTable() {
  const employees = [
    { id: "EMP-001", name: "John Doe", rank: 5, status: "Top 15%" },
    { id: "EMP-002", name: "Peter Jones", rank: 28, status: "Mid" },
    { id: "EMP-003", name: "Sarah Lee", rank: 45, status: "Mid" },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Search employee"
        className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-2">Emp ID</th>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Rank</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="py-2">{emp.id}</td>
              <td className="py-2">{emp.name}</td>
              <td className="py-2">{emp.rank}</td>
              <td className="py-2">
                <StatusBadge status={emp.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
