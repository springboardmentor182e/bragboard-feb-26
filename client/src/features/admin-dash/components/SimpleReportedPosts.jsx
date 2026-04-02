import React, { useState, useEffect } from 'react';
import { fetchReportsWithDetails, updateReportStatus, deleteReport } from '../../../services/reportService';

const SimpleReportedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [resolving, setResolving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('SimpleReportedPosts: Fetching reports with PENDING status...');
      // Use the same endpoint as the full ReportedPosts page with PENDING status
      const data = await fetchReportsWithDetails('PENDING', null, null);
      console.log('SimpleReportedPosts: Fetched data:', data);
      const postsData = Array.isArray(data) ? data.slice(0, 5) : [];
      console.log('SimpleReportedPosts: Posts after slice:', postsData);
      setPosts(postsData);
    } catch (error) {
      console.error('SimpleReportedPosts: Error fetching reports:', error);
      setError('Failed to load reports');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (reportId) => {
    if (!window.confirm('Are you sure you want to resolve this report?')) return;
    try {
      setResolving(true);
      console.log('SimpleReportedPosts: Resolving report', reportId);
      await updateReportStatus(reportId, 'RESOLVED');
      setPosts(posts.filter(p => p.report_id !== reportId));
      setSelectedPost(null);
      showNotification('Report resolved successfully', 'success');
    } catch (error) {
      console.error('Error resolving report:', error);
      showNotification('Failed to resolve report', 'error');
    } finally {
      setResolving(false);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this shoutout? This action cannot be undone.')) return;
    try {
      setDeleting(true);
      console.log('SimpleReportedPosts: Deleting report', reportId);
      await deleteReport(reportId);
      setPosts(posts.filter(p => p.report_id !== reportId));
      setSelectedPost(null);
      showNotification('Shoutout deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting report:', error);
      showNotification('Failed to delete shoutout', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Reported Posts</h3>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-red-200">
          <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Reported Posts</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
        <button 
          onClick={fetchReports}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-100">
      {/* Section Heading */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <p className="text-xs font-bold tracking-widest text-gray-600 uppercase">Moderation Section</p>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-red-200">
        <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Reported Posts</h3>
          <p className="text-sm text-gray-600">{posts.length} posts requiring moderation</p>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No reported posts at this time</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.report_id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-red-300 transition">
              {/* Post header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {post.sender_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{post.sender_name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">• {post.report_created_at || 'unknown'}</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{post.message || 'No content'}</p>
                </div>
              </div>

              {/* Report info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3 flex flex-wrap items-center gap-3">
                <div>
                  <span className="text-xs text-gray-600">Reported by:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">{post.reporter_name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-gray-600">Reason:</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    {post.reason || 'Unknown'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResolve(post.report_id)}
                  disabled={resolving || deleting}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {resolving ? 'Resolving...' : 'Resolve'}
                </button>
                <button
                  onClick={() => handleDelete(post.report_id)}
                  disabled={resolving || deleting}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="ml-auto px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-bold">
                  {selectedPost.sender_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedPost.sender_name || 'Unknown'}</h2>
                  <p className="text-indigo-100 text-sm">Report ID: #{selectedPost.report_id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Shoutout Content */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Shoutout Message</h3>
                <div className="bg-blue-50 border-l-4 border-indigo-500 p-4 rounded">
                  <p className="text-gray-800 text-base">{selectedPost.message || 'No content'}</p>
                </div>
              </div>

              {/* Report Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Reported By</h4>
                  <p className="text-gray-900 font-medium">{selectedPost.reporter_name || 'Anonymous'}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Report Reason</h4>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    {selectedPost.reason || 'Unknown'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Priority</h4>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedPost.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                    selectedPost.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    selectedPost.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {selectedPost.priority || 'LOW'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</h4>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedPost.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    selectedPost.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedPost.status || 'PENDING'}
                  </span>
                </div>
              </div>

              {/* Description */}
              {selectedPost.description && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Report Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedPost.description}</p>
                </div>
              )}

              {/* Shoutout Category */}
              {selectedPost.category && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h3>
                  <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg">
                    {selectedPost.category}
                  </span>
                </div>
              )}

              {/* Recipients */}
              {selectedPost.recipients && selectedPost.recipients.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recipients</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.recipients.map((recipient) => (
                      <span key={recipient.id} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {recipient.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamp Info */}
              <div className="border-t pt-4 flex items-center justify-between text-xs text-gray-500">
                <div>
                  <span className="font-semibold">Shoutout:</span> {selectedPost.shoutout_created_at ? new Date(selectedPost.shoutout_created_at).toLocaleString() : 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Reported:</span> {selectedPost.report_created_at ? new Date(selectedPost.report_created_at).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex items-center gap-3 justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
              >
                Close
              </button>
              <button
                onClick={() => handleResolve(selectedPost.report_id)}
                disabled={resolving || deleting}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {resolving ? 'Resolving...' : 'Resolve'}
              </button>
              <button
                onClick={() => handleDelete(selectedPost.report_id)}
                disabled={resolving || deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all z-40 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default SimpleReportedPosts;
