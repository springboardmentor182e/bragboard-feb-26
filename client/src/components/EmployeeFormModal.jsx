import React, { useState, useEffect } from "react";

const EmployeeFormModal = ({ isOpen, onClose, onSubmit, employee, loading }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", department: "", role: "employee"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({ name: employee.name || "", email: employee.email || "", password: "", department: employee.department || "", role: employee.role || "employee" });
    } else {
      setFormData({ name: "", email: "", password: "", department: "", role: "employee" });
    }
    setErrors({});
  }, [employee, isOpen]);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    if (!employee && !formData.password) e.password = "Password is required";
    if (!employee && formData.password && formData.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = { ...formData };
      if (employee && !data.password) delete data.password;
      onSubmit(data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{employee ? "Edit Employee" : "Add New Employee"}</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { label: "Name *", name: "name", type: "text", placeholder: "John Doe" },
            { label: "Email *", name: "email", type: "email", placeholder: "john@company.com" },
            { label: `Password ${!employee ? "*" : "(optional)"}`, name: "password", type: "password", placeholder: employee ? "Leave blank to keep current" : "Min 6 characters" },
            { label: "Department", name: "department", type: "text", placeholder: "Engineering" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} style={styles.field}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                style={{ ...styles.input, ...(errors[name] ? styles.inputError : {}) }}
              />
              {errors[name] && <span style={styles.errorText}>{errors[name]}</span>}
            </div>
          ))}

          <div style={styles.field}>
            <label style={styles.label}>Role *</label>
            <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={styles.modalFooter}>
            <button type="button" onClick={onClose} style={styles.cancelBtn} disabled={loading}>Cancel</button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Saving..." : employee ? "Update" : "Create"}
            </button>
          </div>
        </form>
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
    width: "100%", maxWidth: "460px", margin: "16px",
  },
  modalHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 24px", borderBottom: "1px solid #e5e7eb",
  },
  modalTitle: { fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0 },
  closeBtn: {
    background: "none", border: "none", fontSize: "18px",
    color: "#9ca3af", cursor: "pointer", padding: "4px",
  },
  form: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "500", color: "#374151" },
  input: {
    padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box",
  },
  inputError: { borderColor: "#ef4444" },
  errorText: { fontSize: "12px", color: "#ef4444" },
  modalFooter: {
    display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px",
  },
  cancelBtn: {
    padding: "10px 20px", background: "#f3f4f6", color: "#374151",
    border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px",
    fontWeight: "500", cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 20px", background: "#2563eb", color: "#ffffff",
    border: "none", borderRadius: "8px", fontSize: "14px",
    fontWeight: "500", cursor: "pointer",
  },
};

export default EmployeeFormModal;
