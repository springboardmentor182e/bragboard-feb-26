import Modal from "../../../../components/Modals/Modal";
import { AlertTriangle } from "lucide-react";

const BulkDeleteConfirmModal = ({ isOpen, onClose, onConfirm, count }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Bulk Deletion">
      <div className="p-8 text-center space-y-6">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
        <p className="text-gray-500">
          You are about to permanently delete <span className="font-bold text-red-600">{count}</span> shoutouts. This action cannot be undone.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
          >
            Yes, Delete Them
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkDeleteConfirmModal;
