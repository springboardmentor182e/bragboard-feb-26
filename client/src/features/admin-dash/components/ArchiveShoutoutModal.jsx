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
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 transition-colors" onClick={(e) => e.stopPropagation()}>
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
          <div className="px-6 py-6 transition-colors">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex items-start gap-3 transition-colors">
              <Archive className="text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Archive This Shout-Out</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  This shout-out will be moved to the archive. It will no longer appear in the active posts feed but will remain in your records for historical reference. This action can be reversed if needed.
                </p>
              </div>
            </div>

            {/* Shoutout Preview */}
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">Message Preview</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{shoutout.message}</p>
            </div>

            {/* Engagement Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-3 transition-colors">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">Reactions</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{shoutout.engagement?.reactions || 0}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-3 transition-colors">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">Comments</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{shoutout.engagement?.comments || 0}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-4 flex gap-3 transition-colors">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleArchive} 
              className="flex-1 px-4 py-2.5 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 shadow-lg shadow-slate-200 dark:shadow-none transition-all"
            >
              Archive
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveShoutoutModal;
