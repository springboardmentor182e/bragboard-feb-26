function AdminEditBadge({ editedAt, className = "" }) {
  if (!editedAt) return null;

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "recently";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch {
      return "recently";
    }
  };

  const timeAgo = formatRelativeTime(editedAt);

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-purple-100 text-purple-700 ring-1 ring-purple-200 ${className}`}
      title={`Edited by admin on ${new Date(editedAt).toLocaleString()}`}
    >
      ✏️ Edited by admin • {timeAgo}
    </span>
  );
}

export default AdminEditBadge;
