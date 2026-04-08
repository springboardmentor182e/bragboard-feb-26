import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../layout/AdminLayout";
import StatsCards from "../features/employeeManagement/components/StatsCards";
import EmployeeTable from "../features/employeeManagement/components/EmployeeTable";
import AddEmployeeModal from "../features/employeeManagement/components/AddEmployeeModal";
import PrimaryButton from "../components/ui/PrimaryButton";

import {
  fetchEmployees,
  toggleEmployeeStatus,
  updateEmployeeRole,
  deleteEmployee,
} from "../services/employeeService";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleEmployeeStatus(id);
      loadEmployees();
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await updateEmployeeRole(id, role);
      loadEmployees();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || emp.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || emp.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              User Management
            </h2>
            <p className="text-slate-500 mt-2">
              Manage employee roles, status and permissions
            </p>
          </div>
          <PrimaryButton onClick={() => setShowModal(true)}>
            + Add Employee
          </PrimaryButton>
        </div>

        {/* Stats */}
        <StatsCards employees={employees} />

        {/* Search - inline without component */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onToggleStatus={handleToggleStatus}
          onRoleChange={handleRoleChange}
          onDeleteEmployee={handleDeleteEmployee}
        />

        {/* Add Employee Modal */}
        {showModal && (
          <AddEmployeeModal
            setShowModal={setShowModal}
            reloadEmployees={loadEmployees}
          />
        )}
      </motion.div>
    </AdminLayout>
  );
}

export default AdminEmployees;