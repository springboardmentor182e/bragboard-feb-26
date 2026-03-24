export default function ReportDetails({
  report,
  onClose,
  onDelete,
  onUpdateStatus,
}) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Report Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="bg-yellow-100 px-2 py-1 text-xs rounded">{report.status}</span>
          <span className="bg-red-100 px-2 py-1 text-xs rounded">{report.priority}</span>
        </div>

        <h3 className="font-semibold">{report.title}</h3>

        <p className="text-sm text-gray-500 mb-4">
          {report.reporter} → {report.reported_user}
        </p>

        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          {report.content}
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => onUpdateStatus(report.id, "REVIEWING")} className="bg-blue-500 text-white py-2 rounded-lg">
            Reviewing
          </button>

          <button onClick={() => onUpdateStatus(report.id, "RESOLVED")} className="bg-green-500 text-white py-2 rounded-lg">
            Resolve
          </button>

          <button onClick={() => onDelete(report.id)} className="bg-red-500 text-white py-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}