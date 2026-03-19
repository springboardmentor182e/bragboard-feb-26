import React, { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const growthData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 20 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 42 },
  { name: "May", value: 55 },
  { name: "Jun", value: 70 }
];

const COLORS = ["#7C3AED", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];

export default function Dashboard() {

  const { employees, totalEmployees, totalDepartments, topEmployees } =
    useContext(EmployeeContext);

  /* Department Distribution */
  const departmentCounts = {};

  employees.forEach((emp) => {
    departmentCounts[emp.department] =
      (departmentCounts[emp.department] || 0) + 1;
  });

  const departmentData = Object.keys(departmentCounts).map((dept) => ({
    name: dept,
    value: departmentCounts[dept]
  }));

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Employee Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of employees and recognition activity
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-sm">Total Employees</h3>
          <p className="text-3xl font-bold mt-2">
            {totalEmployees}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Departments
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {totalDepartments}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Active Employees
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {employees.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Recognitions
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {employees.reduce((sum, e) => sum + e.recognition, 0)}
          </p>
        </div>

      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-2 gap-6">

        {/* EMPLOYEE GROWTH */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4 text-gray-700">
            Employee Growth
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>

              <Line
                type="monotone"
                dataKey="value"
                stroke="#7C3AED"
                strokeWidth={3}
                dot={{ r: 5 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* DEPARTMENT DISTRIBUTION */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4 text-gray-700">
            Department Distribution
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={departmentData}
                dataKey="value"
                outerRadius={90}
                label
              >

                {departmentData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP RECOGNIZED EMPLOYEES */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4 text-gray-700">
          Top Recognized Employees
        </h2>

        <div className="space-y-4">

          {topEmployees.map((emp) => (

            <div
              key={emp.id}
              className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 p-2 rounded transition"
            >

              <div className="flex items-center gap-3">

                <img
                  src={`https://i.pravatar.cc/40?img=${emp.id}`}
                  alt="emp"
                  className="w-9 h-9 rounded-full"
                />

                <div>
                  <p className="font-medium">
                    {emp.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {emp.role}
                  </p>
                </div>

              </div>

              <span className="text-purple-600 font-semibold">
                ⭐ {emp.recognition}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}