const StatusBadge = ({ status }) => {
  const styles =
    status === "active"
      ? "bg-green-100 text-green-600"
      : status === "resolved"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${styles}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;