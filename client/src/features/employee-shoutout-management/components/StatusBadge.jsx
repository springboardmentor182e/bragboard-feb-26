const StatusBadge = ({ status }) => {
  const styles =
    status === "Pinned"
      ? "bg-blue-100 text-blue-600"
      : "bg-green-100 text-green-600";

  return (
    <span className={`px-4 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
};

export default StatusBadge;