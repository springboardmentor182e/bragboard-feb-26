import { Plus } from "lucide-react";

const ShoutoutHeader = ({ onCreateClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
          <span className="text-2xl">🎉</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Shoutout Management
          </h1>
          <p className="text-gray-500 font-medium">
            Manage, moderate, and organize all employee recognitions
          </p>
        </div>
      </div>

      <button
        onClick={onCreateClick}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center gap-2 active:scale-95"
      >
        <Plus className="w-5 h-5" />
        Create Shoutout
      </button>
    </div>
  );
};

export default ShoutoutHeader;