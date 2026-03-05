import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [brags, setBrags] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/brags")
      .then(res => setBrags(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-darkText">
        Welcome Back 👋
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-lightText mb-2">Total Brags</p>
          <h3 className="text-3xl font-bold text-softBrown">
            {brags.length}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-lightText mb-2">Latest Brag</p>
          <h3 className="text-lg font-semibold text-softBrown">
            {brags[0]?.content || "No brags yet"}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-lightText mb-2">Employee Status</p>
          <h3 className="text-lg font-semibold text-softBrown">
            Active
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;