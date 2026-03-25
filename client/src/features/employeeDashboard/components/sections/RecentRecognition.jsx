import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchShoutouts } from "../../../../services/shoutoutService";

const RecentRecognition = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  /*
  LOAD SHOUTOUTS FROM BACKEND
  */
  useEffect(() => {
    loadShoutouts();
  }, []);

  const loadShoutouts = async () => {
    try {
      const res = await fetchShoutouts();

      // 🔥 FORMAT DATA FOR UI
      const formatted = res.map((item) => ({
        name: "User " + item.receiver_id, // later replace with real user name
        role: "Employee", // later from user table
        time: new Date(item.created_at).toLocaleString(),
        badge: item.badge,
        badgeColor: getBadgeColor(item.badge),
        message: item.message,
        likes: item.likes,
        initials: getInitials(item.receiver_id),
      }));

      setData(formatted);

    } catch (err) {
      console.error("Failed to load shoutouts", err);
    }
  };

  /*
  HELPER: BADGE COLORS (Figma feel 🎨)
  */
  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Innovation Star":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "Going Above & Beyond":
        return "bg-indigo-100 text-indigo-600 border-indigo-200";
      case "Team Player":
        return "bg-green-100 text-green-600 border-green-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  /*
  HELPER: INITIALS
  */
  const getInitials = (id) => {
    return "U" + id; // temporary (later replace with name initials)
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Recognition
          </h2>
          <p className="text-sm text-slate-500">
            Shout-outs you've received recently
          </p>
        </div>

        <button
          onClick={() => navigate("/recognitions")}
          className="text-sm px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
        >
          View All →
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No recognitions yet
        </div>
      ) : (

        /* CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {data.map((item, index) => (
            <div
              key={index}
              className="
                bg-white 
                rounded-2xl 
                p-6 
                border border-slate-200
                shadow-sm 
                hover:shadow-md 
                transition-all duration-300
              "
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div className="flex items-center gap-4">

                  {/* AVATAR */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold shadow">
                    {item.initials}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* TIME */}
                <p className="text-xs text-slate-400">
                  {item.time}
                </p>
              </div>

              {/* BADGE */}
              <div
                className={`
                  inline-block mt-4 text-xs px-3 py-1 rounded-lg border font-medium
                  ${item.badgeColor}
                `}
              >
                {item.badge}
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {item.message}
              </p>

              {/* FOOTER */}
              <div className="mt-5">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full w-fit text-sm text-slate-600">
                  <Heart size={14} className="text-red-500" />
                  {item.likes}
                </div>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default RecentRecognition;