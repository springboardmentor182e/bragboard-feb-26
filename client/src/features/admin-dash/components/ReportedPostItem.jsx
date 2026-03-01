import React from 'react';

const ReportedPostItem = ({ author, time, content, reportedBy, reason }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="font-medium text-gray-900">{author}</span>
          <span className="text-xs text-gray-500 ml-2">· {time}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{content}</p>
      
      <div className="bg-gray-50 rounded p-3 mb-3 text-xs">
        <p><span className="font-medium">Reported by:</span> {reportedBy}</p>
        <p><span className="font-medium">Reason:</span> {reason}</p>
      </div>
      
      <div className="flex gap-2">
        <button className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded border border-green-200">
          Resolve
        </button>
        <button className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200">
          Delete
        </button>
        <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 ml-auto">
          View Full Post
        </button>
      </div>
    </div>
  );
};

export default ReportedPostItem;