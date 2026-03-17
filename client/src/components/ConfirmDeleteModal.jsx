import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, employee, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Delete
          </h2>
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete this employee?
          </p>
          {employee && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="font-medium text-gray-800">{employee.name}</p>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          )}
          <p className="text-sm text-red-600">
            This action cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
