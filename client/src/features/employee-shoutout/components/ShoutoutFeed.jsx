import { useState, useEffect } from "react";
import ShoutoutCard from "./ShoutoutCard";

const ShoutoutFeed = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock Data
  const mockShoutouts = [
    { id: 's1', author: 'Alice', recipient: 'Bob', message: 'Great job on the presentation!', date: '2024-07-29', reactions: { hearts: 12, claps: 5, stars: 3 }, comments: [{id: 'c1', author: 'Zoe', message: 'So proud of you!'}] },
    { id: 's2', author: 'Charlie', recipient: 'David', message: 'Thanks for the warm welcome!', date: '2024-07-28', reactions: { hearts: 8, claps: 15, stars: 1 }, comments: [] },
    { id: 's3', author: 'Eve', recipient: 'Frank', message: 'Your help was much appreciated.', date: '2024-07-27', reactions: { hearts: 20, claps: 3, stars: 7 }, comments: [] },
  ];

  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        setLoading(true);
        // Mocking the API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        setShoutouts(mockShoutouts);
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
