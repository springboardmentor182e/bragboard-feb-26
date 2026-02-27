import React, { useState, useEffect } from "react";

export default function MyShoutouts() {
  const [shoutouts, setShoutouts] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    teammate: "",
    badge: "",
    campaign: "",
    message: "",
  });

  /* ---------- LOAD / SAVE ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("my_shoutouts");
    if (saved) setShoutouts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("my_shoutouts", JSON.stringify(shoutouts));
  }, [shoutouts]);

  /* ---------- CREATE ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleString(),
      points: 100,
      reactions: {
        like: Math.floor(Math.random() * 5),
        star: Math.floor(Math.random() * 5),
        clap: Math.floor(Math.random() * 5),
      },
    };

    setShoutouts((prev) => [newItem, ...prev]);

    setForm({
      teammate: "",
      badge: "",
      campaign: "",
      message: "",
    });

    setOpen(false);
  };

  const totalPoints = shoutouts.reduce((sum, s) => sum + s.points, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 flex justify-between items-center shadow">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Shout-Outs</h1>
            <p className="text-indigo-100">
              Celebrate great work and recognize teammates
            </p>
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
        <StatCard title="Total Given" value={shoutouts.length} />
        <StatCard title="Total Received" value="0" />
        <StatCard title="Points Earned" value={totalPoints} />
      </div>

      {/* LIST */}
      <div className="max-w-4xl mx-auto space-y-6">
        {shoutouts.length === 0 ? (
          <EmptyState />
        ) : (
          shoutouts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
            >
              {/* TOP */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {item.teammate?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {item.teammate}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item.createdAt}
                  </p>
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

              <p className="text-gray-700 leading-relaxed">
                {item.message}
              </p>

              {/* REACTIONS (DISPLAY ONLY) */}
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">
              Create a Shout-Out
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                className="w-full border p-3 rounded-lg"
                placeholder="Who deserves recognition?"
                value={form.teammate}
                onChange={(e) =>
                  setForm({ ...form, teammate: e.target.value })
                }
              />

              <div>
                <p className="font-medium mb-2">
                  Choose a recognition badge
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Team Player",
                    "Innovation Star",
                    "Customer Champion",
                    "Data Wizard",
                    "Problem Solver",
                    "Above & Beyond",
                  ].map((badge) => (
                    <button
                      type="button"
                      key={badge}
                      onClick={() => setForm({ ...form, badge })}
                      className={`border rounded-lg p-3 text-left ${
                        form.badge === badge
                          ? "border-indigo-600 bg-indigo-50"
                          : ""
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
                onChange={(e) =>
                  setForm({ ...form, campaign: e.target.value })
                }
              >
                <option value="">Link to campaign (optional)</option>
                <option>Q1 Recognition Rally</option>
                <option>Innovation Week</option>
              </select>

              <textarea
                required
                rows="4"
                className="w-full border p-3 rounded-lg"
                placeholder="Share why this person deserves recognition..."
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                  Send Shout-Out
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-indigo-600">
        {value}
      </h2>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-400">
      No shoutouts yet 🚀
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