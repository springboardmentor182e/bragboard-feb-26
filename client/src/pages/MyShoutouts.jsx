import { useState } from "react";

const BADGES = [
  { name: "Team Player", color: "bg-blue-200 text-blue-800" },
  { name: "Innovator", color: "bg-green-200 text-green-800" },
  { name: "Leadership", color: "bg-yellow-200 text-yellow-800" },
  { name: "MVP", color: "bg-indigo-200 text-indigo-800" },
];

export default function MyShoutouts() {
  const [shoutouts, setShoutouts] = useState([]);
  const [badge, setBadge] = useState(BADGES[0].name);
  const [message, setMessage] = useState("");
  const [campaign, setCampaign] = useState("Team Excellence");
  const [tab, setTab] = useState("given");
  const [filterCampaign, setFilterCampaign] = useState("All Campaigns");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newShoutout = {
      id: Date.now(),
      badge,
      badgeColor: BADGES.find((b) => b.name === badge).color,
      message,
      campaign,
      type: "given",
      points: 100,
      createdAt: new Date().toLocaleString(),
      reactions: {
        likes: Math.floor(Math.random() * 10),
        stars: Math.floor(Math.random() * 5),
        claps: Math.floor(Math.random() * 8),
      },
    };

    setShoutouts((prev) => [newShoutout, ...prev]);

    setBadge(BADGES[0].name);
    setMessage("");
    setShowForm(false);
    setTab("given");
  };

  const given = shoutouts.filter((s) => s.type === "given");
  const received = shoutouts.filter((s) => s.type === "received");

  let display = tab === "given" ? given : received;
  if (filterCampaign !== "All Campaigns") {
    display = display.filter((s) => s.campaign === filterCampaign);
  }

  const totalPoints = given.reduce((acc, s) => acc + s.points, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">My Shout-Outs</h1>
          <p className="text-gray-500">Your personal recognition journey</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
        >
          {showForm ? "Close Form" : "Create Shoutout"}
        </button>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-indigo-50 shadow-sm">
          <p>Total Given</p>
          <h2 className="text-4xl font-bold">{given.length}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-green-50 shadow-sm">
          <p>Total Received</p>
          <h2 className="text-4xl font-bold">{received.length}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-yellow-50 shadow-sm">
          <p>Points Earned</p>
          <h2 className="text-4xl font-bold">{totalPoints}</h2>
        </div>
      </div>

      {/* Create Shoutout Form */}
      {showForm && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Create Shout-Out</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Badge Selection */}
            <select
              className="w-full border p-3 rounded-lg"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
            >
              {BADGES.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>

            <textarea
              className="w-full border p-3 rounded-lg"
              placeholder="Write appreciation message..."
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <select
              className="w-full border p-3 rounded-lg"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            >
              <option>Team Excellence</option>
              <option>Innovation Drive</option>
              <option>Leadership Award</option>
            </select>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Send Shout-Out
            </button>
          </form>
        </div>
      )}

      {/* Tabs + Filter */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-2xl shadow mb-8 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setTab("given")}
            className={`px-5 py-2 rounded-xl ${tab === "given" ? "bg-gray-200 font-semibold" : ""}`}
          >
            Given ({given.length})
          </button>
          <button
            onClick={() => setTab("received")}
            className={`px-5 py-2 rounded-xl ${tab === "received" ? "bg-gray-200 font-semibold" : ""}`}
          >
            Received ({received.length})
          </button>
        </div>
        <select
          className="border p-2 rounded-lg"
          value={filterCampaign}
          onChange={(e) => setFilterCampaign(e.target.value)}
        >
          <option>All Campaigns</option>
          <option>Team Excellence</option>
          <option>Innovation Drive</option>
          <option>Leadership Award</option>
        </select>
      </div>

      {/* Shoutout List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {display.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-400">
            No shoutouts yet 🚀
          </div>
        ) : (
          display.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between items-center mb-3">
                {/* Badge */}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-sm text-gray-400">{item.createdAt}</span>
              </div>

              <p className="text-gray-700 mb-3">{item.message}</p>

              <div className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mb-4">
                {item.campaign}
              </div>

              {/* Reactions */}
              <div className="flex gap-6 text-sm font-medium text-gray-600">
                <span>👍 {item.reactions.likes}</span>
                <span>⭐ {item.reactions.stars}</span>
                <span>👏 {item.reactions.claps}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}