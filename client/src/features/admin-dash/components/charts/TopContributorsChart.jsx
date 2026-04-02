import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TopContributorsChart = ({ data = [], loading = false }) => {
  const maxValue = data.length ? Math.max(...data.map((d) => d.value)) : 10;
  const yMax = Math.ceil(maxValue / 5) * 5 || 10;

  const inner = () => {
    if (loading)  return <p className="text-gray-400 text-sm">Loading contributors...</p>;
    if (!data.length) return <p className="text-gray-400 text-sm">No contributor data yet</p>;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, yMax]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#fff" }}
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
            formatter={(val, name) => [val, "Shoutouts sent"]}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366f1" animationDuration={700} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="mb-6 pb-4 border-b-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-950 mb-1">Top Contributors</h2>
        <p className="text-sm text-gray-600 font-medium">Most shout-outs sent (all time)</p>
      </div>
      <div className="flex items-center justify-center min-h-[300px]">{inner()}</div>
    </div>
  );
};

export default TopContributorsChart;
