import { X } from "lucide-react";
import { useState } from "react";

const badges = [
  { title: "Team Player", desc: "Exceptional collaboration", icon: "🤝" },
  { title: "Innovation Star", desc: "Creative problem solving", icon: "⭐" },
  { title: "Customer Champion", desc: "Outstanding service", icon: "💪" },
  { title: "Data Wizard", desc: "Insights & analytics", icon: "📊" },
  { title: "Problem Solver", desc: "Quick thinking", icon: "🧩" },
  { title: "Going Above & Beyond", desc: "Extra mile effort", icon: "🚀" },
];

const CreateShoutoutModal = ({ isOpen, onClose }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create a Shout-Out</h2>
            <p className="text-sm text-slate-500">
              Recognize your teammates for their great work
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* SEARCH USER */}
          <div>
            <label className="text-sm font-medium">
              Who deserves recognition?
            </label>

            <input
              type="text"
              placeholder="Search teammates..."
              className="w-full mt-2 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* BADGES */}
          <div>
            <label className="text-sm font-medium">
              Choose a recognition badge
            </label>

            <div className="grid grid-cols-2 gap-4 mt-3">

              {badges.map((b, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedBadge(b.title)}
                  className={`
                    p-4 rounded-xl border cursor-pointer transition
                    ${
                      selectedBadge === b.title
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="text-xs text-slate-500">{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm font-medium">
              Your message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write your appreciation..."
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
              Send Shout-Out
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CreateShoutoutModal;