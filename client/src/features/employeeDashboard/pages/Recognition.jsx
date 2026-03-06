import { useEffect, useState } from "react";
import axios from "axios";

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + " mins ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + " hrs ago";

  return Math.floor(seconds / 86400) + " days ago";
};

const Recognition = () => {
  const [brags, setBrags] = useState([]);
  const [newBrag, setNewBrag] = useState("");

  // Fetch brags from backend
  useEffect(() => {
    fetchBrags();
  }, []);

  const fetchBrags = () => {
    axios.get("http://localhost:8000/brags")
      .then(res => {
        // Add frontend-only fields
        
        setBrags(res.data);
      })
      .catch(err => console.log(err));
  };

  const handlePostBrag = () => {
    if (!newBrag.trim()) return;

    axios.post("http://localhost:8000/brags", {
      author: "Employee",
      content: newBrag
    }).then(() => {
      setNewBrag("");
      fetchBrags();
    }).catch(err => console.log(err));
  };

  const handleLike = (id) => {
  axios.post(`http://localhost:8000/brags/${id}/like`)
    .then(() => {
      fetchBrags();
    })
    .catch(err => console.log(err));
};

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-darkText">
        Recognition Feed
      </h2>

      {/* Create Brag */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <textarea
          placeholder="Share something you're proud of..."
          value={newBrag}
          onChange={(e) => setNewBrag(e.target.value)}
          className="w-full border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-softBrown"
          rows="3"
        />

        <div className="flex justify-end mt-3">
          <button
            onClick={handlePostBrag}
            className="bg-softBrown text-white px-5 py-2 rounded-xl hover:bg-accentBrown transition"
          >
            Post Brag
          </button>
        </div>
      </div>

      {/* Brag Cards */}
      {brags.length === 0 ? (
        <div className="text-center text-lightText mt-10">
          No recognitions yet. Be the first to post!
        </div>
      ) : (
        brags.map((brag) => (
          <div key={brag.id} className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-darkText">
                {brag.author}
              </h4>
              <span className="text-xs text-lightText">
  {timeAgo(brag.created_at)}
</span>
            </div>

            <p className="text-lightText mt-3">
              {brag.content}
            </p>
            <div className="flex gap-6 mt-4 text-sm font-medium">
  <button
    onClick={() => handleLike(brag.id)}
    className="text-softBrown hover:text-accentBrown transition"
  >
    ❤️ {brag.likes}
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
  
};

export default Recognition;