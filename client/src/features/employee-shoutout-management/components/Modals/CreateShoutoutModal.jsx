import { useState } from "react";
import Modal from "../../../../components/Modals/Modal";
import { Plus } from "lucide-react";

const CreateShoutoutModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    author: "",
    recipient: "",
    department: "Engineering",
    message: "",
    badge: "Innovation Star",
    status: "Active",
  });

  const availableBadges = [
    "Innovation Star",
    "Team Player",
    "Creative Genius",
    "Leadership Excellence",
    "Problem Solver",
    "Culture Champion",
  ];

  const departments = ["Engineering", "Design", "Marketing", "Sales", "HR"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShoutout = {
      ...formData,
      badge: { label: formData.badge },
      reactions: {
        hearts: 0,
        claps: 0,
        stars: 0,
        comments: 0,
      },
      date: new Date().toISOString().split('T')[0],
    };
    onSave(newShoutout);
    onClose();
    // Reset form
    setFormData({
      author: "",
      recipient: "",
      department: "Engineering",
      message: "",
      badge: "Innovation Star",
      status: "Active",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Shoutout">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Author Name</label>
            <input
              required
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Who is giving the shoutout?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Recipient Name</label>
            <input
              required
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Who is receiving it?"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Badge</label>
            <select
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
            >
              {availableBadges.map((badge) => (
                <option key={badge} value={badge}>{badge}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Message</label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border border-gray-200 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            placeholder="Write your appreciation message here..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Shoutout
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateShoutoutModal;
