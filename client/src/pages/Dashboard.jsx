import { useEffect, useState } from "react";
import { getShoutouts, createShoutout } from "../services/api";

export default function Dashboard() {
  const [shoutouts, setShoutouts] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");

  // Fetch shoutouts
  useEffect(() => {
    fetchShoutouts();
  }, []);

  const fetchShoutouts = async () => {
    try {
      const res = await getShoutouts();
      setShoutouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create shoutout
  const handleShoutout = async () => {
    if (!message || !receiver) return;

    try {
      await createShoutout({
        message,
        sender: "You",
        receiver,
      });

      setMessage("");
      setReceiver("");
      fetchShoutouts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 h-screen bg-black text-white p-4">
        <h1 className="text-xl font-bold">BragBoard</h1>

        <ul className="mt-6 space-y-3">
          <li className="bg-purple-600 p-2 rounded">Feed</li>
          <li className="p-2">Leaderboard</li>
          <li className="p-2">Team</li>
          <li className="p-2">Badges</li>
        </ul>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="mt-10 bg-red-500 px-3 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white shadow">
          <h2 className="text-2xl font-bold">Welcome back 👋</h2>
          <p>You’ve received recognitions this week</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            {shoutouts.length} Shoutouts
          </div>
          <div className="bg-white p-4 rounded shadow">
            {new Set(shoutouts.map(s => s.receiver)).size} Participants
          </div>
          <div className="bg-white p-4 rounded shadow">
            +12% Growth
          </div>
        </div>

        {/* Add Shoutout */}
        <div className="bg-white p-4 rounded-xl shadow mt-6">
          <h3 className="font-semibold mb-2">Give Shoutout 🎉</h3>

          <input
            placeholder="Receiver name"
            className="border p-2 w-full mb-2 rounded"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <input
            placeholder="Message"
            className="border p-2 w-full mb-2 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleShoutout}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full"
          >
            Send Shoutout
          </button>
        </div>

        {/* Shoutout Feed */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Shoutouts Feed</h3>

          {shoutouts.length === 0 ? (
            <p className="text-gray-500">No shoutouts yet</p>
          ) : (
            shoutouts.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow mb-3"
              >
                <p className="font-semibold">
                  {item.sender} → {item.receiver}
                </p>
                <p className="text-gray-600">{item.message}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}