import { useState, useEffect } from "react";
import Modal from "../../../../components/Modals/Modal";
import { Star } from "lucide-react";

const EditShoutoutModal = ({ isOpen, onClose, item, onSave }) => {
  const [formData, setFormData] = useState({
    badge: "",
    message: "",
    status: "",
  });

  const availableBadges = [
    "Innovation Star",
    "Team Player",
    "Creative Genius",
    "Leadership Excellence",
    "Problem Solver",
    "Culture Champion",
  ];

  useEffect(() => {
    if (item) {
      setFormData({
        badge: item.badge?.label || "",
        message: item.message || "",
        status: item.status || "Active",
      });
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...item, ...formData, badge: { label: formData.badge } });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Edit Shoutout" 
      headerBg="bg-orange-600"
    >
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
               {item.author
                 .split(" ")
                 .map((part) => part[0])
                 .join("")
                 .slice(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{item.author}</h3>
            </div>
          </div>
          
          <div className="text-gray-300">→</div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <h3 className="font-bold text-gray-900">{item.recipient}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
               {item.recipient
                 .split(" ")
                 .map((part) => part[0])
                 .join("")
                 .slice(0, 2)}
            </div>
          </div>
        </div>

        {/* Badge Select */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Badge</label>
          <div className="relative">
            <select
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 pl-12 appearance-none focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            >
              {availableBadges.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
            <Star className="w-5 h-5 text-yellow-500 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Message Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Write your shoutout message..."
          />
        </div>

        {/* Status Radio Group */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Status</label>
          <div className="grid grid-cols-3 gap-4">
            {["Active", "Pinned", "Archived"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData({ ...formData, status })}
                className={`py-3 rounded-xl font-semibold border-2 transition-all ${
                  formData.status === status
                    ? "bg-purple-50 border-purple-600 text-purple-600 shadow-sm"
                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
          >
            Save Changes
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

export default EditShoutoutModal;