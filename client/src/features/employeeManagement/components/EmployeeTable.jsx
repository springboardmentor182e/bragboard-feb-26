import { motion } from "framer-motion";

function EmployeeTable({ employees, setEmployees }) {

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: emp.status === "Active" ? "Suspended" : "Active",
            }
          : emp
      )
    );
  };

  const changeRole = (id, newRole) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, role: newRole } : emp
      )
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {employees.map((employee, index) => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-slate-50 transition-all duration-200"
              >
                {/* NAME WITH AVATAR */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold shadow-md">
                      {employee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {employee.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* DEPARTMENT */}
                <td className="px-6 py-5 text-slate-600 font-medium">
                  {employee.department}
                </td>

                {/* ROLE DROPDOWN */}
                <td className="px-6 py-5">
                  <select
                    value={employee.role}
                    onChange={(e) =>
                      changeRole(employee.id, e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Employee</option>
                  </select>
                </td>

                {/* STATUS BADGE */}
                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-1 text-sm font-medium rounded-full ${
                      employee.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>

                {/* ACTION BUTTON */}
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => toggleStatus(employee.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl shadow-md transition-all duration-300 ${
                      employee.status === "Active"
                        ? "bg-rose-500 text-white hover:bg-rose-600 hover:scale-105"
                        : "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105"
                    }`}
                  >
                    {employee.status === "Active"
                      ? "Suspend"
                      : "Activate"}
                  </button>
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