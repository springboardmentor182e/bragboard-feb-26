import React from "react";
import { X, Trash2 } from "lucide-react";

const DeleteShoutoutModal = ({ isOpen, onClose, shoutout, onConfirmDelete }) => {
  if (!isOpen || !shoutout) return null;

  const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;

  const handleDelete = () => {
    onConfirmDelete(shoutout.id);
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`} onClick={onClose}>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 transition-colors" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Trash2 size={24} />
              <div>
                <h2 className="text-xl font-bold">Delete Shout-Out</h2>
                <p className="text-purple-100 text-xs">{shoutoutId}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 transition-colors">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-4 flex items-start gap-3 transition-colors">
              <Trash2 className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-red-800 dark:text-red-300 mb-1">Permanent Action</h3>
                <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed font-medium">
                  This shout-out will be permanently removed from the system. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Shout-out ID</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{shoutoutId}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Original Message</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic border-l-4 border-slate-200 dark:border-slate-700 pl-3 py-1">
                  "{shoutout.message}"
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-3 transition-colors">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleDelete}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition-all"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteShoutoutModal;
