import { useState } from "react";

const badges = [
  { title: "Team Player", desc: "Exceptional collaboration", icon: "🤝" },
  { title: "Innovation Star", desc: "Creative problem solving", icon: "⭐" },
  { title: "Customer Champion", desc: "Outstanding service", icon: "💪" },
  { title: "Data Wizard", desc: "Insights & analytics", icon: "📊" },
  { title: "Problem Solver", desc: "Quick thinking", icon: "🧩" },
  { title: "Going Above & Beyond", desc: "Extra mile effort", icon: "🚀" },
];

const CreateShoutout = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [form, setForm] = useState({
    to: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...form,
      badge: selectedBadge,
    });

    alert("Shoutout created (frontend)");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Create Shout-Out 🎉
        </h1>
        <p className="text-slate-500 mt-1">
          Recognize your teammates for their amazing work
        </p>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6"
      >

        {/* EMPLOYEE */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Who deserves recognition?
          </label>

          <input
            type="text"
            placeholder="Search teammate..."
            value={form.to}
            onChange={(e) =>
              setForm({ ...form, to: e.target.value })
            }
            className="w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* BADGES */}
        <div>
          <label className="text-sm font-medium text-slate-700">
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
                    <p className="font-medium text-slate-900">
                      {b.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Your message
          </label>

          <textarea
            rows={4}
            placeholder="Write why this person deserves recognition..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white py-3 rounded-xl font-semibold
            hover:scale-[1.02]
            transition-all duration-300
            shadow-md hover:shadow-lg
          "
        >
          Send Shout-Out 🚀
        </button>

      </form>
    </div>
  );
};

export default CreateShoutout;