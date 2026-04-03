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
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
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
          <div className="px-6 py-6">
            <div className="bg-red-50 rounded-lg border border-red-200 p-4 flex items-start gap-3">
              <Trash2 className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-red-900 mb-1">Confirm Deletion</h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  Are you sure you want to permanently delete this shout-out? This action cannot be undone and will remove all associated reactions and comments.
                </p>
              </div>
            </div>

            {/* Shoutout Preview */}
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Message</p>
              <p className="text-sm text-slate-700 line-clamp-2">{shoutout.message}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              Cancel
            </button>
            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteShoutoutModal;
