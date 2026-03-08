import React, { useState } from 'react';
import { adminAPI } from '../../../services/api';

const ReportedPostItem = ({ 
  id, 
  author, 
  time, 
  content, 
  reportedBy, 
  reason,
  status,
  onDelete,
  onResolve 
}) => {
  
  const [loading, setLoading] = useState(false);
  const [isResolved, setIsResolved] = useState(status === 'resolved');
  const [message, setMessage] = useState('');

  const handleResolve = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      // API call to resolve
      await adminAPI.resolveReport(id);
      
      setIsResolved(true);
      setMessage('✅ Report resolved successfully!');
      
      // Parent component ko batao
      if (onResolve) {
        onResolve(id);
      }
      
      // 3 sec baad message hata do
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Error resolving report:', error);
      setMessage('❌ Failed to resolve report');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

// In ReportedPostItem.jsx, update the handleDelete function:

const handleDelete = async () => {
  // Show confirmation dialog first
  if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return;
  }
  
  try {
    setLoading(true);
    setMessage('');
    
    console.log(`Attempting to delete post with ID: ${id}`);
    
    // Use adminAPI.deletePost instead of api.delete
    await adminAPI.deletePost(id);
    
    setMessage('✅ Post deleted successfully!');
    
    // Call the parent's onDelete callback with the id
    if (onDelete) {
      onDelete(id);
    }
    
    // 3 sec baad message hata do
    setTimeout(() => setMessage(''), 3000);
    
  } catch (error) {
    console.error("Error deleting post:", error);
    
    let errorMessage = '❌ Failed to delete post';
    
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      
      if (error.response.status === 404) {
        errorMessage = '❌ Post endpoint not found on server';
      } else if (error.response.status === 403) {
        errorMessage = '❌ You don\'t have permission to delete this post';
      } else if (error.response.data?.detail) {
        errorMessage = `❌ ${error.response.data.detail}`;
      }
    } else if (error.request) {
      errorMessage = '❌ Server not responding. Check your connection.';
    } else {
      errorMessage = `❌ ${error.message}`;
    }
    
    setMessage(errorMessage);
    setTimeout(() => setMessage(''), 3000);
  } finally {
    setLoading(false);
  }
};

  if (isResolved) {
    return (
      <div className="border border-green-200 rounded-lg p-4 bg-green-50 mb-4">
        <p className="text-green-700 font-medium">✓ This report has been resolved</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 mb-4">
      {/* Message display */}
      {message && (
        <div className={`mb-3 p-2 rounded text-sm ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
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
        <p><span className="font-medium">Report ID:</span> {id}</p>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={handleResolve}
          disabled={loading}
          className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded border border-green-200 disabled:opacity-50 flex items-center"
        >
          {loading ? '⏳ Processing...' : '✓ Resolve'}
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200 disabled:opacity-50 flex items-center"
        >
          {loading ? '⏳ Processing...' : '🗑️ Delete'}
        </button>
        
        <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 ml-auto">
          👁️ View Full Post
        </button>
      </div>
    </div>
  );
};

export default ReportedPostItem;