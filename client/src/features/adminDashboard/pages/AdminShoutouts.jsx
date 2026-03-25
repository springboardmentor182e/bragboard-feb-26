import { useEffect, useState } from "react";
import { getBrags } from "../../employeeDashboard/services/bragService";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const AdminShoutouts = () => {
  const [brags, setBrags] = useState([]);

  useEffect(() => {
    fetchBrags();
  }, []);

  const fetchBrags = () => {
    getBrags()
      .then(res => setBrags(res.data))
      .catch(err => console.log(err));
  };

  const [message, setMessage] = useState("");

  const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this shoutout?")) return;

  axios.delete(`${API}/brags/${id}`)
    .then(() => {
      setMessage("Shoutout deleted successfully");
      fetchBrags();

      setTimeout(() => setMessage(""), 2000);
    });
};
 
const [filter,setFilter] = useState("all")

const filteredBrags =
  filter === "latest"
    ? [...brags].reverse()
    : brags;

  return (
  <div className="min-h-screen bg-[#f5efe6] py-8">
    
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex justify-between items-center">
  <h2 className="text-3xl font-bold text-darkText">
    Admin Shoutout Management
  </h2>

  <span className="bg-softBrown text-white px-3 py-1 rounded-full text-sm">
    Admin
  </span>
</div>

      <div className="flex gap-4">
        
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-1 rounded-lg ${
      filter === "all"
        ? "bg-softBrown text-white"
        : "bg-gray-200 text-darkText"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("latest")}
    className={`px-4 py-1 rounded-lg ${
      filter === "latest"
        ? "bg-softBrown text-white"
        : "bg-gray-200 text-darkText"
    }`}
  >
    Latest
  </button>
</div>

      {/* Summary Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <p className="text-lightText">Total Shoutouts</p>
        <h3 className="text-2xl font-bold text-softBrown">
          {brags.length}
        </h3>
      </div>

      {message && (
  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
    {message}
  </div>
)}

      {/* Brags */}
      {brags.length === 0 ? (
        <div className="text-center text-lightText mt-10">
          No shoutouts available.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBrags.map((brag) => (
            <div
              key={brag.id}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-darkText">
                  {brag.author}
                </h4>
              </div>

              <p className="text-lightText mt-3">
                {brag.content}
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(brag.id)}
                  className="bg-red-100 text-red-600 px-4 py-1 rounded-lg hover:bg-red-200 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
};

export default AdminShoutouts;