import { Chart } from "react-google-charts";

export default function TaskCompletionChart() {
  const data = [
    ["Status", "Tasks"],
    ["Completed", 52],
    ["In Progress", 30],
    ["Pending", 18],
  ];

  const options = {
    pieHole: 0.65,
    legend: { position: "right" },
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    chartArea: { width: "90%", height: "80%" },
    backgroundColor: "transparent",
  };

  return (
    <div className="flex flex-col items-center">
      <Chart
        chartType="PieChart"
        width="100%"
        height="220px"
        data={data}
        options={options}
      />
      <p className="text-lg font-semibold mt-2">52% completed</p>
    </div>
  );
}
