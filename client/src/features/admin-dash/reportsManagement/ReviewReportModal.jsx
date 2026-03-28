import {
  X,
  AlertTriangle,
  Trash2,
  UserX,
  ShieldAlert,
} from "lucide-react";

import {
  deleteReport,
  updateReportStatus,
} from "../../../services/reportService";

const ReviewReportModal = ({ report, onClose, refreshReports }) => {
  if (!report) return null;

  /*
  ACTIONS
  */
  const handleDelete = async () => {
    try {
      await deleteReport(report.id);
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleDismiss = async () => {
    try {
      await updateReportStatus(report.id, "RESOLVED");
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Dismiss failed", err);
    }
  };

  const handleWarn = async () => {
    try {
      await updateReportStatus(report.id, "REVIEWING");
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Warn failed", err);
    }
  };

  const handleEscalate = async () => {
    try {
      await updateReportStatus(report.id, "REVIEWING");
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Escalate failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[720px] max-h-[90vh] overflow-y-auto shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Report Details
            </h2>
            <p className="text-sm text-slate-500">
              {report.report_code || `RPT-${report.id}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* TAGS */}
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 text-sm font-medium">
              {report.status}
            </span>

            <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium">
              {report.priority} PRIORITY
            </span>
          </div>

          {/* REPORT INFO (FIXED) */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              Report Info
            </p>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">

              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {String(report.reported_by).charAt(0)}
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  User #{report.reported_by}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(report.created_at).toLocaleString()}
                </p>
              </div>

            </div>
          </div>

          {/* SHOUTOUT INFO */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              Related Shoutout
            </p>

            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-700">
                Shoutout ID: {report.shoutout_id}
              </p>
            </div>
          </div>

          {/* REASON */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              Reason
            </p>

            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="font-medium text-slate-900">
                {report.reason}
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {report.description}
              </p>
            </div>
          </div>

          {/* FLAGGED CONTENT */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              Reported Content
            </p>

            <div className="border border-red-200 bg-red-50 rounded-xl p-4">

              <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-2">
                <AlertTriangle size={16} />
                FLAGGED CONTENT
              </div>

              <p className="italic text-sm text-slate-700">
                "{report.description}"
              </p>

            </div>
          </div>

          <hr />

          {/* ACTION BUTTONS */}
          <div className="space-y-3">

            <p className="text-xs text-slate-500 uppercase">
              Take Action
            </p>

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700"
              >
                <Trash2 size={18} />
                Delete Post
              </button>

              <button
                onClick={handleDismiss}
                className="flex items-center justify-center gap-2 bg-slate-500 text-white py-3 rounded-xl font-medium hover:bg-slate-600"
              >
                <X size={18} />
                Dismiss Report
              </button>

              <button
                onClick={handleWarn}
                className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600"
              >
                <UserX size={18} />
                Warn User
              </button>

              <button
                onClick={handleEscalate}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90"
              >
                <ShieldAlert size={18} />
                Escalate
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewReportModal;