import ShoutoutFeed from "../components/ShoutoutFeed";
import ActionPanel from "../components/ActionPanel";
import CreateShoutoutModal from "../components/Modals/CreateShoutoutModal";
import { useState } from "react";

const ShoutoutFeedPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateShoutout = (newShoutout) => {
    // This will be connected to the backend later
    console.log("New Shoutout:", newShoutout);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ActionPanel onCreateClick={() => setIsCreateModalOpen(true)} />
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-purple-900 mb-6 tracking-tight">Shoutout Feed</h1>
          <ShoutoutFeed />
        </div>
      </div>
      <CreateShoutoutModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateShoutout}
      />
    </div>
  );
};

export default ShoutoutFeedPage;
