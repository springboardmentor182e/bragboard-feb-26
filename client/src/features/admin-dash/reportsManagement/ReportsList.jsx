import { useState } from "react";
import {
  User,
  Flag,
  Calendar,
  MessageSquare,
  Eye,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import ReviewReportModal from "./ReviewReportModal";

const priorityStyle = {
  HIGH: "border-l-4 border-orange-500",
  CRITICAL: "border-l-4 border-red-500",
  LOW: "border-l-4 border-green-500",
};

const priorityBadge = {
  HIGH: "bg-orange-50 text-orange-600 border-orange-200",
  CRITICAL: "bg-red-50 text-red-600 border-red-200",
  LOW: "bg-green-50 text-green-600 border-green-200",
};

const statusBadge = {
  PENDING: "bg-yellow-50 text-yellow-600 border-yellow-200",
  REVIEWING: "bg-blue-50 text-blue-600 border-blue-200",
  RESOLVED: "bg-green-50 text-green-600 border-green-200",
};

const ReportsList = ({ reports, refreshReports }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <>
      <div className="space-y-6">

        {reports.map((report) => (

          <Card
            key={report.id}
            className={`${priorityStyle[report.priority]} hover:shadow-lg transition-all`}
          >

            <div className="flex justify-between items-start gap-6">

              {/* LEFT CONTENT */}
              <div className="flex-1 space-y-4">

                {/* HEADER TAGS */}
                <div className="flex items-center gap-3 flex-wrap">

                  <span className="font-semibold text-slate-700">
                    RPT-{report.report_id}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-lg border font-medium ${priorityBadge[report.priority]}`}
                  >
                    {report.priority}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-lg border font-medium ${statusBadge[report.status]}`}
                  >
                    {report.status}
                  </span>

                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-slate-900">
                  {report.reason}
                </h3>

                {/* META INFO */}
                <div className="flex items-center gap-6 text-sm text-slate-500 flex-wrap">

                  <div className="flex items-center gap-2">
                    <User size={16} />
                    Reported by: <span className="text-slate-700 font-medium">{report.reporter_name || 'Unknown'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Flag size={16} />
                    Posted by: <span className="text-slate-700 font-medium">{report.sender_name || 'Unknown'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(report.report_created_at).toLocaleString()}
                  </div>

                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-600">
                  {report.message}
                </p>

                {/* REPORTED CONTENT */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MessageSquare size={16} />
                    FLAGGED REASON
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{report.description}"
                  </p>

                </div>

              </div>

              {/* REVIEW BUTTON */}
              <div className="shrink-0">

                <PrimaryButton
                  onClick={() => setSelectedReport(report)}
                  className="flex items-center gap-2"
                >
                  <Eye size={16} />
                  Review
                </PrimaryButton>

              </div>

            </div>

          </Card>

        ))}

      </div>

      {/* MODAL */}
      {selectedReport && (
        <ReviewReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          refreshReports={refreshReports}
        />
      )}
    </>
  );
};

export default ReportsList;