import React, { useState } from 'react';
import { adminAPI } from '../../../services/api';

const ReportedPostItem = ({ 
  report_id,
  report_created_at,
  message,
  sender_name,
  reporter_name,
  reason,
  description,
  priority,
  status,
  category,
  points,
  recipients,
  onDelete,
  onReportAction
}) => {
  
  const [loading, setLoading] = useState(false);
  const [isResolved, setIsResolved] = useState(status === 'RESOLVED');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Get priority color
  const getPriorityColor = (priorityLevel) => {
    switch (priorityLevel) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'LOW':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle resolve action - calls parent handler
  const handleResolve = async () => {
    try {
      setLoading(true);
      setFeedbackMessage('');
      
      // Show confirmation
      if (!window.confirm('Are you sure you want to dismiss this report?')) {
        setLoading(false);
        return;
      }
      
      // Call parent handler with dismiss action
      if (onReportAction) {
        await onReportAction(report_id, 'dismiss');
        setIsResolved(true);
      }
      
    } catch (error) {
      console.error('Error dismissing report:', error);
      setFeedbackMessage('❌ Failed to dismiss report');
      setTimeout(() => setFeedbackMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    // Show confirmation dialog first
    if (!window.confirm('Are you sure you want to delete this shoutout? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      setFeedbackMessage('');
      
      // Call parent's onDelete callback
      if (onDelete) {
        await onDelete(report_id);
      }
      
    } catch (error) {
      console.error("Error deleting post:", error);
      setFeedbackMessage('❌ Failed to delete post');
      setTimeout(() => setFeedbackMessage(''), 3000);
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
      {feedbackMessage && (
        <div className={`mb-4 p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
          feedbackMessage.includes('✅') 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {feedbackMessage.includes('✅') ? (
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {feedbackMessage}
        </div>
      )}
      
      {/* Header with author and status */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {sender_name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 truncate text-base">{sender_name || 'Unknown'}</p>
            <p className="text-xs text-gray-500 mt-0.5">{formatDate(report_created_at)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getPriorityColor(priority)}`}>
            {priority} Priority
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
            {status}
          </span>
        </div>
      </div>
      
      {/* Content section - Original Shoutout */}
      <div className="mb-5 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-2">Original Shoutout</p>
        <p className="text-sm leading-relaxed text-gray-700">\"{message || 'No content'}\"</p>
      </div>
      
      {/* Report details - Grid layout */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Report Reason</p>
            <p className="text-sm font-medium text-rose-600">{reason}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Report Description</p>
            <p className="text-sm text-gray-700">{description || 'No description provided'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Reported By</p>
              <p className="text-sm font-medium text-gray-900 truncate">{reporter_name}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Category</p>
              <p className="text-sm font-medium text-gray-900 truncate">{category || 'N/A'}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Report ID</p>
              <p className="text-sm font-mono text-gray-600 truncate">#{report_id}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Points</p>
              <p className="text-sm font-medium text-indigo-600">{points || 'N/A'}</p>
            </div>
          </div>
          {recipients && recipients.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Recipients ({recipients.length})</p>
              <p className="text-sm text-gray-700">{recipients.map(r => r.recipient_name || r.recipient_id).join(', ')}</p>
            </div>
          )}
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
              Dismiss Report
            </>
          )}
        </button>
        
        <button 
          onClick={() => {
            if (onReportAction && window.confirm('Issue a warning to the user who posted this shoutout?')) {
              onReportAction(report_id, 'warn');
            }
          }}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Warn User
        </button>
        
        <button 
          onClick={() => {
            if (onReportAction && window.confirm('Escalate this report for senior review?')) {
              onReportAction(report_id, 'escalate');
            }
          }}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
          Escalate
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
              Delete Post
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportedPostItem;