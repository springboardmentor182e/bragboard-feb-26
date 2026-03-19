import { useState, useEffect } from "react";
import ShoutoutCard from "./ShoutoutCard";

const ShoutoutFeed = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/shoutouts`);
        if (!response.ok) throw new Error("Failed to fetch shoutouts");
        const json = await response.json();
        setShoutouts(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoutouts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {loading && (
        <div className="flex flex-col items-center justify-center p-20 bg-white/30 backdrop-blur-sm rounded-3xl border border-purple-100">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-700 font-medium">Curating your feed...</p>
        </div>
      )}
      {error && (
        <div className="p-8 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-center font-medium">
          ⚠️ {error}
        </div>
      )}
      {!loading && !error && (
        shoutouts.map(shoutout => (
          <ShoutoutCard key={shoutout.id} shoutout={shoutout} type="feed" />
        ))
      )}
    </div>
  );
};

export default ShoutoutFeed;