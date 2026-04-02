import React from "react";

const EmployeeTable = ({ employees, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p style={{ color: "#6b7280", marginTop: "12px" }}>Loading employees...</p>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>No employees found</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Date Joined</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp.id}
              style={styles.tr}
              onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
              onMouseLeave={e => e.currentTarget.style.background = ""}
            >
              <td style={styles.td}>
                <div style={styles.empCell}>
                  <div style={styles.avatar}>
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={styles.empName}>{emp.name}</div>
                    <div style={styles.empEmail}>{emp.email}</div>
                  </div>
                </div>
              </td>
              <td style={styles.td}>
                <span style={emp.role === "admin" ? styles.badgeAdmin : styles.badgeEmployee}>
                  {emp.role}
                </span>
              </td>
              <td style={styles.td}>
                <span style={styles.dept}>{emp.department || "N/A"}</span>
              </td>
              <td style={styles.td}>
                <span style={styles.date}>
                  {new Date(emp.joined_at).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric"
                  })}
                </span>
              </td>
              <td style={styles.td}>
                <div style={styles.actions}>
                  <button onClick={() => onEdit(emp)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => onDelete(emp)} style={styles.deleteBtn}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableWrapper: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    background: "#f9fafb",
  },
  th: {
    padding: "11px 20px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "500",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #f3f4f6",
  },
  tr: {
    borderBottom: "1px solid #f9fafb",
    transition: "background 0.12s",
  },
  td: {
    padding: "14px 20px",
    fontSize: "13.5px",
    color: "#374151",
    verticalAlign: "middle",
  },
  empCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "15px",
    flexShrink: 0,
  },
  empName: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "14px",
  },
  empEmail: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "2px",
  },
  badgeAdmin: {
    padding: "2px 8px",
    background: "#f3f0ff",
    color: "#7c3aed",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "500",
  },
  badgeEmployee: {
    padding: "2px 8px",
    background: "#f0fdf4",
    color: "#16a34a",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "500",
  },
  dept: {
    fontSize: "14px",
    color: "#374151",
  },
  date: {
    fontSize: "13px",
    color: "#6b7280",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    padding: "0",
    background: "none",
    color: "#2563eb",
    border: "none",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "0",
    background: "none",
    color: "#dc2626",
    border: "none",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #e5e7eb",
    borderTop: "3px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  empty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
};

export default EmployeeTable;
