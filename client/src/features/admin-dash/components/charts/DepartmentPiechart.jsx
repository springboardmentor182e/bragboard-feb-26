import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const DepartmentPiechart = ({ data = [], loading = false }) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        padding: 12,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        borderRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}%  (${data[ctx.dataIndex]?.count ?? ""} shoutouts)`,
        },
      },
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  const inner = () => {
    if (loading)    return <p className="text-gray-400 text-sm">Loading department data...</p>;
    if (!data.length) return <p className="text-gray-400 text-sm">No department data yet</p>;
    return (
      <div className="flex items-center justify-center gap-10 w-full">
        <div className="w-44 h-44 flex-shrink-0">
          <Pie data={chartData} options={options} />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
          {data.map((dept, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: dept.color }} />
              <p className="text-gray-800 font-semibold truncate flex-1">{dept.name}</p>
              <p className="text-gray-700 font-bold">{dept.value}%</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="mb-6 pb-4 border-b-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-950 mb-1">Department Engagement</h2>
        <p className="text-sm text-gray-600 font-medium">Shout-outs by department (live from DB)</p>
      </div>
      <div className="flex items-center justify-center min-h-[176px]">{inner()}</div>
    </div>
  );
};

export default DepartmentPiechart;
