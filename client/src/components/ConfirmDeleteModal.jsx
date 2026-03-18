import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, employee, loading }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.iconWrap}>⚠️</div>
          <h2 style={styles.title}>Delete Employee</h2>
          <p style={styles.subtitle}>This action cannot be undone.</p>
        </div>

        {employee && (
          <div style={styles.empInfo}>
            <div style={styles.avatar}>{employee.name.charAt(0).toUpperCase()}</div>
            <div>
              <div style={styles.empName}>{employee.name}</div>
              <div style={styles.empEmail}>{employee.email}</div>
            </div>
          </div>
        )}

        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn} disabled={loading}>Cancel</button>
          <button onClick={onConfirm} style={styles.deleteBtn} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  modal: {
    background: "#ffffff", borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    width: "100%", maxWidth: "400px", margin: "16px", padding: "28px",
  },
  header: { textAlign: "center", marginBottom: "20px" },
  iconWrap: { fontSize: "36px", marginBottom: "12px" },
  title: { fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 6px 0" },
  subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
  empInfo: {
    display: "flex", alignItems: "center", gap: "12px",
    background: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: "8px", padding: "14px", marginBottom: "24px",
  },
  avatar: {
    width: "40px", height: "40px", borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#fff", display: "flex", alignItems: "center",
    justifyContent: "center", fontWeight: "600", fontSize: "16px", flexShrink: 0,
  },
  empName: { fontWeight: "600", color: "#111827", fontSize: "14px" },
  empEmail: { fontSize: "12px", color: "#9ca3af", marginTop: "2px" },
  footer: { display: "flex", gap: "10px", justifyContent: "flex-end" },
  cancelBtn: {
    padding: "10px 20px", background: "#f3f4f6", color: "#374151",
    border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px",
    fontWeight: "500", cursor: "pointer",
  },
  deleteBtn: {
    padding: "10px 20px", background: "#dc2626", color: "#ffffff",
    border: "none", borderRadius: "8px", fontSize: "14px",
    fontWeight: "500", cursor: "pointer",
  },
};

export default ConfirmDeleteModal;
