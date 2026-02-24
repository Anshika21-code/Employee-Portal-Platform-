import { useState } from "react";
import { Chart } from "react-google-charts";

const years = [2023, 2024, 2025, 2026];

const months = {
  Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30,
  Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31,
};

const monthIndex = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

const intervals = [
  { label: "1-5", start: 1, end: 5 },
  { label: "6-10", start: 6, end: 10 },
  { label: "11-15", start: 11, end: 15 },
  { label: "16-20", start: 16, end: 20 },
  { label: "21-25", start: 21, end: 25 },
  { label: "26-31", start: 26, end: 31 },
];

export default function PerformanceChart() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("Dec");
  const [interval, setInterval] = useState(intervals[0]);

  // Date of Joining (later from backend)
  const dateOfJoining = new Date(2025, 11, 25);
  const today = new Date();

  const isWeekend = (date) => {
    const d = date.getDay();
    return d === 0 || d === 6;
  };

  const generateData = () => {
    const data = [
      [
        "Day",
        "Performance",
        { type: "string", role: "tooltip", p: { html: true } },
      ],
    ];

    let performance = 60;
    const maxDays = months[month];

    for (
      let day = interval.start;
      day <= Math.min(interval.end, maxDays);
      day++
    ) {
      const currentDate = new Date(year, monthIndex[month], day);

      if (currentDate < dateOfJoining) continue;
      if (currentDate > today) continue;
      if (isWeekend(currentDate)) continue;

      // Dummy daily data (backend later)
      const tasksDone = Math.floor(Math.random() * 5) + 1;
      const hoursWorked = (Math.random() * 3 + 6).toFixed(1);

      performance += Math.floor(Math.random() * 3) + 1;

      const tooltip = `
        <div style="padding:8px 10px">
          <strong>${day} ${month} ${year}</strong><br/>
          Tasks Done: <b>${tasksDone}</b><br/>
          Hours Worked: <b>${hoursWorked} hrs</b><br/>
          Performance: <b>${performance}</b>
        </div>
      `;

      data.push([day.toString(), performance, tooltip]);
    }

    return data.length > 1
      ? data
      : [["Day", "Performance", { role: "tooltip" }], ["No Data", 0, ""]];
  };

  const options = {
    curveType: "function",
    legend: { position: "none" },
    tooltip: { isHtml: true },
    hAxis: {
      title: "Working Days (Mon–Fri)",
      textStyle: { color: "#6B7280" },
    },
    vAxis: {
      minValue: 0,
      maxValue: 100,
      gridlines: { color: "#E5E7EB" },
    },
    colors: ["#3B82F6"],
    chartArea: { width: "85%", height: "70%" },
    backgroundColor: "transparent",
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="text-sm border rounded px-2 py-1"
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="text-sm border rounded px-2 py-1"
        >
          {Object.keys(months).map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={interval.label}
          onChange={(e) =>
            setInterval(intervals.find(i => i.label === e.target.value))
          }
          className="text-sm border rounded px-2 py-1"
        >
          {intervals.map(i => (
            <option key={i.label} value={i.label}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <Chart
        chartType="LineChart"
        width="100%"
        height="260px"
        data={generateData()}
        options={options}
      />
    </div>
  );
}
