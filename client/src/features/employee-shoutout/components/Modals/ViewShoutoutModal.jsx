import Modal from "../../../../components/Modals/Modal";
import { Heart, MessageSquare, Star, Award, Calendar, CheckCircle, Info } from "lucide-react";

const ViewShoutoutModal = ({ isOpen, onClose, item, onEdit }) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shoutout Details">
      <div className="p-8 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {item.author
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{item.author}</h3>
              <span className="mt-1 inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {item.department}
              </span>
            </div>
          </div>
          
          <div className="text-center">
             <span className="text-2xl">→</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <h3 className="text-xl font-bold text-gray-900">{item.recipient}</h3>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {item.recipient
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
        </div>

        {/* Badge Awarded */}
        <div className="bg-purple-50 rounded-2xl p-6 flex items-center gap-4 border border-purple-100">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-purple-600 font-medium uppercase tracking-wider">Badge Awarded</p>
            <h4 className="text-lg font-bold text-purple-900">{item.badge?.label}</h4>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Message</p>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 italic text-gray-700 leading-relaxed">
            "{item.message}"
          </div>
        </div>

        {/* Reactions */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Reactions</p>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-red-900">{item.reactions?.hearts ?? 0}</p>
              <p className="text-xs text-red-600">Likes</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 text-center">
              <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-yellow-900">{item.reactions?.claps ?? 0}</p>
              <p className="text-xs text-yellow-600">Claps</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-center">
              <Star className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-orange-900">{item.reactions?.stars ?? 0}</p>
              <p className="text-xs text-orange-600">Stars</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
              <MessageSquare className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-blue-900">{item.reactions?.comments ?? 0}</p>
              <p className="text-xs text-blue-600">Comments</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">Date Posted</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{item.date}</p>
            <p className="text-xs text-gray-400">2 hours ago</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Info className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">Status</span>
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Pinned' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
              {item.status}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">Pinned</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{item.status === 'Pinned' ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
          >
            Edit Shoutout
          </button>
          <button
            onClick={onClose}
            className="px-8 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewShoutoutModal;
