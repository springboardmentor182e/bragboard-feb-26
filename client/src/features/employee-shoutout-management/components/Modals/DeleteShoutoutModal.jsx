import Modal from "../../../../components/Modals/Modal";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteShoutoutModal = ({ isOpen, onClose, item, onDelete }) => {
  if (!item) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Delete Shoutout" 
      headerBg="bg-red-600"
    >
      <div className="p-8 space-y-8">
        {/* Warning Card */}
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-red-900">Are you sure?</h4>
            <p className="text-sm text-red-600">This action cannot be undone</p>
          </div>
        </div>

        {/* Item Details Card */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Shoutout Details:</p>
          <div className="space-y-2">
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-gray-700 w-12">From:</span>
              <span className="text-gray-600">{item.author}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-gray-700 w-12">To:</span>
              <span className="text-gray-600">{item.recipient}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-gray-700 w-12">Badge:</span>
              <span className="text-gray-600">⭐ {item.badge?.label}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          This shoutout will be permanently deleted and cannot be recovered.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
          >
            Delete Permanently
          </button>
          <button
            onClick={onClose}
            className="px-8 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteShoutoutModal;
