import { motion } from "framer-motion";

function EmployeeTable({
  employees,
  onToggleStatus,
  onRoleChange,
  onDepartmentChange,
  onDeleteEmployee,
}) {
  // Common departments in the company
  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Analytics",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Support",
  ];

  return (
    <div className="bg-white rounded-[28px] shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-10 py-6">Name</th>
              <th className="px-8 py-6">Department</th>
              <th className="px-8 py-6">Role</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-slate-100">
            {employees.map((employee, index) => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                className="transition-all duration-200"
              >

                {/* NAME */}
                <td className="px-10 py-7">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-md">
                      {employee.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {employee.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* DEPARTMENT - NOW EDITABLE */}
                <td className="px-8 py-7">
                  <select
                    value={employee.department || ""}
                    onChange={(e) =>
                      onDepartmentChange(employee.id, e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    <option value="">Unassigned</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </td>

                {/* ROLE */}
                <td className="px-8 py-7">
                  <select
                    value={employee.role}
                    onChange={(e) =>
                      onRoleChange(employee.id, e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </td>

                {/* STATUS */}
                <td className="px-8 py-7">
                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
                      employee.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-10 py-7">
                  <div className="flex justify-end gap-3">

                    {/* Suspend / Activate */}
                    <button
                      onClick={() => onToggleStatus(employee.id)}
                      className={`px-5 py-2.5 text-xs font-semibold rounded-xl shadow-sm transition-all duration-200 active:scale-95 ${
                        employee.status === "Active"
                          ? "bg-rose-500 text-white hover:bg-rose-600 hover:shadow-md"
                          : "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md"
                      }`}
                    >
                      {employee.status === "Active"
                        ? "Suspend"
                        : "Activate"}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDeleteEmployee(employee.id)}
                      className="px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </motion.tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;