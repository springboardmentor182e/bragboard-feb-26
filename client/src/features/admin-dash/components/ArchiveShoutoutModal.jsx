import React from "react";
import { X, Archive } from "lucide-react";

const ArchiveShoutoutModal = ({ isOpen, onClose, shoutout, onConfirmArchive }) => {
  if (!isOpen || !shoutout) return null;

  const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;

  const handleArchive = () => {
    onConfirmArchive(shoutout.id);
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`} onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-500 via-slate-600 to-gray-700 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Archive size={24} />
              <div>
                <h2 className="text-xl font-bold">Archive Shout-Out</h2>
                <p className="text-slate-100 text-xs">{shoutoutId}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 flex items-start gap-3">
              <Archive className="text-slate-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Archive This Shout-Out</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  This shout-out will be moved to the archive. It will no longer appear in the active posts feed but will remain in your records for historical reference. This action can be reversed if needed.
                </p>
              </div>
            </div>

            {/* Shoutout Preview */}
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Message Preview</p>
              <p className="text-sm text-slate-700 line-clamp-3">{shoutout.message}</p>
            </div>

            {/* Engagement Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Reactions</p>
                <p className="text-lg font-bold text-blue-600">{shoutout.engagement?.reactions || 0}</p>
              </div>
              <div className="bg-purple-50 rounded-lg border border-purple-200 p-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Comments</p>
                <p className="text-lg font-bold text-purple-600">{shoutout.engagement?.comments || 0}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              Cancel
            </button>
            <button onClick={handleArchive} className="flex-1 px-4 py-2.5 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
              Archive
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveShoutoutModal;
