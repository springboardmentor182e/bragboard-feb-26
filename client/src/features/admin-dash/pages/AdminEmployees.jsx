import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ✅ CORRECT IMPORTS (NO AdminLayout) */
import StatsCards from "../employeeManagement/components/StatsCards";
import SearchFilterBar from "../employeeManagement/components/SearchFilterBar";
import EmployeeTable from "../employeeManagement/components/EmployeeTable";
import AddEmployeeModal from "../employeeManagement/components/AddEmployeeModal";

import PrimaryButton from "../../../components/ui/PrimaryButton";

/* SERVICES */
import {
  fetchEmployees,
  toggleEmployeeStatus,
  updateEmployeeRole,
  deleteEmployee,
} from "../../../services/employeeService";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to load employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleEmployeeStatus(id);
      loadEmployees();
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await updateEmployeeRole(id, role);
      loadEmployees();
    } catch (error) {
      console.error("Role update error:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error("Delete error:", error);
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

      {/* HEADER */}
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

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-slate-500">
          Loading employees...
        </div>
      ) : (
        <>
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
            employees={filteredEmployees}
            onToggleStatus={handleToggleStatus}
            onRoleChange={handleRoleChange}
            onDeleteEmployee={handleDeleteEmployee}
          />
        </>
      )}

      {/* MODAL */}
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