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

  // Extract report details
  const reporterName = report.reporter_name || 'Unknown';
  const senderName = report.sender_name || 'Unknown';
  const shoutoutMessage = report.message || 'No content';
  const recipients = report.recipients || [];
  const reportId = report.report_id;

  /*
  ACTIONS
  */
  const handleDelete = async () => {
    try {
      await deleteReport(reportId);
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleDismiss = async () => {
    try {
      await updateReportStatus(reportId, "RESOLVED");
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Dismiss failed", err);
    }
  };

  const handleWarn = async () => {
    try {
      await updateReportStatus(reportId, "REVIEWING");
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Warn failed", err);
    }
  };

  const handleEscalate = async () => {
    try {
      await updateReportStatus(reportId, "REVIEWING");
      await refreshReports();
      onClose();
    } catch (err) {
      console.error("Escalate failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-slate-900 rounded-2xl w-[720px] max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 dark:border-slate-800">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500 to-indigo-600">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Report Details
            </h2>
            <p className="text-sm text-indigo-100">
              RPT-{reportId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:bg-indigo-400 rounded-lg p-2 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* TAGS */}
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
              {report.status}
            </span>

            <span className="px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium">
              {report.priority} PRIORITY
            </span>
          </div>

          {/* REPORT INFO */}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-2">
              REPORT INFO
            </p>

            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {reporterName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {reporterName}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Reported on {new Date(report.report_created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* REPORTED POST DETAILS */}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-2">
              POSTED BY
            </p>
            <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {senderName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {senderName}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Posted on {new Date(report.shoutout_created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* RECIPIENTS */}
          {recipients.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-2">
                RECIPIENTS
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl space-y-2 border border-green-200 dark:border-green-800">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                      {recipient.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{recipient.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REASON */}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-2">
              REASON FOR REPORT
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-medium text-slate-900 dark:text-white">
                {report.reason}
              </p>
              {report.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {report.description}
                </p>
              )}
            </div>
          </div>

          {/* REPORTED CONTENT */}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-2">
              REPORTED CONTENT
            </p>
            <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-semibold mb-2">
                <AlertTriangle size={16} />
                FLAGGED CONTENT
              </div>
              <p className="italic text-sm text-slate-700 dark:text-slate-300">
                &quot;{shoutoutMessage}&quot;
              </p>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* ACTION BUTTONS */}
          <div className="space-y-3">

            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
              Take Action
            </p>

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 bg-red-600 dark:bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 dark:hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
                Delete Post
              </button>

              <button
                onClick={handleDismiss}
                className="flex items-center justify-center gap-2 bg-slate-600 dark:bg-slate-700 text-white py-3 rounded-xl font-medium hover:bg-slate-700 dark:hover:bg-slate-800 transition"
              >
                <X size={18} />
                Dismiss Report
              </button>

              <button
                onClick={handleWarn}
                className="flex items-center justify-center gap-2 bg-orange-500 dark:bg-orange-600 text-white py-3 rounded-xl font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition"
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