import { useState } from 'react';
import { X } from 'lucide-react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { useShoutouts } from '../../../context/ShoutoutContext';

export default function CreateShoutoutModal({ isOpen, onClose }) {
  const { users: teamMembers, badges: badgesList } = useAnalytics();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [message, setMessage] = useState('');
  const { addShoutout } = useShoutouts();

  if (!isOpen) return null;

  const BADGE_OPTIONS = badgesList?.slice(0, 6) || [];
  const isFormValid = selectedEmployee && selectedBadge && message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const employee = teamMembers?.find(m => m.id === parseInt(selectedEmployee));
    
    addShoutout({
      recipientId: parseInt(selectedEmployee),
      badgeId: selectedBadge.id,
      message: message,
    });
    
    // Reset form
    setSelectedEmployee('');
    setSelectedBadge(null);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header - Purple Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Create Shout-Out</h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Select Employee */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-500 mb-2">Select Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 cursor-pointer"
            >
              <option value="">Choose an employee...</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>{member.name} - {member.role}</option>
              ))}
            </select>
          </div>

          {/* Select Badge - 2x3 Grid */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-500 mb-2">Select Badge</label>
            <div className="grid grid-cols-3 gap-3">
              {BADGE_OPTIONS.map((badge) => (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => setSelectedBadge(badge)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedBadge?.id === badge.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <span className="text-xs font-medium text-gray-700 text-center">{badge.name}</span>
                </button>
              ))}
            </div>
          </div> {/* <--- Added missing div for Badge Container */}

          {/* Write Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-2">Write your message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share why this person deserves recognition..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder:text-gray-400 bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-none"
            />
          </div>

          {/* Action Footer */}
          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!isFormValid}
              className={`flex-1 px-5 py-3 rounded-xl font-semibold transition-colors cursor-pointer ${
                isFormValid 
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Post Shout-Out
            </button>
          </div>
        </form>
      </div>
    </div> 
  );
}