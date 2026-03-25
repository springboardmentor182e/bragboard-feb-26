import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatsCards from "../features/employeeManagement/components/StatsCards";
import SearchFilterBar from "../features/employeeManagement/components/SearchFilterBar";
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

  // Load employees when page loads
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load employees:", error);
      setEmployees([]);
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

        {/* Filters */}
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

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
  );
}

export default AdminEmployees;