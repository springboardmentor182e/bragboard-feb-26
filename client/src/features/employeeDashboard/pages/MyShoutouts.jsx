import { useState, useEffect } from "react";
import { Heart, MessageCircle, Filter } from "lucide-react";
import { fetchUserShoutouts } from "../../../services/shoutoutService";

const CURRENT_USER_ID = 1; // ⚠️ Replace with auth later

const MyShoutouts = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [data, setData] = useState([]);
  const [allShoutouts, setAllShoutouts] = useState([]);

  /*
  LOAD DATA
  */
  useEffect(() => {
    loadShoutouts();
  }, []);

  const loadShoutouts = async () => {
    try {
      const res = await fetchUserShoutouts(CURRENT_USER_ID);

      setAllShoutouts(res);

      const formatted = res.map((item) => ({
        id: item.id,
        name:
          item.sender_id === CURRENT_USER_ID
            ? `User ${item.receiver_id}`
            : `User ${item.sender_id}`,
        role: "Employee",
        message: item.message,
        date: new Date(item.created_at).toLocaleString(),
        likes: item.likes || 0,
        comments: 0,
        badge: item.badge,
        campaign: "Recognition Campaign",
        initials: "U",
        sender_id: item.sender_id,
        receiver_id: item.receiver_id,
      }));

      setData(formatted);
    } catch (err) {
      console.error("Failed to load shoutouts", err);
    }
  };

  /*
  FILTER DATA (Given / Received)
  */
  const filteredData = data.filter((item) =>
    activeTab === "received"
      ? item.receiver_id === CURRENT_USER_ID
      : item.sender_id === CURRENT_USER_ID
  );

  /*
  STATS
  */
  const totalGiven = allShoutouts.filter(
    (s) => s.sender_id === CURRENT_USER_ID
  ).length;

  const totalReceived = allShoutouts.filter(
    (s) => s.receiver_id === CURRENT_USER_ID
  ).length;

  const points = totalReceived * 10; // 🔥 same logic as backend

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow">
          A
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Shout-Outs
          </h1>
          <p className="text-slate-500">
            Your personal recognition journey
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
          <p className="text-3xl font-bold text-slate-900">
            {totalGiven}
          </p>
          <p className="text-sm text-slate-500 mt-1">Total Given</p>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
          <p className="text-3xl font-bold text-slate-900">
            {totalReceived}
          </p>
          <p className="text-sm text-slate-500 mt-1">Total Received</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 shadow-sm">
          <p className="text-3xl font-bold text-slate-900">
            {points}
          </p>
          <p className="text-sm text-slate-500 mt-1">Points Earned</p>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">

        {/* TABS */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">

          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "received"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500"
            }`}
          >
            Received
          </button>

          <button
            onClick={() => setActiveTab("given")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "given"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500"
            }`}
          >
            Given
          </button>

        </div>

        {/* FILTER (UI only for now) */}
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-slate-400" />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>All Campaigns</option>
          </select>
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-6">

        {filteredData.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            No shoutouts found
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="
                bg-white rounded-2xl p-6
                border border-slate-200
                shadow-sm hover:shadow-md
                transition-all duration-300
              "
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold shadow">
                    {item.initials}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {activeTab === "received"
                        ? `${item.name} → You`
                        : `You → ${item.name}`}
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.role}
                    </p>
                  </div>

                </div>

                <p className="text-xs text-slate-400">
                  {item.date}
                </p>

              </div>

              {/* BADGE */}
              <div className="mt-4 inline-block text-xs px-3 py-1 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 font-medium">
                {item.badge}
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {item.message}
              </p>

              {/* CAMPAIGN */}
              <div className="mt-4 inline-block text-xs px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
                {item.campaign}
              </div>

              {/* FOOTER */}
              <div className="mt-5 flex items-center gap-4">

                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-600">
                  <Heart size={14} className="text-red-500" />
                  {item.likes}
                </div>

                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-600">
                  <MessageCircle size={14} />
                  {item.comments}
                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default MyShoutouts;