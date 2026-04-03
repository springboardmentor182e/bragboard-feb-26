import React, { useState, useEffect } from "react";
import { X, Edit2 } from "lucide-react";

const EditShoutoutModal = ({ isOpen, onClose, shoutout, onConfirmEdit }) => {
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (shoutout) {
      setMessage(shoutout.message || "");
    }
  }, [shoutout, isOpen]);

  if (!isOpen || !shoutout) return null;

  const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;

  const handleSave = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty");
      return;
    }
    setIsSaving(true);
    await onConfirmEdit(shoutout.id, { message });
    setIsSaving(false);
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`} onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
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
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {/* Info Box */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Edit functionality would be implemented here with a form similar to the Create Shout-Out modal, allowing admins to modify the message, recipients, and badge selection.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              Cancel
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditShoutoutModal;
