import { Plus } from 'lucide-react';

const ActionPanel = ({ onCreateClick }) => {
  return (
    <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-purple-200/50">
      <h2 className="text-xl font-bold text-purple-900">Actions</h2>
      <p className="text-sm text-purple-800/80 mt-1 mb-6">What would you like to do?</p>
      <button 
        onClick={onCreateClick}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        <span>Give a Shoutout</span>
      </button>
    </div>
  );
};

export default ActionPanel;
