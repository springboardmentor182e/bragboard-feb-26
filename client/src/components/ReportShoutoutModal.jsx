import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, X, Loader } from "lucide-react";
import { reportShoutout } from "../services/reportService";
import { REPORT_REASONS } from "../constants/reportReasons";
import useToast from "../features/employeeDashboard/hooks/useToast";

const ReportShoutoutModal = ({ isOpen, shoutoutId, onClose, onSuccess }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Trigger animation after a tick to allow CSS transitions
      setTimeout(() => setIsAnimating(true), 0);
    } else {
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!selectedReason) {
        showToast("Please select a reason for reporting", "error");
        return;
      }

      if (!description.trim()) {
        showToast("Please provide details about your report", "error");
        return;
      }

      if (description.trim().length < 15) {
        showToast("Report description must be at least 15 characters", "error");
        return;
      }

      try {
        setLoading(true);
        await reportShoutout(shoutoutId, selectedReason, description.trim(), priority);
        showToast(
          "Report submitted successfully. Thank you for helping keep our community safe.",
          "success"
        );

        // Reset form and close modal
        setSelectedReason("");
        setDescription("");
        setPriority("LOW");
        onClose();

        // Call success callback if provided
        if (onSuccess) onSuccess();
      } catch (error) {
        showToast(
          error?.response?.data?.detail || error.message || "Failed to submit report",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [shoutoutId, selectedReason, description, onClose, onSuccess, showToast]
  );

  const handleClose = useCallback(() => {
    if (!loading) {
      onClose();
    }
  }, [loading, onClose]);

  // Validation helpers
  const descriptionLength = description.trim().length;
  const isDescriptionValid = descriptionLength >= 15;
  const isFormValid = selectedReason && isDescriptionValid && !loading;

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black z-[99] transition-opacity duration-300 ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* MODAL */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-[100] p-4 transition-all duration-300 pointer-events-none ${
          isAnimating ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        role="dialog"
        aria-labelledby="report-modal-title"
        aria-modal="true"
      >
        <div
          className={`bg-white rounded-2xl max-w-md w-full shadow-2xl transition-transform duration-300 ${
            isAnimating ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
              <h2
                id="report-modal-title"
                className="text-xl font-bold text-slate-900"
              >
                Report Shoutout
              </h2>
            </div>
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-1 hover:bg-slate-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Close modal"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          {/* CONTENT */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* REASON DROPDOWN */}
            <div className="flex flex-col gap-2">
              <label htmlFor="reason" className="text-sm font-semibold text-slate-700">
                Reason for Reporting <span className="text-red-500">*</span>
              </label>
              <select
                id="reason"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
              >
                <option value="">-- Select a reason --</option>
                {REPORT_REASONS.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </div>

            {/* PRIORITY SELECTOR */}
            <div className="flex flex-col gap-2">
              <label htmlFor="priority" className="text-sm font-semibold text-slate-700">
                Priority Level
              </label>
              <div className="flex gap-2">
                {[
                  { value: "LOW", label: "Low", color: "text-green-600 bg-green-50 border-green-300" },
                  { value: "HIGH", label: "High", color: "text-orange-600 bg-orange-50 border-orange-300" },
                  { value: "CRITICAL", label: "Critical", color: "text-red-600 bg-red-50 border-red-300" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPriority(option.value)}
                    disabled={loading}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                      priority === option.value
                        ? `${option.color} border-current shadow-md`
                        : "border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                {priority === "LOW" && "Default: Low priority will be reviewed regularly"}
                {priority === "HIGH" && "⚠️ High priority: Serious violation requiring expedited review"}
                {priority === "CRITICAL" && "🚨 Critical: Severe violation requiring immediate action"}
              </p>
            </div>

            {/* DESCRIPTION TEXTAREA - REQUIRED */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                disabled={loading}
                placeholder="Explain why you're reporting this shoutout (minimum 15 characters)..."
                maxLength={500}
                rows={4}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors ${
                  descriptionLength > 0
                    ? isDescriptionValid
                      ? "border-green-300 focus:ring-green-500"
                      : "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-slate-500"
                }`}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-xs font-medium ${
                      descriptionLength === 0
                        ? "text-slate-500"
                        : isDescriptionValid
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {descriptionLength}/500 characters
                  </p>
                  {descriptionLength > 0 && !isDescriptionValid && (
                    <span className="text-xs text-red-600 font-medium">
                      (Need {15 - descriptionLength} more)
                    </span>
                  )}
                </div>
                {isDescriptionValid && (
                  <span className="text-xs text-green-600 font-medium">✓ Valid</span>
                )}
              </div>
            </div>

            {/* HELPER TEXT */}
            <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-blue-600 flex-shrink-0">ℹ️</span>
              <p className="text-xs text-blue-700">
                Provide genuine details about why you're reporting this. False reports may result in action against your account. Minimum 15 characters required.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                title={
                  !selectedReason
                    ? "Select a reason to continue"
                    : !isDescriptionValid
                      ? `Provide at least 15 characters (${15 - descriptionLength} more needed)`
                      : ""
                }
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default ReportShoutoutModal;
