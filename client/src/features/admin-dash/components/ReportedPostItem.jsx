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

  // Handle resolve action
  const handleResolve = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      // Show confirmation
      if (!window.confirm('Are you sure you want to resolve this report?')) {
        setLoading(false);
        return;
      }
      
      console.log(`Attempting to resolve report ${id}`);
      
      // Call API to resolve
      const response = await adminAPI.resolveReport(id);
      console.log('Resolve response:', response);
      
      if (response.status === 200 || response.data) {
        setIsResolved(true);
        setMessage('✅ Report resolved successfully!');
        
        // IMPORTANT: Notify parent to remove this from UI
        if (onResolve) {
          onResolve(id);  // This triggers parent to filter it out
        }
        
        setTimeout(() => setMessage(''), 3000);
      }
      
    } catch (error) {
      console.error('Error resolving report:', error);
      
      let errorMessage = '❌ Failed to resolve report';
      
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        
        if (error.response.status === 404) {
          errorMessage = '❌ Report endpoint not found';
        } else if (error.response.data?.detail) {
          errorMessage = `❌ ${error.response.data.detail}`;
        }
      } else if (error.request) {
        errorMessage = '❌ Server not responding';
      }
      
      setMessage(errorMessage);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    // Show confirmation dialog first
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      setMessage('');
      
      console.log(`Attempting to delete post with ID: ${id}`);
      
      // Call API to delete
      const response = await adminAPI.deletePost(id);
      console.log('Delete response:', response);
      
      setMessage('✅ Post deleted successfully!');
      
      // Call the parent's onDelete callback with the id
      if (onDelete) {
        onDelete(id);
      }
      
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error("Error deleting post:", error);
      
      let errorMessage = '❌ Failed to delete post';
      
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        
        if (error.response.status === 404) {
          errorMessage = '❌ Delete endpoint not found on server';
        } else if (error.response.status === 403) {
          errorMessage = '❌ You don\'t have permission to delete this';
        } else if (error.response.data?.detail) {
          errorMessage = `❌ ${error.response.data.detail}`;
        } else if (error.response.data?.error) {
          errorMessage = `❌ ${error.response.data.error}`;
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

  // If resolved, show resolved state
  if (isResolved) {
    return (
      <div className="border border-green-200 rounded-lg p-4 bg-green-50 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-700 font-medium">This report has been resolved</p>
          </div>
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Resolved</span>
        </div>
        <p className="text-xs text-green-600 mt-2">Report ID: {id} • Resolved just now</p>
      </div>
    );
  }

  // Main component render
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 mb-4 transition-colors">
      {/* Message display */}
      {message && (
        <div className={`mb-3 p-2 rounded text-sm ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      {/* Header with author and time */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
            {author?.charAt(0) || 'U'}
          </div>
          <div>
            <span className="font-medium text-gray-900">{author}</span>
            <span className="text-xs text-gray-500 ml-2">· {time}</span>
          </div>
        </div>
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
          Pending
        </span>
      </div>
      
      {/* Content */}
      <p className="text-sm text-gray-700 mb-3 pl-10">{content}</p>
      
      {/* Report details */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3 text-xs border border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-medium text-gray-600">Reported by:</span>
            <span className="ml-1 text-gray-800">{reportedBy}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Reason:</span>
            <span className="ml-1 text-gray-800">{reason}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Report ID:</span>
            <span className="ml-1 text-gray-800">{id}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Status:</span>
            <span className="ml-1 text-yellow-600">{status || 'pending'}</span>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <button 
          onClick={handleResolve}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 disabled:opacity-50 flex items-center transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>✓ Resolve Report</>
          )}
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 disabled:opacity-50 flex items-center transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Deleting...
            </>
          ) : (
            <>🗑️ Delete Post</>
          )}
        </button>
        
        <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 ml-auto flex items-center transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Full Post
        </button>
      </div>
    </div>
  );
};

export default ReportedPostItem;