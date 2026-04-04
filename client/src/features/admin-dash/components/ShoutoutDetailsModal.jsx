import React from "react";
import { X, Archive, Trash2 } from "lucide-react";

const ShoutoutDetailsModal = ({ isOpen, onClose, shoutout, onArchive, onDelete }) => {
  if (!isOpen || !shoutout) return null;
  const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;
  const senderInitials = (shoutout.sender_name || "?").substring(0, 2).toUpperCase();
  const reactions = shoutout.reactions || [];
  const comments = shoutout.comments || [];
  const recipients = shoutout.recipients || [];

  return (
    <>
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`} onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 px-6 py-6 flex items-start justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Shout-Out Details</h2>
              <p className="text-purple-100 text-sm mt-1">{shoutoutId}</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">Sender</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{senderInitials}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{shoutout.sender_name}</p>
                  <p className="text-xs text-slate-600">{shoutout.sender_department}</p>
                </div>
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">{shoutout.sender_department}</span>
              </div>
            </div>

            {recipients.length > 0 && (
              <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">Recipients ({recipients.length})</h3>
                <div className="space-y-2">
                  {recipients.map((recipient, i) => {
                    const recInitials = (recipient.name || "?").substring(0, 1).toUpperCase();
                    return (
                      <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-green-100">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{recInitials}</div>
                        <span className="text-sm font-medium text-slate-900">{recipient.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">Full Message</h3>
              <p className="text-sm text-slate-800 leading-relaxed mb-3">{shoutout.message}</p>
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">{shoutout.category || "General"}</span>
                {shoutout.is_edited && (
                  <span title={shoutout.edited_at ? `Edited on ${new Date(shoutout.edited_at).toLocaleString()}` : "Edited"} className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                    ✏️ Edited
                  </span>
                )}
              </div>
            </div>

            {shoutout.campaign && (
              <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">Campaign</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <p className="text-sm font-semibold text-slate-900">{shoutout.campaign}</p>
                </div>
              </div>
            )}

            {reactions.length > 0 && (
              <div className="bg-red-50 rounded-lg border border-red-200 p-4">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">All Reactions ({reactions.length})</h3>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                  {reactions.map((reaction, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-red-100">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-red-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{(reaction.user_name || "?").substring(0, 1).toUpperCase()}</div>
                        <span className="text-sm font-medium text-slate-900 truncate">{reaction.user_name}</span>
                      </div>
                      <span className="text-lg ml-2 flex-shrink-0">{reaction.reaction_emoji || "👍"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {comments.length > 0 && (
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">All Comments ({comments.length})</h3>
                <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                  {comments.map((comment, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-blue-100">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{(comment.user_name || "?").substring(0, 1).toUpperCase()}</div>
                          <span className="text-sm font-semibold text-slate-900">{comment.user_name}</span>
                        </div>
                        <span className="text-xs text-slate-500 ml-2 flex-shrink-0">{comment.created_at ? new Date(comment.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "now"}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Post ID</p>
                <p className="text-sm font-semibold text-slate-900">{shoutoutId}</p>
              </div>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Department</p>
                <p className="text-sm font-semibold text-slate-900">{shoutout.sender_department}</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg border border-green-200 p-4">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Status</h3>
              <span className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-lg ${shoutout.status === "APPROVED" ? "bg-green-100 text-green-700" : shoutout.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>
                {shoutout.status === "APPROVED" ? "Active" : shoutout.status === "PENDING" ? "Pending" : "Archived"}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex gap-3">
            <button onClick={onArchive} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
              <Archive size={18} />
              Archive
            </button>
            <button onClick={onDelete} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoutoutDetailsModal;
