import React, { useState, useEffect } from "react";

const API = "http://localhost:8000";

export default function MyShoutouts() {
  const [shoutouts, setShoutouts] = useState([]);
  const [stats, setStats] = useState({ total_given: 0, total_received: 0, points_earned: 0 });
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    teammate: "", badge: "", campaign: "", message: "",
  });

  // load shoutouts + stats on mount
  useEffect(() => {
    fetch(`${API}/shoutouts`)
      .then((r) => r.json())
      .then(setShoutouts)
      .catch(() => setError("Could not load shoutouts — is the server running?"));

    fetch(`${API}/shoutouts/stats`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/shoutouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setShoutouts((prev) => [newItem, ...prev]);
      setStats((prev) => ({
        ...prev,
        total_given: prev.total_given + 1,
        points_earned: prev.points_earned + newItem.points,
      }));
      setForm({ teammate: "", badge: "", campaign: "", message: "" });
      setOpen(false);
    } catch {
      alert("Failed to save shoutout — check the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 flex justify-between items-center shadow">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Shout-Outs</h1>
            <p className="text-indigo-100">Celebrate great work and recognize teammates</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            + Create Shout-Out
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Given" value={stats.total_given} />
        <StatCard title="Total Received" value={stats.total_received} />
        <StatCard title="Points Earned" value={stats.points_earned} />
      </div>

      {/* ERROR */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* LIST */}
      <div className="max-w-4xl mx-auto space-y-6">
        {shoutouts.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-400">
            No shoutouts yet 🚀 — create your first one!
          </div>
        ) : (
          shoutouts.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {item.teammate?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.teammate}</p>
                  <p className="text-sm text-gray-400">{item.createdAt}</p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  {item.badge}
                </div>
              </div>

              {item.campaign && (
                <div className="inline-block mb-3 px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                  {item.campaign}
                </div>
              )}

              <p className="text-gray-700 leading-relaxed">{item.message}</p>

              <div className="flex gap-6 mt-5 text-sm text-gray-500 border-t pt-4">
                <Reaction emoji="👍" count={item.reactions.like} />
                <Reaction emoji="⭐" count={item.reactions.star} />
                <Reaction emoji="👏" count={item.reactions.clap} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">Create a Shout-Out</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                className="w-full border p-3 rounded-lg"
                placeholder="Who deserves recognition?"
                value={form.teammate}
                onChange={(e) => setForm({ ...form, teammate: e.target.value })}
              />

              <div>
                <p className="font-medium mb-2">Choose a recognition badge</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Team Player", "Innovation Star", "Customer Champion", "Data Wizard", "Problem Solver", "Above & Beyond"].map((badge) => (
                    <button
                      type="button"
                      key={badge}
                      onClick={() => setForm({ ...form, badge })}
                      className={`border rounded-lg p-3 text-left transition ${
                        form.badge === badge ? "border-indigo-600 bg-indigo-50" : "hover:border-gray-300"
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>

              <select
                className="w-full border p-3 rounded-lg"
                value={form.campaign}
                onChange={(e) => setForm({ ...form, campaign: e.target.value })}
              >
                <option value="">Link to campaign (optional)</option>
                <option>Q1 Recognition Rally</option>
                <option>Innovation Week</option>
              </select>

              <textarea
                required
                rows="4"
                className="w-full border p-3 rounded-lg"
                placeholder="Share why this person deserves recognition…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                  disabled={submitting || !form.badge}
                >
                  {submitting ? "Sending…" : "Send Shout-Out"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-indigo-600">{value}</h2>
    </div>
  );
}

function Reaction({ emoji, count }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50">
      <span>{emoji}</span>
      <span>{count}</span>
    </div>
  );
}