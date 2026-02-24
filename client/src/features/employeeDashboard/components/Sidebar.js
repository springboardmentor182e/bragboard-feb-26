const Sidebar = () => {
  return (
    <div
      style={{
        width: "240px",
        background: "#111827",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>BragBoard</h2>

      <div style={{ color: "#8B5CF6", fontWeight: "600" }}>Dashboard</div>
      <div style={{ opacity: 0.8 }}>Recognitions</div>
      <div style={{ opacity: 0.8 }}>Badges</div>
      <div style={{ opacity: 0.8 }}>Profile</div>
      <div style={{ opacity: 0.8 }}>Settings</div>
    </div>
  );
};

export default Sidebar;