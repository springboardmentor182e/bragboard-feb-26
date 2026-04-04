import React, { useState, useEffect } from "react";
import { X, Edit2, AlertCircle } from "lucide-react";

const EditShoutoutModal = ({ isOpen, onClose, shoutout, onConfirmEdit }) => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (shoutout) {
      setMessage(shoutout.message || "");
      setCategory(shoutout.category || "");
      setError("");
    }
  }, [shoutout, isOpen]);

  if (!isOpen || !shoutout) return null;

  const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;
  const senderInitials = (shoutout.sender_name || "?").substring(0, 2).toUpperCase();

  const categoryOptions = [
    "General",
    "Recognition",
    "Achievement",
    "Milestone",
    "Teamwork",
    "Innovation",
    "Leadership",
    "Customer Service",
    "Quality",
    "Other"
  ];

  const handleSave = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }
    if (message.trim().length < 5) {
      setError("Message must be at least 5 characters long");
      return;
    }
    
    setError("");
    setIsSaving(true);
    try {
      await onConfirmEdit(shoutout.id, { message: message.trim(), category });
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = message !== (shoutout.message || "") || category !== (shoutout.category || "");

  return (
    <>
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`} onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Edit2 size={24} />
              <div>
                <h2 className="text-2xl font-bold">Edit Shout-Out</h2>
                <p className="text-blue-100 text-sm">{shoutoutId}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            
            {/* Sender Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 p-4">
              <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">Sender</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{senderInitials}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{shoutout.sender_name}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{shoutout.sender_department}</p>
                </div>
                <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">{shoutout.sender_department}</span>
              </div>
            </div>

            {/* Recipients (if any) */}
            {shoutout.recipients && shoutout.recipients.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 p-4">
                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">Recipients ({shoutout.recipients.length})</h3>
                <div className="space-y-2">
                  {shoutout.recipients.map((recipient, i) => {
                    const recInitials = (recipient.name || "?").substring(0, 1).toUpperCase();
                    return (
                      <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-700 rounded-lg p-3 border border-green-100 dark:border-green-700">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{recInitials}</div>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{recipient.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700 p-4 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Message Field */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter shout-out message..."
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                rows={5}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{message.length} characters</p>
            </div>

            {/* Category Field */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              >
                <option value="">-- Select Category --</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Original Metadata */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 p-4 text-xs">
              <p className="text-slate-600 dark:text-slate-400"><span className="font-semibold">Created:</span> {new Date(shoutout.created_at).toLocaleString()}</p>
              {shoutout.edited_at && (
                <p className="text-slate-600 dark:text-slate-400 mt-1"><span className="font-semibold">Last Edited:</span> {new Date(shoutout.edited_at).toLocaleString()}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-6 py-4 flex gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-600"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              disabled={!hasChanges || isSaving} 
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditShoutoutModal;
