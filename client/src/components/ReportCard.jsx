export default function ReportCard({ report, index, onSelect }) {
  const statusStyle = {
    PENDING: "bg-yellow-100 text-yellow-700",
    REVIEWING: "bg-blue-100 text-blue-700",
    RESOLVED: "bg-green-100 text-green-700",
  };

  const priorityStyle = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-blue-100 text-blue-700",
    LOW: "bg-gray-100 text-gray-700",
  };

  const categoryStyle = {
    HARASSMENT: "bg-purple-100 text-purple-700",
    ABUSE: "bg-red-100 text-red-700",
    SPAM: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">

      {/* TOP */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400 font-medium">
          RPT-{String(index + 1).padStart(3, "0")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(report);
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded-lg"
        >
          Review
        </button>
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityStyle[report.priority]}`}>
          {report.priority}
        </span>

        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[report.status]}`}>
          {report.status}
        </span>

        <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryStyle[report.category]}`}>
          {report.category}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="text-base font-semibold text-gray-800">
        {report.title}
      </h2>

      {/* META */}
      <p className="text-xs text-gray-500 mt-1">
        Reported by <span className="font-medium">{report.reporter}</span> • User{" "}
        <span className="font-medium">{report.reported_user}</span>
      </p>

      {/* CONTENT */}
      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
        {report.content}
      </p>
    </div>
  );
}