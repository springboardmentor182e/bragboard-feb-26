import { useState, useEffect } from "react";
import ShoutoutCard from "./ShoutoutCard";
import EditShoutoutModal from "./Modals/EditShoutoutModal";
import DeleteShoutoutModal from "./Modals/DeleteShoutoutModal";

const MyShoutouts = () => {
  const [givenShoutouts, setGivenShoutouts] = useState([]);
  const [receivedShoutouts, setReceivedShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("received");

  // Modal states
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/my-shoutouts");
        if (!response.ok) throw new Error("Failed to fetch your shoutouts");
        const data = await response.json();
        // The backend might return a list or an object, let's handle both
        if (Array.isArray(data)) {
          // If it's a list, we'll treat them all as 'given' for now
          // (matching the old backend behavior)
          setGivenShoutouts(data);
          setReceivedShoutouts([]);
        } else {
          setGivenShoutouts(data.given || []);
          setReceivedShoutouts(data.received || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoutouts();
  }, []);

  // Update Shoutout
  const handleUpdate = async (updatedItem) => {
    // Here you would normally call the backend API
    setGivenShoutouts((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItem(null);
  };

  // Delete Single Shoutout
  const handleDelete = async (id) => {
    // Here you would normally call the backend API
    setGivenShoutouts((prev) => prev.filter((item) => item.id !== id));
    setDeleteItem(null);
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="p-8 text-center text-purple-600 animate-pulse font-medium">
          Loading your shoutouts...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
          <div className="border-b-2 border-purple-100 px-8">
            <nav className="-mb-0.5 flex gap-12" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("received")}
                className={`${
                  activeTab === "received"
                    ? "border-purple-600 text-purple-800 shadow-[0_2px_0_0_rgba(147,51,234,1)] scale-105"
                    : "border-transparent text-purple-600/50 hover:text-purple-700 hover:border-purple-200"
                } whitespace-nowrap py-6 px-4 border-b-4 font-bold text-xl transition-all duration-300 ease-in-out`}
              >
                Received
              </button>
              <button
                onClick={() => setActiveTab("given")}
                className={`${
                  activeTab === "given"
                    ? "border-purple-600 text-purple-800 shadow-[0_2px_0_0_rgba(147,51,234,1)] scale-105"
                    : "border-transparent text-purple-600/50 hover:text-purple-700 hover:border-purple-200"
                } whitespace-nowrap py-6 px-4 border-b-4 font-bold text-xl transition-all duration-300 ease-in-out`}
              >
                Given
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "received" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {receivedShoutouts.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {receivedShoutouts.map((shoutout) => (
                      <ShoutoutCard key={shoutout.id} shoutout={shoutout} type="received" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white/50 rounded-2xl border-2 border-dashed border-purple-100">
                    <p className="text-2xl font-bold text-purple-900/60">No shoutouts yet! 🌟</p>
                    <p className="text-purple-700/50 mt-2 text-lg">When someone recognizes your hard work, it'll show up here.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "given" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {givenShoutouts.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {givenShoutouts.map((shoutout) => (
                      <ShoutoutCard key={shoutout.id} shoutout={shoutout} type="given" onEdit={setEditItem} onDelete={setDeleteItem} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white/50 rounded-2xl border-2 border-dashed border-purple-100">
                    <p className="text-2xl font-bold text-purple-900/60">You haven't sent any shoutouts yet. 🚀</p>
                    <p className="text-purple-700/50 mt-2 text-lg">Spread some positivity and recognize your teammates!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <EditShoutoutModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        item={editItem}
        onSave={handleUpdate}
      />

      <DeleteShoutoutModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        item={deleteItem}
        onDelete={() => handleDelete(deleteItem.id)}
      />
    </div>
  );
};

export default MyShoutouts;
