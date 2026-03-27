import React from "react";

function EmployeeCard({ title, value, icon, color = "#3b82f6" }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        minWidth: "220px"
      }}
    >
      <div>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          {title}
        </p>

        <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
          {value}
        </h2>
      </div>

      <div
        style={{
          background: color,
          color: "white",
          width: "50px",
          height: "50px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "25px"
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default EmployeeCard;