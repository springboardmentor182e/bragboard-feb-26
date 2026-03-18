import { useState } from "react";

// Helper: resolve employee id to name
const getEmployeeName = (employees, id) =>
  employees.find((e) => e.id === id)?.name ?? "Unknown";

// Helper: get initials from name
const getInitials = (name = "?") => name.charAt(0).toUpperCase();

// Helper: format date
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};

const ShoutoutFeed = ({ shoutouts, employees = [], onReact, onComment }) => {
  const [commentText, setCommentText] = useState({});
  const [userReactions, setUserReactions] = useState({});

  const handleReact = (shoutoutId, reaction) => {
    if (userReactions[shoutoutId] === reaction) return;
    setUserReactions((prev) => ({ ...prev, [shoutoutId]: reaction }));
    onReact?.(shoutoutId, reaction);
  };

  const handleComment = (id) => {
    const text = commentText[id]?.trim();
    if (!text) return;
    onComment?.(id, text);
    setCommentText((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Shoutout Feed
      </h2>

      {/* Empty State */}
      {shoutouts.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-slate-500">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-sm">No shoutouts yet. Be the first to give one!</p>
        </div>
      )}

      <div className="space-y-4">
        {shoutouts.map((item) => {
          const senderName    = getEmployeeName(employees, item.sender_id);
          const recipientName = getEmployeeName(employees, item.recipient_id);
          const userReaction  = userReactions[item.id];

          return (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                  {getInitials(senderName)}
                </div>
                <div>
                  <p className="font-semibold text-indigo-500 dark:text-indigo-400">
                    {senderName} → {recipientName}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-400">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 dark:text-slate-200 mt-3 leading-relaxed">
                {item.message}
              </p>

              {/* Reactions */}
              <div className="flex gap-6 mt-4 text-sm text-gray-400 dark:text-slate-400 border-t border-gray-200 dark:border-slate-700 pt-3">
                {[
                  { key: "likes", emoji: "👍" },
                  { key: "claps", emoji: "👏" },
                  { key: "stars", emoji: "⭐" },
                ].map(({ key, emoji }) => (
                  <button
                    key={key}
                    onClick={() => handleReact(item.id, key)}
                    disabled={userReaction === key}
                    className={`transition hover:text-gray-800 dark:hover:text-white ${
                      userReaction === key
                        ? "text-indigo-500 dark:text-indigo-400 font-semibold"
                        : ""
                    }`}
                  >
                    {emoji} {item[key]}
                  </button>
                ))}
              </div>

              {/* Comments — each comment is a full object with id and text */}
              <div className="mt-4 space-y-1">
                {item.comments?.map((c) => (
                  <p key={c.id} className="text-sm text-gray-500 dark:text-slate-400">
                    💬 {c.text}
                  </p>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[item.id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                  className="flex-1 p-2 rounded-lg text-sm bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => handleComment(item.id)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition"
                >
                  Post
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoutoutFeed;