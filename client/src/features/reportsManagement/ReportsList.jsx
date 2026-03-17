import { useState } from "react";
import {
  User,
  Flag,
  Calendar,
  MessageSquare,
  Eye,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PrimaryButton from "../../components/ui/PrimaryButton";
import ReviewReportModal from "./ReviewReportModal";

const reports = [
  {
    id: "RPT-001",
    priority: "HIGH",
    status: "PENDING",
    type: "INAPPROPRIATE",
    title: "Inappropriate language in message",
    reportedBy: "Sarah Chen",
    user: "John Smith",
    time: "2 hours ago",
    description:
      "The shout-out contains language that could be considered unprofessional and potentially offensive to some team members.",
    content:
      "Great job on the project, but honestly the way you handled the client meeting was pretty terrible. You need to work on your communication skills.",
    badge: "Team Player",
  },
  {
    id: "RPT-002",
    priority: "CRITICAL",
    status: "REVIEWING",
    type: "HARASSMENT",
    title: "Possible harassment",
    reportedBy: "Michael Rodriguez",
    user: "Emily Watson",
    time: "5 hours ago",
    description:
      "This appears to be targeted and unwanted recognition that makes the recipient uncomfortable.",
    content:
      "Emily, you looked amazing in that presentation today! Love working with you every single day. Can't wait for our next meeting! 😍",
    badge: "Innovation Star",
  },
  {
    id: "RPT-004",
    priority: "LOW",
    status: "RESOLVED",
    type: "MISINFORMATION",
    title: "Factual inaccuracy",
    reportedBy: "Jessica Park",
    user: "Tom Wilson",
    time: "3 days ago",
    description:
      "The claims made in this post are not accurate and could mislead others.",
    content:
      "Tom single-handedly completed the entire Q4 roadmap ahead of schedule!",
    badge: "Going Above & Beyond",
  },
];

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

const typeBadge = {
  INAPPROPRIATE: "bg-red-50 text-red-600 border-red-200",
  HARASSMENT: "bg-purple-50 text-purple-600 border-purple-200",
  MISINFORMATION: "bg-blue-50 text-blue-600 border-blue-200",
};

const ReportsList = () => {
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
                    {report.id}
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

                  <span
                    className={`text-xs px-3 py-1 rounded-lg border font-medium ${typeBadge[report.type]}`}
                  >
                    {report.type}
                  </span>

                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-slate-900">
                  {report.title}
                </h3>

                {/* META INFO */}
                <div className="flex items-center gap-6 text-sm text-slate-500 flex-wrap">

                  <div className="flex items-center gap-2">
                    <User size={16} />
                    Reported by: {report.reportedBy}
                  </div>

                  <div className="flex items-center gap-2">
                    <Flag size={16} />
                    User: {report.user}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {report.time}
                  </div>

                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-600">
                  {report.description}
                </p>

                {/* REPORTED CONTENT */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MessageSquare size={16} />
                    REPORTED CONTENT
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{report.content}"
                  </p>

                  <div className="mt-3 inline-block text-xs px-3 py-1 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg">
                    {report.badge}
                  </div>

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

      {selectedReport && (
        <ReviewReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

export default ReportsList;