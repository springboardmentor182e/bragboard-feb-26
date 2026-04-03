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

      <div className="bg-white rounded-2xl w-[720px] max-h-[90vh] overflow-y-auto shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Report Details
            </h2>
            <p className="text-sm text-slate-500">
              RPT-{reportId}
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

          {/* REPORT INFO */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              REPORT INFO
            </p>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {reporterName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {reporterName}
                </p>
                <p className="text-sm text-slate-500">
                  Reported on {new Date(report.report_created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* REPORTED POST DETAILS */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              POSTED BY
            </p>
            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {senderName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {senderName}
                </p>
                <p className="text-sm text-slate-500">
                  Posted on {new Date(report.shoutout_created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* RECIPIENTS */}
          {recipients.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 uppercase mb-2">
                RECIPIENTS
              </p>
              <div className="bg-green-50 p-4 rounded-xl space-y-2">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                      {recipient.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-slate-700 font-medium">{recipient.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REASON */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              REASON FOR REPORT
            </p>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="font-medium text-slate-900">
                {report.reason}
              </p>
              {report.description && (
                <p className="text-sm text-slate-600 mt-2">
                  {report.description}
                </p>
              )}
            </div>
          </div>

          {/* REPORTED CONTENT */}
          <div>
            <p className="text-xs text-slate-500 uppercase mb-2">
              REPORTED CONTENT
            </p>
            <div className="border border-red-200 bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-2">
                <AlertTriangle size={16} />
                FLAGGED CONTENT
              </div>
              <p className="italic text-sm text-slate-700">
                &quot;{shoutoutMessage}&quot;
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