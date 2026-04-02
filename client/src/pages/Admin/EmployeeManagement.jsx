import React, { useState, useEffect } from "react";
import EmployeeTable from "../../components/EmployeeTable";
import EmployeeFormModal from "../../components/EmployeeFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../../api/employeeApi";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees(page, pageSize, departmentFilter || null, searchTerm || null);
      setEmployees(data.employees);
      setTotal(data.total);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }
      setError(err.response?.data?.detail || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, [page, departmentFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page === 1) fetchEmployees();
      else setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleFormSubmit = async (formData) => {
    setModalLoading(true);
    try {
      if (selectedEmployee) await updateEmployee(selectedEmployee.id, formData);
      else await createEmployee(formData);
      setIsFormModalOpen(false);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Operation failed");
    } finally {
      setModalLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    try {
      await deleteEmployee(selectedEmployee.id);
      setIsDeleteModalOpen(false);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to delete employee");
    } finally {
      setModalLoading(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>Employee Management</h1>
            <p style={styles.pageSubtitle}>Manage your organization's employees</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBanner}>
            ⚠️ {error}
          </div>
        )}

        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.controlsLeft}>
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={styles.select}
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <button
            onClick={() => { setSelectedEmployee(null); setIsFormModalOpen(true); }}
            style={styles.addBtn}
          >
            + Add Employee
          </button>
        </div>

        {/* Table */}
        <EmployeeTable
          employees={employees}
          onEdit={(emp) => { setSelectedEmployee(emp); setIsFormModalOpen(true); }}
          onDelete={(emp) => { setSelectedEmployee(emp); setIsDeleteModalOpen(true); }}
          loading={loading}
        />

        {/* Pagination */}
        {!loading && total > 0 && (
          <div style={styles.pagination}>
            <span style={styles.paginationInfo}>
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} employees
            </span>
            <div style={styles.paginationBtns}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                style={{ ...styles.pageBtn, ...(page === 1 ? styles.pageBtnDisabled : {}) }}
              >
                ← Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  style={{ ...styles.pageBtn, ...(page === i + 1 ? styles.pageBtnActive : {}) }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                style={{ ...styles.pageBtn, ...(page === totalPages ? styles.pageBtnDisabled : {}) }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        employee={selectedEmployee}
        loading={modalLoading}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employee={selectedEmployee}
        loading={modalLoading}
      />
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "32px 24px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 4px 0",
  },
  pageSubtitle: {
    fontSize: "13.5px",
    color: "#6b7280",
    margin: 0,
  },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    padding: "14px 18px",
    borderRadius: "8px",
    fontSize: "14px",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    background: "#ffffff",
    padding: "12px 16px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    flexWrap: "wrap",
  },
  controlsLeft: {
    display: "flex",
    gap: "12px",
    flex: 1,
    flexWrap: "wrap",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e5e7eb",
    borderRadius: "7px",
    padding: "0 12px",
    background: "#ffffff",
    flex: 1,
    minWidth: "200px",
  },
  searchIcon: { fontSize: "13px" },
  searchInput: {
    border: "none",
    background: "transparent",
    padding: "8px 0",
    fontSize: "13.5px",
    outline: "none",
    width: "100%",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "7px",
    fontSize: "13.5px",
    background: "#ffffff",
    color: "#374151",
    outline: "none",
    cursor: "pointer",
  },
  addBtn: {
    padding: "8px 18px",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    fontSize: "13.5px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    flexWrap: "wrap",
    gap: "12px",
  },
  paginationInfo: {
    fontSize: "14px",
    color: "#6b7280",
  },
  paginationBtns: {
    display: "flex",
    gap: "6px",
  },
  pageBtn: {
    padding: "8px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    background: "#ffffff",
    color: "#374151",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
  pageBtnActive: {
    background: "#2563eb",
    color: "#ffffff",
    border: "1px solid #2563eb",
  },
  pageBtnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

export default EmployeeManagement;
