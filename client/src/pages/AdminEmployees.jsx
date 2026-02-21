import { useState } from "react";
import { motion } from "framer-motion";
import StatsCards from "../features/employeeManagement/components/StatsCards";
import SearchFilterBar from "../features/employeeManagement/components/SearchFilterBar";
import EmployeeTable from "../features/employeeManagement/components/EmployeeTable";
import AddEmployeeModal from "../features/employeeManagement/components/AddEmployeeModal";
import { employees as initialEmployees } from "../features/employeeManagement/mockData";

function AdminEmployees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || emp.role === roleFilter;

    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Employee Management
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage roles, permissions and account status
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="relative bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-300"
          >
            + Add Employee
          </button>
        </motion.div>

        <StatsCards employees={employees} />

        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <EmployeeTable
          employees={currentEmployees}
          setEmployees={setEmployees}
        />

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white border"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {showModal && (
          <AddEmployeeModal
            setShowModal={setShowModal}
            employees={employees}
            setEmployees={setEmployees}
          />
        )}
      </div>
    </div>
  );
}

export default AdminEmployees;
