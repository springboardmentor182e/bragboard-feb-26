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
      <div className="border border-emerald-200 rounded-2xl p-6 bg-emerald-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-emerald-900 font-semibold">Report Resolved</p>
              <p className="text-xs text-emerald-700 mt-0.5">This report has been successfully resolved</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-200 text-emerald-800 text-xs font-bold rounded-full flex-shrink-0">Resolved</span>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-white">
      {/* Message display */}
      {message && (
        <div className={`mb-4 p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
          message.includes('✅') 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {message.includes('✅') ? (
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {message}
        </div>
      )}
      
      {/* Header with author and status */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {author?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 truncate text-base">{author}</p>
            <p className="text-xs text-gray-500 mt-0.5">{time}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex-shrink-0">
          Pending
        </span>
      </div>
      
      {/* Content section */}
      <div className="mb-5">
        <p className="text-sm leading-relaxed text-gray-700 mb-4">\"{content}\"</p>
      </div>
      
      {/* Report details - Grid layout */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Reported By</p>
            <p className="text-sm font-medium text-gray-900 truncate">{reportedBy}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Reason</p>
            <p className="text-sm font-medium text-rose-600 truncate">{reason}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Report ID</p>
            <p className="text-sm font-mono text-gray-600 truncate">#{id}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Status</p>
            <p className="text-sm font-medium text-amber-600 capitalize">{status || 'pending'}</p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <button 
          onClick={handleResolve}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Resolve
            </>
          )}
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Deleting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete
            </>
          )}
        </button>
        
        <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 ml-auto flex items-center gap-2 transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </button>
      </div>
    </div>
  );
};

export default ReportedPostItem;