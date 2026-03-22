function Badge({ type, children }) {
  const styles = {
    admin:
      "bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200",
    manager:
      "bg-amber-100 text-amber-600 ring-1 ring-amber-200",
    employee:
      "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
    active:
      "bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200",
    suspended:
      "bg-rose-100 text-rose-600 ring-1 ring-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
}

export default Badge;